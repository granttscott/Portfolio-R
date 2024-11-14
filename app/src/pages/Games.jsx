import { Link, useNavigate } from 'react-router-dom';

function Games() {
  const navigate = useNavigate();
  return (
    <div className="projects-container">
      <div>
      <button className="back" onClick={() => navigate(-1)}>Back</button>
        <Link to="/">
          <button className="home">Home</button>
        </Link>
        <h1>Games</h1>
      </div>
      
      <hr/>
 
      <div className="projects-grid">

      <Link to="/rps">
        <div className="item">
          <h2>Rock, Paper, Scissors</h2>
        </div>
      </Link>
      
      <Link to="/simon">
        <div className="item">
          <h2>Simon</h2>
        </div>
      </Link>

      <Link to="/drumset">
        <div className="item">
          <h2>Drum Set</h2>
        </div>
      </Link>

      <Link to="/pig">
        <div className="item">
          <h2>Pig</h2>
        </div>
      </Link>
        
        

      </div>
    </div>
  );
}

export default Games;