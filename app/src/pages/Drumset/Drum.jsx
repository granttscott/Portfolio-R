import { useEffect } from 'react';
import './Drum.css';
import { Link, useNavigate } from 'react-router-dom';

function Drum() {
  useEffect(() => {
    const drums = document.querySelectorAll('.drum');
    drums.forEach(drum => {
      drum.addEventListener('click', playSound);
    });

    document.addEventListener('keydown', playKeySound);

    // Cleanup listeners
    return () => {
      drums.forEach(drum => {
        drum.removeEventListener('click', playSound);
      });
      document.removeEventListener('keydown', playKeySound);
    };
  }, []);

  const playSound = (event) => {
    const buttonInnerHTML = event.target.innerHTML;
    const audio = new Audio(`/sounds/${buttonInnerHTML}.mp3`);
    audio.play();
    buttonAnimation(buttonInnerHTML);
  };

  const playKeySound = (e) => {
    const audio = new Audio(`/sounds/${e.key}.mp3`);
    audio.play();
    buttonAnimation(e.key);
  };

  const buttonAnimation = (currentKey) => {
    const activeButton = document.querySelector(`.${currentKey}`);
    if (activeButton) {
      activeButton.classList.add('pressed');
      setTimeout(() => {
        activeButton.classList.remove('pressed');
      }, 100);
    }
  };

  return (
    <div className="drum-kit">
      <h1 id="title">Drum 🥁 Kit</h1>
      <div className="set">
        <button className="z drum">z</button>
        <button className="x drum">x</button>
        <button className="c drum">c</button>
        <button className="v drum">v</button>
        <button className="b drum">b</button>
        <button className="n drum">n</button>
        <button className="m drum">m</button>
      </div>
    </div>
  );
}

export default Drum;