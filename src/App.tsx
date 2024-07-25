import React, { useState } from 'react';
import './App.css';
import Chessground from "@react-chess/chessground";
import { Chess } from 'chess.js';

import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";

function App() {
  const [chess, setChess] = useState(new Chess());
  const [config, setConfig] = useState({
    fen: chess.fen(),
    orientation: 'white' as 'white' | 'black',
    turnColor: 'white' as 'black' | 'white',
    check: false,
    coordinates: false,
    viewOnly: false,
    highlight: {
      lastMove: true,
      check: true,
    },
    animation: {
      enabled: true,
      duration: 200,
    },
    movable: {
      free: true,
      color: 'white' as 'white' | 'black' | 'both' | undefined,
      showDests: true,
    },
    draggable: {
      enabled: true,
      showGhost: true,
    },
    selectable: {
      enabled: true,
    },
    events: {
      change: () => {
        console.log(config);
      },
      move: (orig: string, dest: string) => {

        try {
          const move = chess.move({ from: orig, to: dest });
          
          if (move) {
            setChess(new Chess(chess.fen()));
            setConfig(prevConfig => ({
              ...prevConfig,
              fen: chess.fen(),
              turnColor: chess.turn() === 'w' ? 'white' : 'black',
              lastMove: [orig, dest],
              movable: {
                free: true,
                color: chess.turn() === 'w' ? 'white' : 'black',
                showDests: true,
              },
            }));
          }

        } catch (e) {
          // Invalid move
          console.log("invalid");
          // don't update the board
          setConfig(prevConfig => ({
            ...prevConfig,
          }));
        }
        
        console.log(orig, dest);
      }
    },
    drawable: {
      enabled: true,
      visible: true,
      defaultSnapToValidMove: true,
      eraseOnClick: true,
    },
  });

  return (
    <>
      <h1>Visual Chess Openings Tree</h1>

      <div className="card">
        <Chessground width={600} height={600} config={config} />
      </div>
    </>
  );
}

export default App;
