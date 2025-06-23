import React, { useState } from 'react';

const levels = [
  { cards: 8, name: 'Beginner' },
  { cards: 12, name: 'Intermediate' },
  { cards: 24, name: 'Advanced' }
];

function MainMenu({ onStartGame }) {
  const [selectedLevel, setSelectedLevel] = useState(levels[0]);

  const handleLevelChange = (e) => {
    const levelName = e.target.value;
    const level = levels.find(l => l.name === levelName);
    setSelectedLevel(level);
  };

  return (

      <div className="text-center">
        <h2>Game Settings</h2>
        <p>Please choose your preferred difficulty to begin the exercise.</p>
        
        <div className="d-flex justify-content-center align-items-center mb-4" style={{maxWidth: '400px', margin: '0 auto'}}>
          <label className="form-label me-3 mb-0">Difficulty Level:</label>
          <select className="form-select" value={selectedLevel.name} onChange={handleLevelChange}>
            {levels.map(level => (
              <option key={level.name} value={level.name}>{level.name} ({level.cards} cards)</option>
            ))}
          </select>
        </div>
        
        <button className="btn-eleanor mt-3" onClick={() => onStartGame(selectedLevel)}>
          Begin Game
        </button>
      </div>
    </div>
  );
}

export default MainMenu;
