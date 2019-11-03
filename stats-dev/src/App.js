import React from 'react';
import './App.css';
import ChartContainer from './components/ChartContainer/ChartContainer';
import ShareContainer from './components/ShareContainer/ShareContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{color: '#000000', marginTop: '20px'}}>
          <ShareContainer url={window.location.href} size={32} title={'MDining Stats! from tendiesti.me'} body={'Check this out!'} />
        </div>
        <p style={{color: '#000000', fontSize: '24px', fontWeight: '900', fontFamily: 'Arial'}}>
          MDining Stats!
        </p>
      </header>
      <ChartContainer />
    </div>
  );
}

export default App;
