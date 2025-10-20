import { useState } from 'react';
import './App.css';
import Timeline from './components/Timeline';

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

  return (
    <div className="app">
      <div style={{
        padding: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        <Timeline
          onYearSelect={handleYearSelect}
          onPlay={handlePlay}
          onSpeedChange={handleSpeedChange}
          onLanguageChange={handleLanguageChange}
        />
      </div>
    </div>
  );
}

export default App;
