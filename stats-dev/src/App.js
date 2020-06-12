import React from 'react';
import './App.css';
import ChartContainer from './components/ChartContainer/ChartContainer';
import ShareContainer from './components/ShareContainer/ShareContainer';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{color: '#000000', marginTop: '20px'}}>
          <ShareContainer url={window.location.href} size={32} title={'MDining Stats! from tendiesti.me'} body={'Check this out!'} />
        </div>
        <h1 style={{color: '#000000', fontSize: '24px', fontWeight: '900', fontFamily: 'Arial', margin: '10px', marginBottom: '0px'}}>
          MDining Stats!
        </h1>
        <h2 style={{color: '#3F3F3F', fontSize: '16px', fontWeight: '200', fontFamily: 'Arial', fontStyle: 'italic', margin: '20px', marginTop: '5px'}}>
          Updated Daily <br />
          <p>Charts and statistics on food being served at University of Michigan dining halls.</p>
          <p>If you are looking for michigan dining hall menus check out the <a href="/menus">menus page</a></p>
          <p>If you are looking for a searchable list of food check out <a href="/">tendiestime</a></p>
        </h2>
      </header>
      <ChartContainer />
      <Footer />
    </div>
  );
}

export default App;
