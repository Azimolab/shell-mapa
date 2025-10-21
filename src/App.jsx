import { useState } from 'react';
import './App.css';
import Timeline from './components/Timeline';
import Toolbar from './components/Toolbar';
import ShellAllType from './components/ShellAllType';
import MapOverlay from './components/MapOverlay';

function App() {
  const [selectedZone, setSelectedZone] = useState('rio');
  const [activeLegendItems, setActiveLegendItems] = useState({
    exploration: true,
    production: true,
    decommissioning: true
  });

  // Map zone names to their corresponding SVG file paths
  const zoneBackgrounds = {
    'barreirinhas': '/src/assets/map_sources/barreirinhas.svg',
    'potiguar': '/src/assets/map_sources/potiguar.svg',
    'rio': '/src/assets/map_sources/rio.svg',
    'pelotas': '/src/assets/map_sources/pelotas.svg'
  };

  const handleYearSelect = (year) => {
    console.log('Selected year:', year);
  };

  const handlePlay = () => {
    console.log('Play button clicked');
  };

  const handleSpeedChange = (speed) => {
    console.log('Speed changed:', speed);
  };

  const handleLanguageChange = (language) => {
    console.log('Language changed:', language);
  };

  const handleAreaSelect = (area) => {
    console.log('Area selected:', area);
    setSelectedZone(area.toLowerCase());
  };

  const handleLegendToggle = (itemId) => {
    console.log('Legend item toggled:', itemId);
    setActiveLegendItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  return (
    <div className="app">
      <div style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        padding: '20px',
        overflow: 'hidden',
        backgroundImage: `url(${zoneBackgrounds[selectedZone]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        {/* ShellAllType positioned top-left */}
        {/* Map Overlay with pins and infrastructure */}
        <MapOverlay
          selectedZone={selectedZone}
          activeLegendItems={activeLegendItems}
        />

        <div style={{
          position: 'absolute',
          top: '30px',
          left: '30px',
          zIndex: 10
        }}>
          <ShellAllType />
        </div>

        {/* Toolbar positioned middle-right */}
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '30px',
          transform: 'translateY(-50%)',
          zIndex: 10
        }}>
          <Toolbar
            selectedArea={selectedZone}
            onAreaSelect={handleAreaSelect}
            onLegendToggle={handleLegendToggle}
            activeLegendItems={activeLegendItems}
          />
        </div>

        {/* Timeline positioned bottom-center */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10
        }}>
          <Timeline
            onYearSelect={handleYearSelect}
            onPlay={handlePlay}
            onSpeedChange={handleSpeedChange}
            onLanguageChange={handleLanguageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
