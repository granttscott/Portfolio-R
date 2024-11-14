import { Link, useNavigate } from 'react-router-dom';

function Authentication() {
  const navigate = useNavigate();
  return (
    <div className="projects-container">
      <div>
      <button className="back" onClick={() => navigate(-1)}>Back</button>
        <Link to="/">
          <button className="home">Home</button>
        </Link>
        <h1>Authentication Needed</h1>
      </div>
      
      <hr/>
 
      <div className="projects-grid">

      <a href="https://keeper-c0904.web.app/" target="_blank" rel="noopener noreferrer">
        <div className="item">
          <h2>Notes</h2>
        </div>
      </a>
      
      </div>
    </div>
  );
}

export default Authentication;