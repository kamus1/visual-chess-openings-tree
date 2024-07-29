import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

export function Home() {
  const originRoute = "/visual-chess-openings-tree";
  
  const [customPgn, setCustomPgn] = useState('');
  const navigate = useNavigate();

  const handlePgnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomPgn(e.target.value);
  };

  const handleLoadTreeClick = () => {
    if (customPgn.trim() === '') {
      alert('Please enter PGN before navigating.');
    } else {
      navigate(`${originRoute}/tree-loaded`, { state: { pgn: customPgn } });
    }
  };

  return (
    <Container>
      <div className="home-container">
        <div className="search-opening">
          <p>Search Opening</p>
          <div>
            <Link to={`${originRoute}/tree/caro-kann`}>View Caro Kann</Link>
            |
          </div>
        </div>

        <div className="load-custom-pgn">
          <p>Load Custom PGN</p>
          <div>
            <textarea
              value={customPgn}
              onChange={handlePgnChange}
              placeholder="Enter PGN here"
              rows={10}
              cols={50}
            />
            <div>
              <button onClick={handleLoadTreeClick}>Load Tree</button>
            </div>
          </div>
        </div>

        <div className="interactive-tree">
          <p>Interactive Tree</p>
          <div>
            <Link to={`${originRoute}/tree/tree1`}>View Tree 1</Link>
          </div>
        </div>

        <div className="create-empty-tree">
          <p>Create a New Tree</p>
        </div>

        <div className="tools">
          <p>Tools</p>
          <div>
            <Link to={`${originRoute}/tools`}>Go to Tools</Link>
          </div>
        </div>

      </div>
    </Container>
  );
}

const Container = styled.div`
  --border-radius-card: 10px;

  .home-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 40px;
    column-gap: 100px;
    row-gap: 40px;
    height: 100%;
  }

  .home-container > div {
    display: flex;
    flex-direction: column;
    width: 600px;
    height: 340px;
    background-color: #ffffff;
    color: white;
    font-size: 24px;
    border-radius: var(--border-radius-card);
    border: 1px solid #BDC5BE;
  }

  .home-container > div > p {
    color: #424242;
    background-color: #f7f7f7;
    margin-top: 0;
    justify-content: start;
    padding: 10px;
    font-size: 27px;
    border-top-left-radius: var(--border-radius-card);
    border-top-right-radius: var(--border-radius-card);
    border-bottom: 1px solid #BDC5BE;
  }

  .home-container > div > div {
    width: 100%;
    height: 100%;
    margin-bottom: 15px;
    padding: 10px;
    padding-top: 0px;
  }

  .home-container > div > div > textarea {
    width: 100%;
    height: 150px;
    margin-bottom: 15px;
  }

  .nav-bar__name {
    margin: 12px;
    font-size: 38px;
  }

  .nav-bar {
    display: flex;
    justify-content: start;
    align-items: center;
    margin: 0;
    background-color: #868484;
    color: white;
    height: 80px;
    width: 100%;
  }

  .home-container > div > div > textarea {
  width: 95%;
  height: 160px;
  margin-bottom: 15px;
  overflow: hidden; 
  resize: none; 
  border: 1px solid #BDC5BE;
  background: fixed;
  color: #424242;
}


button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 0.8em;
  font-weight: 500;
  font-family: inherit;
  background-color: #4c8ab6;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

`;
