import React from 'react';
import { Link, useNavigate } from 'react-router-dom';   

const Articles = ({ papers, searchQuery }) => {
  const navigate = useNavigate();
  return (
    <div>
      <button className="back" onClick={() => navigate(-1)}>Back</button>
        <Link to="/">
          <button className="home">Home</button>
        </Link>      
        <hr />
      <form action="/search" method="get">
        <input 
          type="text" 
          name="query" 
          placeholder="Search..." 
          required 
          defaultValue={searchQuery || ''}
        />
        <button type="submit">Search</button>
      </form>
      
      <div className="response-area">
        {papers && papers.length > 0 ? (
          papers.map((paper, index) => (
            <div className="paper-card" key={index}>
              <h2>{paper.title}</h2>
              <p className="abstract">{paper.abstract}</p>
              <p className="year">Year Published: {paper.yearPublished}</p>
              <p className="document-type">Document Type: {paper.documentType}</p>
              <div className="paper-links">
                {paper.downloadUrl && (
                  <a href={paper.downloadUrl} target="_blank" rel="noopener noreferrer" className="download-button">
                    Download PDF
                  </a>
                )}
                {paper.readerUrl && (
                  <a href={paper.readerUrl} target="_blank" rel="noopener noreferrer" className="reader-button">
                    Read Online
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Search for a Free to access Paper!</p>
        )}
      </div>

      <footer>
        <div className="citation">
          <h3>Citation</h3>
          <p>
            Knoth, P., Herrmannova, D., Cancellieri, M. et al. CORE: A Global Aggregation Service for Open Access Papers. Nature Scientific Data 10, 366 (2023).{' '}
            <a href="https://doi.org/10.1038/s41597-023-02208-w">https://doi.org/10.1038/s41597-023-02208-w</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Articles;
