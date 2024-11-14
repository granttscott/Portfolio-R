import { Link, useNavigate } from 'react-router-dom';

function Projects() {
  const navigate = useNavigate();
  return (
    <div className="projects-container">
      <div>
      <button className="back" onClick={() => navigate(-1)}>Back</button>
        <Link to="/">
          <button className="home">Home</button>
        </Link>
        <h1>Projects</h1>
      </div>
      
      <hr/>
      
      <div className="projects-grid">
      <Link to="/static">
          <div className="item">
            <h2>Static Pages</h2>
          </div>
        </Link>

        <Link to="/dynamic">
          <div className="item">
            <h2>Dynamic Pages</h2>
          </div>
        </Link>

        <Link to="/games">
          <div className="item">
            <h2>Games</h2>
          </div>
        </Link>
        
        <Link to="/authentication">
          <div className="item">
            <h2>Authentication Needed</h2>
          </div>
        </Link>
        
      </div>
    </div>
  );
}

export default Projects;