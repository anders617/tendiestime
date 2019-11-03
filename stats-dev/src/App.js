import React from 'react';
import './App.css';
import DateLineChart from './components/DateLineChart/DateLineChart';

import { FoodStatsRequest } from './proto/mdining_pb';
import { MDiningPromiseClient } from './proto/mdining_grpc_web_pb';

const mdiningService = new MDiningPromiseClient('http://localhost:8081');

function App() {
  mdiningService.getFoodStats(new FoodStatsRequest())
    .then((res) => {
      console.log(res);
    });
  return (
    <div className="App">
      <header className="App-header">
        <p>
          MDining Stats!
        </p>
        <a
          className="App-link"
          href="https://tendiesti.me"
          target="_blank"
          rel="noopener noreferrer"
        >
          tendiesti.me
        </a>
      </header>
      <DateLineChart width={'100vw'} height={'80vh'} />
    </div>
  );
}

export default App;
