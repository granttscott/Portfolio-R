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

  const buttonColors = ["red", "blue", "green", "yellow"];

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
    console.log('Animating sequence:', gamePattern);
    
    // Clear any existing timeouts
    const timeouts = [];
    
    gamePattern.forEach((color, index) => {
      const timeout = setTimeout(() => {
        console.log('Animating color:', color, 'at index:', index);
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
    console.log('Adding new color to pattern:', color);
    setGamePattern(prev => {
      const newPattern = [...prev, color];
      console.log('New game pattern:', newPattern);
      return newPattern;
    });
  }, []);
  
  // Update useEffect to trigger animation after pattern changes
  useEffect(() => {
    if (gamePattern.length > 0) {
      console.log('Pattern changed, starting animation');
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
      <button className="back" onClick={() => navigate(-1)}>Back</button>
        <Link to="/">
          <button className="home">Home</button>
        </Link>      <button onClick={() => setIsHardMode(!isHardMode)}>
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
    </div>
  );
}

export default Simon;