import { useState } from 'react';
import './App.css';
import Timeline from './components/Timeline';
import Toolbar from './components/Toolbar';
import ShellAllType from './components/ShellAllType';
import RioZone from './components/RioZone';

function App() {
  const [selectedZone, setSelectedZone] = useState('rio');

  return (
    <div className="app">
      {selectedZone === 'rio' && <RioZone />}
      <ShellAllType />
      <Timeline />
      <Toolbar selectedZone={selectedZone} onZoneChange={setSelectedZone} />
    </div>
  );
}

export default App;
