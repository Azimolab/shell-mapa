import React, { useEffect, useState } from 'react';
import SPPopover from './rio/SPPopover';
import MacaePopover from './rio/MacaePopover';
import RioPopOver from './rio/RioPopOver';
import ExplorationPopover from './popovers/ExplorationPopover';
import ProductionPopover from './popovers/ProductionPopover';
import pinsInfo from '../data/pinsInfo.json';

/**
 * Componente responsável por gerenciar as interações com os pins do SVG
 * e abrir os popovers correspondentes
 */
function PinInteractionManager({ selectedYear, selectedZone }) {
  const [activePopover, setActivePopover] = useState(null);
  const [popoverData, setPopoverData] = useState(null);

  useEffect(() => {
    // Aguardar a renderização do SVG
    const timer = setTimeout(() => {
      setupPinListeners();
    }, 200);

    return () => {
      clearTimeout(timer);
      removePinListeners();
    };
  }, [selectedYear, selectedZone]);

  const setupPinListeners = () => {
    const svgElement = document.querySelector('.svg-map-content svg');
    if (!svgElement) {
      console.warn('SVG element not found for pin listeners.');
      return;
    }

    // Seleção específica: apenas grupos principais de pins
    // Evita selecionar elementos filhos dentro dos grupos
    const selectors = [
      'g[id^="Pin_"]',           // LocationPins: Pin_Rio, Pin_SP, Pin_Macae etc.
      'g[id^="GreenPin"]',       // Production pins: GreenPin_1, GreenPin_2, etc.
      'g[id^="RedPin"]',         // Exploration pins: RedPin_1, RedPin_2, etc.
      'g[id^="GrayPin"]',        // Decommission pins: GrayPin_1, GrayPin_2, etc.
      'g[class*="GreenPin"]',    // Classe alternativa
      'g[class*="RedPin"]',      // Classe alternativa
      'g[class*="GrayPin"]'      // Classe alternativa
    ];
    
    const pinElements = svgElement.querySelectorAll(selectors.join(', '));
    
    console.log(`Found ${pinElements.length} interactive pin elements`);

    pinElements.forEach((element) => {
      // Evitar adicionar listener múltiplas vezes
      if (element.dataset.listenerAdded === 'true') {
        return;
      }
      
      // Marcar como processado
      element.dataset.listenerAdded = 'true';
      
      // Adicionar cursor pointer
      element.style.cursor = 'pointer';
      
      // Adicionar event listener
      element.addEventListener('click', handlePinClick);
      
      console.log('Listener added to:', element.id || element.className);
    });
  };

  const removePinListeners = () => {
    const svgElement = document.querySelector('.svg-map-content svg');
    if (!svgElement) return;

    const selectors = [
      'g[id^="Pin_"]',
      'g[id^="GreenPin"]',
      'g[id^="RedPin"]',
      'g[id^="GrayPin"]',
      'g[class*="GreenPin"]',
      'g[class*="RedPin"]',
      'g[class*="GrayPin"]'
    ];
    
    const pinElements = svgElement.querySelectorAll(selectors.join(', '));

    pinElements.forEach((element) => {
      element.removeEventListener('click', handlePinClick);
      element.dataset.listenerAdded = 'false';
    });
  };

  const handlePinClick = (event) => {
    event.stopPropagation();
    
    const element = event.currentTarget;
    let pinId = element.id || element.getAttribute('data-pin-id');
    const pinClass = element.className?.baseVal || element.className;
    
    console.log('Pin clicked:', { pinId, pinClass, element });

    // Tentar mapear ID do SVG para ID do JSON
    let mappedId = mapSvgIdToJsonId(pinId, pinClass);
    
    console.log('Mapped ID:', mappedId);

    // Buscar dados do pin no JSON
    let pinData = null;
    
    // Tentar buscar em pins primeiro
    pinData = pinsInfo.pins[mappedId];
    
    // Se não encontrou, tentar em locations
    if (!pinData) {
      // Tentar com location_ prefix
      pinData = pinsInfo.locations[`location_${mappedId}`];
      
      // Tentar sem prefix
      if (!pinData) {
        pinData = pinsInfo.locations[mappedId];
      }
    }
    
    // Se ainda não encontrou, tentar com ID original
    if (!pinData) {
      let cleanId = pinId.replace(/^(pin_|pin-|location_|location-)/i, '');
      pinData = pinsInfo.pins[cleanId] || pinsInfo.locations[`location_${cleanId}`] || pinsInfo.locations[cleanId];
    }
    
    console.log('Search results:', {
      mappedId,
      foundInPins: !!pinsInfo.pins[mappedId],
      foundInLocations: !!(pinsInfo.locations[`location_${mappedId}`] || pinsInfo.locations[mappedId]),
      pinData
    });
    
    if (pinData) {
      console.log('Pin data found:', pinData);
      setPopoverData(pinData);
      setActivePopover(pinData.popoverType);
    } else {
      console.warn('No data found for pin:', pinId, 'mapped to:', mappedId);
      console.warn('Available pins:', Object.keys(pinsInfo.pins));
      
      // Fallback: mostrar popover genérico baseado no tipo
      const genericType = identifyGenericType(pinId, pinClass);
      if (genericType) {
        setPopoverData(genericType);
        setActivePopover(genericType.popoverType);
      }
    }
  };

  const mapSvgIdToJsonId = (svgId, pinClass) => {
    // Mapear IDs do SVG para IDs do JSON
    // Exemplos: GreenPin_3 -> prod3, RedPin_1 -> exp1, Pin_Rio -> rio
    
    if (!svgId) return null;
    
    const id = svgId.toLowerCase();
    const className = (pinClass || '').toLowerCase();
    
    // LocationPins específicos (prioridade alta)
    if (id.startsWith('pin_')) {
      // Pin_Rio -> rio, Pin_SP -> sp, Pin_Macae -> macae
      const locationName = id.replace('pin_', '');
      if (locationName === 'rio') return 'rio';
      if (locationName === 'sp' || locationName === 'saopaulo') return 'sp';
      if (locationName === 'macae') return 'macae';
    }
    
    // Green pins = produção
    if (id.includes('greenpin') || className.includes('greenpin')) {
      const number = svgId.match(/\d+/)?.[0];
      if (number) return `prod${number}`;
    }
    
    // Red pins = exploração
    if (id.includes('redpin') || className.includes('redpin')) {
      const number = svgId.match(/\d+/)?.[0];
      if (number) return `exp${number}`;
    }
    
    // Gray pins = descomissionamento
    if (id.includes('graypin') || className.includes('graypin') || id.includes('decommission')) {
      const number = svgId.match(/\d+/)?.[0];
      if (number) return `decomm${number}`;
    }
    
    // Locations genéricas
    if (id.includes('location') || className.includes('location')) {
      if (id.includes('sp') || id.includes('saopaulo')) return 'sp';
      if (id.includes('rio') && !id.includes('barreirinhas')) return 'rio';
      if (id.includes('macae')) return 'macae';
    }
    
    return svgId;
  };

  const identifyGenericType = (pinId, pinClass) => {
    // Criar dados genéricos quando não encontrar no JSON
    const id = (pinId || '').toLowerCase();
    const className = (pinClass || '').toLowerCase();
    
    if (id.includes('greenpin') || className.includes('greenpin') || 
        id.includes('production') || className.includes('production')) {
      return {
        popoverType: 'production_type1',
        title: 'Campo de Produção',
        status: 'Em produção',
        operator: 'Shell',
        operatorDescription: 'Responsável pela administração do campo',
        depth: 'A definir',
        depthDescription: 'Distância da superfície do mar até o fundo',
        companies: [
          {
            id: 'shell',
            name: 'Shell*',
            percentage: 100,
            color: '#DD1D21',
            isOperator: true
          }
        ]
      };
    }
    
    if (id.includes('redpin') || className.includes('redpin') || 
        id.includes('exploration') || className.includes('exploration')) {
      return {
        popoverType: 'exploration_type1',
        title: 'Bloco em Exploração',
        status: 'Em exploração',
        operator: 'Shell',
        operatorDescription: 'Responsável pela administração do campo',
        depth: 'A definir',
        depthDescription: 'Distância da superfície do mar até o fundo',
        companies: [
          {
            id: 'shell',
            name: 'Shell*',
            percentage: 100,
            color: '#DD1D21',
            isOperator: true
          }
        ]
      };
    }
    
    return null;
  };

  const identifyPopoverType = (pinId, pinClass) => {
    // Converter para lowercase para comparação
    const id = (pinId || '').toLowerCase();
    const className = (pinClass || '').toLowerCase();

    // Verificar localizações específicas
    if (id.includes('sp') || id.includes('saopaulo') || id.includes('sao-paulo') ||
        className.includes('sp') || className.includes('saopaulo')) {
      return 'sp';
    }

    if (id.includes('macae') || id.includes('macaé') ||
        className.includes('macae') || className.includes('macaé')) {
      return 'macae';
    }

    if (id.includes('rio') && !id.includes('barreirinhas') ||
        className.includes('rio') && !className.includes('barreirinhas')) {
      return 'rio';
    }

    // Para pins de exploração/produção genéricos, abrir um popover padrão
    if (id.includes('exploration') || id.includes('exp') || id.includes('red') ||
        className.includes('exploration') || className.includes('exp') || className.includes('red')) {
      return 'exploration';
    }

    if (id.includes('production') || id.includes('prod') || id.includes('green') ||
        className.includes('production') || className.includes('prod') || className.includes('green')) {
      return 'production';
    }

    return null;
  };

  const closePopover = () => {
    setActivePopover(null);
    setPopoverData(null);
  };

  return (
    <>
      {/* Popovers de localizações específicas */}
      <SPPopover 
        isOpen={activePopover === 'location_sp'} 
        onClose={closePopover} 
      />
      <MacaePopover 
        isOpen={activePopover === 'location_macae'} 
        onClose={closePopover} 
      />
      <RioPopOver 
        isOpen={activePopover === 'location_rio'} 
        onClose={closePopover} 
      />
      
      {/* Popovers genéricos baseados em dados */}
      <ExplorationPopover
        isOpen={activePopover === 'exploration_type1'}
        onClose={closePopover}
        data={popoverData}
      />
      
      <ProductionPopover
        isOpen={activePopover === 'production_type1'}
        onClose={closePopover}
        data={popoverData}
      />
    </>
  );
}

export default PinInteractionManager;

