import { useState, useCallback } from 'react';
import Chessground from "@react-chess/chessground";
import { Chess } from 'chess.js';

import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";

// Componente personalizado para los nodos
const CustomNode = ({ nodeDatum, toggleNode, onAddClick }) => {

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
                // add a new component board  
                //addComponent();
              }
    
            } catch (e) {
              // Invalid move
              console.log("invalid");
              // don't update the board
              setConfig(prevConfig => ({
                ...prevConfig,
              }));
            }
          
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
    <g onClick={toggleNode}>
      <rect
        x={-50}
        y={-25}
        width={100}
        height={100}
        fill="lightblue"
        stroke="black"
        strokeWidth="2"
      />
      <text
        x={0}
        y={-5}
        textAnchor="middle"
        fontSize="14px"
      >
        {nodeDatum.name} and {nodeDatum.attributes?.department}
      </text>
      <foreignObject
        width={600}
        height={600}
        style={{ overflow: 'scroll', background: 'red', width: '600px', height: '600px' }}
      >
        <div>

        <Chessground width={600} height={600} config={config} />

          <button onClick={() => onAddClick(nodeDatum)} style={{ fontSize: '12px' }}>
            Add
          </button>
        </div>
      </foreignObject>
    </g>
  );
};

export default CustomNode;
