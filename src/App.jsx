import { useState } from 'react';
import './App.css';
import Timeline from './components/Timeline';
import Toolbar from './components/Toolbar';
import ShellAllType from './components/ShellAllType';
import MapOverlay from './components/MapOverlay';

function App() {
  const [selectedZone, setSelectedZone] = useState('rio');
  const [selectedYear, setSelectedYear] = useState('2025');
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

  // Function to check if a zone is available based on year
  const isZoneAvailable = (zone, year) => {
    const numericYear = year === 'PRÉ 2013' ? 2012 : parseInt(year);

    switch (zone) {
      case 'barreirinhas':
        return numericYear >= 2016;
      case 'potiguar':
        return numericYear >= 2018;
      case 'pelotas':
        return numericYear >= 2024;
      case 'rio':
        return true; // Always available
      default:
        return true;
    }
  };

  const handleYearSelect = (year) => {
    console.log('Selected year:', year);
    setSelectedYear(year);

    // If current zone is not available in the selected year, switch to Rio
    if (!isZoneAvailable(selectedZone, year)) {
      setSelectedZone('rio');
    }
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
    const zone = area.toLowerCase();

    // Only allow selection if zone is available in current year
    if (isZoneAvailable(zone, selectedYear)) {
      setSelectedZone(zone);
    }
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
            selectedYear={selectedYear}
            onAreaSelect={handleAreaSelect}
            onLegendToggle={handleLegendToggle}
            activeLegendItems={activeLegendItems}
            isZoneAvailable={isZoneAvailable}
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
            selectedYear={selectedYear}
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
