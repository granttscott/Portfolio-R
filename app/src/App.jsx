import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Resume from './pages/Resume.jsx'
import Projects from './pages/Projects.jsx'
import Blog from './pages/Blog.jsx';
import Art from './pages/Art';
import Static from './pages/Static';
import RPS from './pages/RPS';
import Dynamic from './pages/Dynamic';
import Games from './pages/Games';
import Authentication from './pages/Authentication';
import Drum from './pages/Drumset/Drum';
import BinAudit from './pages/BinAudit';
import Simon from './pages/Simon';
import Articles from './pages/Articles';
import Pig from './pages/Pig';
import './App.css'

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      {isHomePage && <Header />}
      <Routes>
        <Route path="/" element={
          <div className="home-content">
            {/* Your home page content */}
            <h1>Welcome!</h1>
            {/* Add more home page content here */}
          <br/>
            <div className="project-button">
              <Link to="/projects" className="project-link">
                View My Projects
                <span className="arrow">→</span>
              </Link>
            </div>
            </div>
        } />
        
        <Route path="/resume" element={<Resume />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/static" element={<Static />} />
        <Route path="/rps" element={<RPS />} />
        <Route path="/art" element={<Art />} />
        <Route path="/dynamic" element={<Dynamic />} />
        <Route path="/games" element={<Games />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/drumset" element={<Drum />} />
        <Route path="/binaudit" element={<BinAudit />} />
        <Route path="/simon" element={<Simon />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/pig" element={<Pig />} />
      </Routes>
    </>
  )
}

export default App
