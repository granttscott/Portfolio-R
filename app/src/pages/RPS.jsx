import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import rockImg from '../assets/images/rock2.png';
import paperImg from '../assets/images/paper2.png';
import scissorsImg from '../assets/images/scissors2.png';
import rockWinImg from '../assets/images/rock.png';
import paperWinImg from '../assets/images/paper.png';
import scissorsWinImg from '../assets/images/scissors.png';

const RPS = () => {
  const navigate = useNavigate();
  const [gameStatus, setGameStatus] = useState("Press Play to Start");
  const [player1Image, setPlayer1Image] = useState(rockImg);
  const [player2Image, setPlayer2Image] = useState(rockImg);


  const handleSelection = (selectElement) => {
    if (selectElement.target.id === 'manualSelectP1' || selectElement.target.id === 'manualSelectP2') {
      selectElement.target.style.display = 'none';
    }
  };

  const getRandomValue = () => {
    const options = [1, 2, 3];
    let randomIndex = Math.floor(Math.random() * options.length);
    let randomIndex2 = Math.floor(Math.random() * options.length);
    
    const manualSelectP1 = document.getElementById('manualSelectP1');
    const manualSelectP2 = document.getElementById('manualSelectP2');

    if (manualSelectP1.value) {
      if (manualSelectP1.value === 'rock') randomIndex = 0;
      else if (manualSelectP1.value === 'paper') randomIndex = 1;
      else if (manualSelectP1.value === 'scissors') randomIndex = 2;
    }

    if (manualSelectP2.value) {
      if (manualSelectP2.value === 'rock') randomIndex2 = 0;
      else if (manualSelectP2.value === 'paper') randomIndex2 = 1;
      else if (manualSelectP2.value === 'scissors') randomIndex2 = 2;
    }

    let winner;
    if ((randomIndex === 0 && randomIndex2 === 2) ||
        (randomIndex === 1 && randomIndex2 === 0) ||
        (randomIndex === 2 && randomIndex2 === 1)) {
      winner = "P1";
    } else if ((randomIndex2 === 0 && randomIndex === 2) ||
               (randomIndex2 === 1 && randomIndex === 0) ||
               (randomIndex2 === 2 && randomIndex === 1)) {
      winner = "P2";
    } else {
      winner = "NA";
    }

    updateGameState(randomIndex, randomIndex2, winner);

    // Reset selections
    manualSelectP1.style.display = 'inline';
    manualSelectP2.style.display = 'inline';
    manualSelectP1.value = '';
    manualSelectP2.value = '';
  };

  const updateGameState = (index1, index2, winner) => {
    const getImagePath = (index, isWinner) => {
      if (index === 0) return isWinner ? rockWinImg : rockImg;
      if (index === 1) return isWinner ? paperWinImg : paperImg;
      return isWinner ? scissorsWinImg : scissorsImg;
    };

    if (winner === "P1") {
      setGameStatus("Player 1 Wins!");
      setPlayer1Image(getImagePath(index1, true));
      setPlayer2Image(getImagePath(index2, false));
    } else if (winner === "P2") {
      setGameStatus("Player 2 Wins!");
      setPlayer1Image(getImagePath(index1, false));
      setPlayer2Image(getImagePath(index2, true));
    } else {
      setGameStatus("It's a Tie.");
      setPlayer1Image(getImagePath(index1, false));
      setPlayer2Image(getImagePath(index2, false));
    }
  };

  return (
    <>
      <button className="back" onClick={() => navigate(-1)}>Back</button>
        <Link to="/">
          <button className="home">Home</button>
        </Link>

      <header>
        <h1 className="header">Rock - Paper - Scissors</h1>
      </header>
      
      <div>
        <h1>{gameStatus}</h1>
      </div>
      
      <hr />
      
      <div className="text-center">
        <button onClick={getRandomValue} className="btn-primary">
          Play
        </button>
      </div>
      
      <hr />
      
      <div className="rpsContainer">
        <div className="hand">
          <img id="P1" className="hand-image" src={player1Image} alt="rock" />
          <h2>Player 1</h2>
          <label htmlFor="manualSelectP1">Manual Selection:</label>
          <select
            id="manualSelectP1"
            name="manualSelectP1"
            className="manual-select"
            onChange={handleSelection}
          >
            <option value="" className="empty-selection">Select</option>
            <option value="rock">Rock</option>
            <option value="paper">Paper</option>
            <option value="scissors">Scissors</option>
          </select>
        </div>
        
        <div className="hand">
          <img id="P2" className="hand-image" src={player2Image} alt="rock" />
          <h2>Player 2</h2>
          <label htmlFor="manualSelectP2">Manual Selection:</label>
          <select
            id="manualSelectP2"
            name="manualSelectP2"
            className="manual-select"
            onChange={handleSelection}
          >
            <option value="" className="empty-selection">Select</option>
            <option value="rock">Rock</option>
            <option value="paper">Paper</option>
            <option value="scissors">Scissors</option>
          </select>
        </div>
      </div>

      <style>
        {`
          .btn-primary {
            width: 100px;
          }
          .btn-primary:hover {
            background-color: var(--primary-color);
          }
          .manual-select {
            background-color: var(--primary-color);
          }
        `}
      </style>
    </>
  );
};

export default RPS;