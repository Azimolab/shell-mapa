import { useState } from 'react';
import './App.css';
import Timeline from './components/Timeline';
import Toolbar from './components/Toolbar';
import ShellAllType from './components/ShellAllType';
import RioZone from './components/RioZone';
import GasPipeline from './components/GasPipeline';
import RioHeadquarter from './components/RioHeadquarter';
import SPFilial from './components/SPFilial';
import MacaeFilial from './components/MacaeFilial';

function App() {
  const [selectedZone, setSelectedZone] = useState('rio');
  const [visibleLayers, setVisibleLayers] = useState({
    exploration: true,
    production: true,
    decommissioning: true
  });

  return (
    <div className="app">
      {selectedZone === 'rio' && <RioZone />}
      {selectedZone === 'rio' && <GasPipeline />}
      {selectedZone === 'rio' && <RioHeadquarter />}
      {selectedZone === 'rio' && <SPFilial />}
      {selectedZone === 'rio' && <MacaeFilial />}
      <ShellAllType />
      <Timeline />
      <Toolbar
        selectedZone={selectedZone}
        onZoneChange={setSelectedZone}
        visibleLayers={visibleLayers}
        onLayerVisibilityChange={setVisibleLayers}
      />
    </div>
  );
}

export default App;
