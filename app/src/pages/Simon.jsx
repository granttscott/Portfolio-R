import { useState, useEffect, useCallback } from 'react';
import styles from './Simon.module.css';
import { Link, useNavigate } from 'react-router-dom';

const Simon = () => {
  const navigate = useNavigate();
  const [gamePattern, setGamePattern] = useState([]);
  const [userPattern, setUserPattern] = useState([]);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState('Press A Key to Start');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isHardMode, setIsHardMode] = useState(true);
  const [showRetry, setShowRetry] = useState(false);
  const [speed, setSpeed] = useState(300);
  const [showNameModal, setShowNameModal] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const buttonColors = ["red", "blue", "green", "yellow"];

  // Fetch leaderboard on component mount
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/leaderboard');
      const data = await response.json();
      setLeaderboard(data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const submitScore = async (name) => {
    try {
      await fetch('/api/leaderboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.toUpperCase(),
          score: highScore
        })
      });
      fetchLeaderboard();
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (playerName.length <= 3) {
      submitScore(playerName);
      setShowNameModal(false);
      setPlayerName('');
    }
  };

  const startGame = useCallback(() => {
    setUserPattern([]);
    setGamePattern([]);
    setShowRetry(false);
    setIsGameOver(false);
    setLevel('Level 1');
    randomColor();
  }, []);

  const animateButton = (color) => {
    const button = document.querySelector(`button[data-color="${color}"]`);
    if (button) {
      button.classList.add(styles.pressed);
      setTimeout(() => {
        button.classList.remove(styles.pressed);
      }, speed);
    }
  };

const handleButtonClick = (color) => {
  setUserPattern(prev => [...prev, color]);
  playSound(color);
  animateButton(color);
};

  const playSound = (color) => {
    const audio = new Audio(`/sounds/${color}.mp3`);
    audio.play();
  };

  const animateSequence = useCallback(() => {    
    // Clear any existing timeouts
    const timeouts = [];
    
    gamePattern.forEach((color, index) => {
      const timeout = setTimeout(() => {
        animateButton(color);
        playSound(color);
      }, (speed + 200) * index); // Changed to 1000ms (1 second) between each animation
      timeouts.push(timeout);
    });

    // Cleanup function to clear timeouts if component unmounts
    return () => timeouts.forEach(timeout => clearTimeout(timeout));
  }, [gamePattern]);
  
  const randomColor = useCallback(() => {
    const num = Math.floor(Math.random() * 4);
    const color = buttonColors[num];
    setGamePattern(prev => {
      const newPattern = [...prev, color];
      return newPattern;
    });
  }, []);
  
  // Update useEffect to trigger animation after pattern changes
  useEffect(() => {
    if (gamePattern.length > 0) {
      animateSequence();
    }
  }, [gamePattern, animateSequence]);

  const checkAnswer = useCallback(() => {
    if (userPattern.length === gamePattern.length) {
      const isCorrect = userPattern.every((color, index) => color === gamePattern[index]);
      
      if (isCorrect) {
        const messages = ["Correct!", "WOW!", "Monster Work.", "Little Einstein in the House!"];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        setLevel(randomMessage);
        
        setTimeout(() => {
          setLevel(`Level ${gamePattern.length + 1}`);
          setUserPattern([]);
          randomColor();
        }, 1000);
      } else {
        setIsGameOver(true);
        setShowRetry(true);
        setLevel(`Game Over, you made it to Level ${gamePattern.length}`);
        
        if (gamePattern.length > highScore) {
          setHighScore(gamePattern.length);
          setShowNameModal(true);
        }
      }
    }
  }, [userPattern, gamePattern, highScore]);

  useEffect(() => {
    if (userPattern.length > 0) {
      checkAnswer();
    }
  }, [userPattern, checkAnswer]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (isGameOver || level === 'Press A Key to Start') {
        startGame();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isGameOver, level, startGame]);

  return (
    <div className={styles.gameContainer}>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px', gap: '20px'}}>
      <button onClick={() => setIsHardMode(!isHardMode)}>
        Toggle Color Change
      </button>
      <button onClick={startGame}>Start</button>
      <select 
        value={speed} 
        onChange={(e) => setSpeed(Number(e.target.value))}
        className={styles.speedSelector}
      >
        <option value={500}>Slow</option>
        <option value={300}>Normal</option>
        <option value={150}>Fast</option>
        <option value={75}>Very Fast</option>
      </select>
      </div>
      <h1>{level}</h1>
      {showRetry && <h1>Press Any Key to Retry!</h1>}
      <h2>High Score: {highScore}</h2>
  
      <div className={styles.buttonGrid}>
        {buttonColors.map((color) => (
          <button
            key={color}
            data-color={color}
            className={styles.gameButton}
            style={{
              backgroundColor: isHardMode ? 
                color : 
                color === 'red' ? 'var(--primary-color)' :
                color === 'blue' ? 'var(--secondary-color)' :
                color === 'green' ? 'var(--tertiary-color)' :
                'var(--quaternary-color)'
            }}
            onClick={() => handleButtonClick(color)}
          />
        ))}
      </div>

      {/* Name Input Modal */}
      {showNameModal && (
        <div className={styles.scoreModalOverlay}>
          <div className={styles.scoreModal}>
            <h2>New High Score!</h2>
            <form onSubmit={handleNameSubmit}>
              <input
                type="text"
                maxLength={3}
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="INITIALS"
                className={styles.nameInput}
              />
              <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <div className={styles.leaderboard}>
        <h2>Leaderboard</h2>
        <div className={styles.leaderboardList}>
          {leaderboard.map((entry, index) => (
            <div key={entry.id} className={styles.leaderboardEntry}>
              <span>{index + 1}.</span>
              <span>{entry.name}</span>
              <span>{entry.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Simon;