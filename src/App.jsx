import React, { useState, useEffect, useRef } from 'react';
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState('0.5x');
  const playIntervalRef = useRef(null);

  // Available years
  const years = ['PRÉ 2013', '2013', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];

  // Map speed to milliseconds
  const speedToMs = {
    '0.5x': 4000,
    '1x': 2000,
    '1.5x': 1333,
    '2x': 1000
  };

  // Auto-play effect
  useEffect(() => {
    if (isPlaying) {
      const currentIndex = years.indexOf(selectedYear);
      
      playIntervalRef.current = setInterval(() => {
        setSelectedYear((prevYear) => {
          const prevIndex = years.indexOf(prevYear);
          const nextIndex = (prevIndex + 1) % years.length;
          const nextYear = years[nextIndex];
          
          // Check if we need to switch zones
          if (!isZoneAvailable(selectedZone, nextYear)) {
            setSelectedZone('rio');
          }
          
          return nextYear;
        });
      }, speedToMs[playSpeed]);

      return () => {
        if (playIntervalRef.current) {
          clearInterval(playIntervalRef.current);
        }
      };
    } else {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    }
  }, [isPlaying, playSpeed, selectedZone]);

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
    // Pause when manually selecting a year
    setIsPlaying(false);

    // If current zone is not available in the selected year, switch to Rio
    if (!isZoneAvailable(selectedZone, year)) {
      setSelectedZone('rio');
    }
  };

  const handlePlay = () => {
    console.log('Play button clicked');
    setIsPlaying((prev) => !prev);
  };

  const handleSpeedChange = () => {
    console.log('Speed changed');
    const speeds = ['0.5x', '1x', '1.5x', '2x'];
    const currentIndex = speeds.indexOf(playSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaySpeed(speeds[nextIndex]);
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
          selectedYear={selectedYear}
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
          top: '60%',
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
            isPlaying={isPlaying}
            speed={playSpeed}
            onSpeedChange={handleSpeedChange}
            onLanguageChange={handleLanguageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
