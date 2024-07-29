import React, { useState } from 'react';
import { Chess } from 'cm-chess';
import styled from 'styled-components';

interface Node {
  id: string;
  name: string;
  fen: string;
  children?: Node[];
}

const TreeTools: React.FC = () => {
  const [data, setData] = useState<Node>({
    id: "0",
    name: "Initial Position",
    fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  });
  const [pgnInput, setPgnInput] = useState('');

  const chess = new Chess();
  const pgn = [
    '[Event "Casual Game"]',
    '[Site "Berlin GER"]',
    '[Date "1852.??.??"]',
    '[EventDate "?"]',
    '[Round "?"]',
    '[Result "1-0"]',
    '[White "Adolf Anderssen"]',
    '[Black "Jean Dufresne"]',
    '[ECO "C52"]',
    '[WhiteElo "?"]',
    '[BlackElo "?"]',
    '[PlyCount "47"]',
    '',
    '1. e4 c6 2. d4 d5',
    '3. e5 c5 ',
  ];
  chess.loadPgn(pgn.join('\n'));
  const history = chess.history({ verbose: true });

  let id = 0;
  const processHistory = (history: any, parentNode: Node) => {
    let currentNode = parentNode;

    history.forEach((move: any, index: number) => {
      id++;
      const newNode: Node = {
        id: id.toString(),
        name: `Move ${index + 1}`,
        fen: move.fen,
        children: []
      };

      if (!currentNode.children) {
        currentNode.children = [];
      }
      currentNode.children.push(newNode);

      if (move.variations && move.variations.length > 0) {
        move.variations.forEach((variation: any) => {
          processHistory(variation, currentNode);
        });
      }

      currentNode = newNode;
    });
  };

  const pgnToJson = () => {
    const newData = { ...data };
    processHistory(history, newData);
    setData(newData);
  };



  const downloadJson = () => {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadPgnFromString = () => {
    const pgnArray = pgnInput.split('\n');
    chess.loadPgn(pgnArray.join('\n'));
    const newHistory = chess.history({ verbose: true });

    const newData = { ...data };
    processHistory(newHistory, newData);
    setData(newData);
  };

  return (
    <Container>
      <h1>Tree Tools</h1>

      <div className="sub-container">
        <div className="text-area">
          <textarea
            value={pgnInput}
            onChange={(e) => setPgnInput(e.target.value)}
            placeholder="Enter PGN here"
            rows={10}
            cols={50}
          />
        </div>

        <div className="buttons-container">
          <button onClick={loadPgnFromString}>Load PGN</button>
          <button onClick={pgnToJson}>Convert PGN a JSON</button>
          <button onClick={downloadJson}>Download JSON</button>
        </div>
      </div>
    </Container>
  );
};

export default TreeTools;

const Container = styled.div`
margin: 20px;

.sub-container{
  display: flex;
  flex-direction: column;
}

.buttons-container > button {
  margin-right: 10px;
}

`;