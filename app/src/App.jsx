import { Routes, Route, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
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
import OtherWebsites from './pages/OtherWebsites';
import './App.css'
import Home from './pages/Home.jsx';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Routes>
        <Route path="/" element={<Home isOpen={isOpen} setIsOpen={setIsOpen} />} />
        
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
        <Route path="/other-websites" element={<OtherWebsites />} />
      </Routes>
    </>
  )
}

export default App
