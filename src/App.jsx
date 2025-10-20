import { useState } from 'react';
import './App.css';
import Timeline from './components/Timeline';
import Toolbar from './components/Toolbar';
import ShellAllType from './components/ShellAllType';

function App() {
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
  };

  const handleLegendToggle = (itemId) => {
    console.log('Legend item toggled:', itemId);
  };

  return (
    <div className="app">
      <div style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        padding: '20px',
        overflow: 'hidden'
      }}>
        {/* ShellAllType positioned top-left */}
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
            onAreaSelect={handleAreaSelect}
            onLegendToggle={handleLegendToggle}
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
