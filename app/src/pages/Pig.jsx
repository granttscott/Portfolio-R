import { useState } from 'react';
import styles from './Pig.module.css';
import Dice from '../components/Dice';
import { Link, useNavigate } from 'react-router-dom';

function Pig() {
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [currentScore, setCurrentScore] = useState(0);
  const [activePlayer, setActivePlayer] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);


  const handleRollDice = () => {
    if (!isPlaying || isRolling) return;
    const newDiceValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(newDiceValue)
    setIsRolling(true);
    
    setTimeout(() => {
      setIsRolling(false);
    }, 500); 

    setTimeout(() => {
  if (newDiceValue === 1) {
    setCurrentScore(0);
    setActivePlayer(activePlayer === 1 ? 2 : 1);
  } else {
    setCurrentScore(currentScore + newDiceValue);
    }
  }, 1500);
};
  const handleHold = () => {
    if (scores[`player${activePlayer}`] >= 100) {
      setIsPlaying(false);
      return;
    }
    setScores(prevScores => ({
      ...prevScores,
      [`player${activePlayer}`]: prevScores[`player${activePlayer}`] + currentScore
    }));
    setCurrentScore(0);
    setActivePlayer(activePlayer === 1 ? 2 : 1);
    console.log(scores)
    console.log(currentScore)
  };

  const handleNewGame = () => {
    setScores({ player1: 0, player2: 0 });
    setCurrentScore(0);
    setActivePlayer(1);
    setIsPlaying(true);
  };
  const navigate = useNavigate();

  return (
        <div className={styles.gameContainer}>
        <button className="back" onClick={() => navigate(-1)}>Back</button>
        <Link to="/">
          <button className="home">Home</button>
        </Link>
          <button className={styles.btnNew} onClick={handleNewGame}>
            🔄 New Game
          </button>
          <div className={styles.gameInfo}>
            <p> {!isPlaying ? 'Game over' : `Player ${activePlayer} is currently playing`}</p>
          </div>
    
          <div className={styles.playersContainer}>
            <div className={`${styles.player} ${activePlayer === 1 ? styles.active : ''}`}>
              <h2>Player 1</h2>
              <div className={styles.score}>{scores.player1}</div>
              <div className={styles.current}>
                <p>Current</p>
                <p>{activePlayer === 1 ? currentScore : 0}</p>
              </div>
            </div>

            <div className={styles.diceContainer}>
              <Dice value={diceValue} isRolling={isRolling} />
            </div>
    
            <div className={`${styles.player} ${activePlayer === 2 ? styles.active : ''}`}>
              <h2>Player 2</h2>
              <div className={styles.score}>{scores.player2}</div>
              <div className={styles.current}>
                <p>Current</p>
                <p>{activePlayer === 2 ? currentScore : 0}</p>
              </div>
            </div>
          </div>
    
          <div className={styles.gameControls}>
            <button 
              className={styles.btnRoll} 
              onClick={handleRollDice}
              disabled={!isPlaying || isRolling}
            >
                  🎲 Roll Dice
        </button>
        <button 
          className={styles.btnHold} 
          onClick={handleHold}
          disabled={!isPlaying}
        >
          📥 Hold
        </button>
      </div>
    </div>
  );
}

export default Pig;