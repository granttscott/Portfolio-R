import { useState, useEffect } from 'react';
import './Dice.css';

function Dice({ value, isRolling }) {
  const [isOdd, setIsOdd] = useState(false);

  useEffect(() => {
    if (isRolling) {
      setIsOdd(prev => !prev);
    }
  }, [isRolling]);

const dots = {
  1: [5],
  2: [1, 9],
  3: [1, 5, 9],
  4: [1, 3, 7, 9],
  5: [1, 3, 5, 7, 9],
  6: [1, 3, 4, 6, 7, 9]
};
return (
  <div className="dice">
    <ol
      className={`die-list ${isOdd ? 'odd-roll' : 'even-roll'}`}
      data-roll={value}
    >
      {[1, 2, 3, 4, 5, 6].map(side => (
        <li key={side} className="die-item" data-side={side}>
          {dots[side].map(dot => (
            <span key={dot} className="dot"></span>
          ))}
        </li>
      ))}
    </ol>
  </div>
);
}

export default Dice;