import { Link, useNavigate } from 'react-router-dom';

function MySites() {
  const navigate = useNavigate();
  return (
    <div className="my-sites-container">
      <div>
        <button className="back" onClick={() => navigate(-1)}>Back</button>
        <Link to="/">
          <button className="home">Home</button>
        </Link>
        <h1>Complete Websites</h1>
      </div>

      <hr/>

      <div className="sites-grid">
        <a href="https://humilitree.org/" target="_blank" rel="noopener noreferrer">
          <div className="item">
            <h2>Humilitree</h2>
          </div>
        </a>
        <br/>
        <a href="https://loading-969b6.web.app/" target="_blank" rel="noopener noreferrer">
          <div className="item">
            <h2>Loading</h2>
          </div>
        </a>
      </div>
    </div>
  );
}

export default MySites; 