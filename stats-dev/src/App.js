import React from 'react';
import './App.css';
import ChartContainer from './components/ChartContainer/ChartContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p style={{color: '#000000', fontSize: '24px', fontWeight: '900', fontFamily: 'Arial'}}>
          MDining Stats!
        </p>
      </header>
      <ChartContainer width={'100vw'} height={'80vh'} />
    </div>
  );
}

export default App;
