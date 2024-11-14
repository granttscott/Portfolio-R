import { Link } from 'react-router-dom';
import '../index.css';

function Header() {
  return (
    <div className="header-container">
      <div className="header-links">
        <Link to="/Resume" className="header-link">
          See My Resume
          <span className="arrow">→</span>
        </Link>
        <a href="mailto:GrantTScott@gmail.com" className="header-link">
          Inquire
          <span className="arrow">→</span>
        </a>
      </div>
    </div>
  );
}

export default Header;