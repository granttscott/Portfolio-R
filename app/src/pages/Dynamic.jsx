import { Link, useNavigate } from 'react-router-dom';

function Dynamic() {
  const navigate = useNavigate();
  return (
    <div className="projects-container">
      <div>
      <button className="back" onClick={() => navigate(-1)}>Back</button>
        <Link to="/">
          <button className="home">Home</button>
        </Link>
        <h1>Dynamic Pages</h1>
      </div>
      
      <hr/>
 
      <div className="projects-grid">

      <Link to="/blog">
        <div className="item">
          <h2>Blog</h2>
        </div>
      </Link>

      <Link to="/articles">
        <div className="item">
          <h2>Free Core Journal Search</h2>
        </div>
      </Link>
      
      </div>
    </div>
  );
}

export default Dynamic;