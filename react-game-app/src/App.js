import React, { useState } from 'react';
import './App.css';

import MainMenu from './components/MainMenu';
import GameBoard from './components/GameBoard';
import EndScreen from './components/EndScreen';

function App() {
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'finished'
  const [level, setLevel] = useState({ cards: 8, name: 'Beginner' });
  const [gameStats, setGameStats] = useState({ moves: 0, time: '00:00' });

  const handleStartGame = (selectedLevel) => {
    setLevel(selectedLevel);
    setGameState('playing');
  };

  const handleGameEnd = (stats) => {
    setGameStats(stats);
    setGameState('finished');
  };

  const handleReturnToMenu = () => {
    setGameState('menu');
  };

  const renderContent = () => {
    switch (gameState) {
      case 'playing':
        return <GameBoard level={level} onGameEnd={handleGameEnd} />;
      case 'finished':
        return <EndScreen stats={gameStats} levelName={level.name} onReturnToMenu={handleReturnToMenu} />;
      case 'menu':
      default:
        return <MainMenu onStartGame={handleStartGame} />;
    }
  };

  return (
    <div className="theme-eleanor">
      <div className="app-container">
        <header className="mockup-header">Serene Mind</header>
        <main className="mockup-body">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;