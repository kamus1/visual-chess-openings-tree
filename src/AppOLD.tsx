import { useState, useCallback } from 'react';
import './App.css';
import Chessground from "@react-chess/chessground";
import { Chess } from 'chess.js';

import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";


// Importa el tipo Key
import type { Key } from './types/chessground';
interface ConfigBoard {
  fen: string;
  orientation: 'white' | 'black';
  turnColor: 'white' | 'black';
  check: boolean;
  coordinates: boolean;
  viewOnly: boolean;
  highlight: {
    lastMove: boolean;
    check: boolean;
  };
  animation: {
    enabled: boolean;
    duration: number;
  };
  movable: {
    free: boolean;
    color: 'white' | 'black' | 'both' | undefined;
    showDests: boolean;
  };
  draggable: {
    enabled: boolean;
    showGhost: boolean;
  };
  selectable: {
    enabled: boolean;
  };
  events: {
    change: () => void;
    move: (orig: Key, dest: Key) => void;
  };
  drawable: {
    enabled: boolean;
    visible: boolean;
    defaultSnapToValidMove: boolean;
    eraseOnClick: boolean;
  };
}


const DynamicComponentBoard = ({ configBoard }: { configBoard: ConfigBoard }) => {
  return (
    <div className='card'>
      <Chessground width={600} height={600} config={configBoard} />
    </div>
  );
};



function App() {
  const [chess, setChess] = useState(new Chess());
  const [components, setComponents] = useState<{ id: number }[]>([]);

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
              //fen: chess.fen(),
              turnColor: chess.turn() === 'w' ? 'white' : 'black',
              lastMove: [orig, dest],
              movable: {
                free: true,
                color: chess.turn() === 'w' ? 'white' : 'black',
                showDests: true,
              },
            }));
            // add a new component board  
            addComponent();
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


  const createConfigWithFen = (fen: string): ConfigBoard => ({
    fen: fen,
    orientation: 'white',
    turnColor: chess.turn() === 'w' ? 'white' : 'black',
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
      color: chess.turn() === 'w' ? 'white' : 'black',
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
        console.log(fen);
      },
      move: (orig: string, dest: string) => {
        try {
          const move = chess.move({ from: orig, to: dest });
          
          if (move) {
            setChess(new Chess(chess.fen()));
            setConfig(prevConfig => ({
              ...prevConfig,
              //fen: prevConfig.fen,
              turnColor: chess.turn() === 'w' ? 'white' : 'black',
              lastMove: [orig, dest],
              movable: {
                free: true,
                color: chess.turn() === 'w' ? 'white' : 'black',
                showDests: true,
              },
            }));
            // add a new component board  
            addComponent();
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
  


  const addComponent = useCallback(() => {
    setComponents(prevComponents => [
      ...prevComponents,
      { id: prevComponents.length + 1, config: createConfigWithFen(chess.fen()) }
    ]);
  }, [chess.fen()]);



  return (
    <>
      <h1>Visual Chess Openings Tree</h1>

      <div className="card">
        <Chessground width={600} height={600} config={config} />
      </div>

      <div className="card">
      {components.map(comp => (
        <DynamicComponentBoard key={comp.id} configBoard={comp.config} />
      ))}
    </div>
    </>
  );
}

export default App;
