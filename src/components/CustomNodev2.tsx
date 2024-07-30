import Chessground from "@react-chess/chessground";

import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";


// custom node component
const CustomNode = ({ nodeDatum, toggleNode, onAddClick }) => {
    
    const config ={
        fen: nodeDatum.fen,
        orientation: 'white' as 'white' | 'black',

      };
    

    return (
        <g>
            <circle
                r={15}
                style={{ fill: nodeDatum.children ? 'lightsteelblue' : '#fff', stroke: 'steelblue', strokeWidth: 3 }}
                onClick={() => toggleNode(nodeDatum)}
            />
            <foreignObject
                width={600}
                height={600}
                x={-200}
                y={-200}

            >
        <div style={{ width: '400px', height: '400px' }}>

        <div>
        <Chessground width={400} height={400} config={config} />
          {/*
          <WithMoveValidation fen={nodeDatum.fen}/>
            
          */}
        </div>

        </div>

            </foreignObject>
        </g>
    );
};

export default CustomNode;

