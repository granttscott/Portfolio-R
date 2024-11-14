import { Link, useNavigate } from 'react-router-dom';

function Static() {
  const navigate = useNavigate();
  return (
    <div className="projects-container">
      <div>
      <button className="back" onClick={() => navigate(-1)}>Back</button>
        <Link to="/">
          <button className="home">Home</button>
        </Link>
        <h1>Static Pages</h1>
      </div>
      
      <hr/>
 
      <div className="projects-grid">

      <Link to="/binaudit">
        <div className="item">
          <h2>Location Picker</h2>
        </div>
      </Link>

      <Link to="/art">
        <div className="item">
          <h2>Art</h2>
        </div>
      </Link>
        
      </div>
    </div>
  );
}

export default Static;