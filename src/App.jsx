import { useState } from 'react';
import reactLogo from './assets/react.svg';
import data from './assets/data';
function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="App">
      <header>
        <h1 className="title">le game</h1>
        <div className="score-board">
          <div className="score-board-current">Current Score: 1000</div>
          <div className="score-board-high">HighScore: 1000</div>
        </div>
        <div className="cards"></div>
      </header>
    </main>
  );
}

export default App;
