import React from 'react';

function EndScreen({ stats, levelName, onReturnToMenu }) {
  return (
    <div className="text-center">
      <h2>Well Done!</h2>
      <p>You have successfully completed the exercise.</p>
      <div className="end-summary">
        <h5 className="mb-3">Session Summary</h5>
        <p><strong>Level:</strong> {levelName}</p>
        <p><strong>Moves Taken:</strong> {stats.moves}</p>
        <p><strong>Time Spent:</strong> {stats.time}</p>
      </div>
      <button className="btn-eleanor mt-4" onClick={onReturnToMenu}>
        Return to Main Menu
      </button>
    </div>
  );
}

export default EndScreen;