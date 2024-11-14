import { Link, useNavigate } from 'react-router-dom';

// Add your Mondrian-specific styles
const styles = `
.containercontainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    padding: 0;
  }

.container-design {
    height: 748px;
    width: 748px;
    display: grid;
    grid-template-columns: 40px 100px 234px 20px 374px;
    grid-template-rows: 180px 271px 297px;
    grid-gap: 9px;
}

.item-design {
  background-color: #adccc3;
}
.red {
  background-color: #E72F24;
}
.yellow {
  background-color: #F9D01E;
}
.black {
  background-color: #232629;
}
.blue {
  background-color: #004592;
}
.blank {
  grid-column: span 2;
}
.blank2 {
  grid-column: span 3;
}
.blank3 {
  margin-bottom: -9px;
}
`;

const Art = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button className="back" onClick={() => navigate(-1)}>Back</button>
        <Link to="/">
          <button className="home">Home</button>
        </Link>

      <header>
        <h1 className="header">Mondrian Art</h1>
        <p>A recreation of the Mondrian art style using CSS Grid.</p>
      </header>
      
      <div className="containercontainer">
        <div className="container-design">
          <div className="item-design red"></div>
          <div className="item-design"></div>
          <div className="item-design blank3"></div>
          <div className="item-design blank"></div>
          <div className="item-design blank2"></div>
          <div className="item-design yellow"></div>
          <div className="item-design"></div>
          <div className="item-design"></div>
          <div className="item-design blue"></div>
          <div className="item-design blank"></div>
          <div className="item-design black"></div>
        </div>
      </div>

      <style>{styles}</style>
    </div>
  );
};

export default Art;