import React, { useState, useEffect, useRef } from 'react';
import images from './imageLoader'; // <--- IMPORT OUR IMAGES


const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

function GameBoard({ level, onGameEnd }) {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  // --- Game Setup ---
  useEffect(() => {
    // We now use the length of our imported images array
    const imageIds = Array.from({ length: images.length - 1 }, (_, i) => i + 1);
    const selectedImages = shuffleArray(imageIds).slice(0, level.cards / 2);
    const gameCards = shuffleArray([...selectedImages, ...selectedImages]).map((id, index) => ({
      id: index,
      imageId: id,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(gameCards);
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [level]);

  // --- Timer, Game Logic, and Win Check (No changes needed in these sections) ---
  const startTimer = () => { timerRef.current = setInterval(() => { setTimer(prevTime => prevTime + 1); }, 1000); };
  const formatTime = (seconds) => { const mins = Math.floor(seconds / 60).toString().padStart(2, '0'); const secs = (seconds % 60).toString().padStart(2, '0'); return `${mins}:${secs}`; };
  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves(prevMoves => prevMoves + 1);
      const [first, second] = flippedCards;
      if (cards[first].imageId === cards[second].imageId) {
        setCards(prevCards => prevCards.map(card => (card.imageId === cards[first].imageId) ? { ...card, isMatched: true } : card));
        setMatchedPairs(prev => prev + 1);
        setFlippedCards([]);
      } else {
        setTimeout(() => { setFlippedCards([]); }, 1000);
      }
    }
  }, [flippedCards, cards]);
  useEffect(() => {
    if (matchedPairs > 0 && matchedPairs === level.cards / 2) {
      clearInterval(timerRef.current);
      onGameEnd({ moves, time: formatTime(timer) });
    }
  }, [matchedPairs, level.cards, moves, onGameEnd, timer]);
  const handleCardClick = (index) => { if (flippedCards.length < 2 && !cards[index].isFlipped && !cards[index].isMatched) { setFlippedCards(prev => [...prev, index]); } };
  const getLevelClass = () => { switch (level.cards) { case 12: return 'intermediate'; case 24: return 'advanced'; default: return 'beginner'; } };

  return (
    <div>
      <div className="game-stats-bar">
        <span>Pairs Found: {matchedPairs} / {level.cards / 2}</span>
        <span>Time: {formatTime(timer)}</span>
        <span>Moves: {moves}</span>
      </div>
      <div className={`game-grid ${getLevelClass()}`}>
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`card-container ${flippedCards.includes(index) || card.isMatched ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-inner">
              <div className="card-face card-back"></div>
              <div
                className="card-face card-front"
                style={{ backgroundImage: `url(${images[card.imageId]})` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameBoard;