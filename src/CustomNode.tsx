import WithMoveValidation from "./integrations/WithMoveValidation.jsx";

// custom node component
const CustomNode = ({ nodeDatum, toggleNode, onAddClick }) => {
    
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
                style={{background: 'red', width: '400px', height: '440px' }}
            >
        <div style={{ width: '400px', height: '400px' }}>
        <div>
          <WithMoveValidation fen={nodeDatum.fen}/>
        </div>

        <div>
            <button onClick={() => onAddClick(nodeDatum)} style={{ fontSize: '12px' }}>
                Add
            </button>
        </div>
        </div>

            </foreignObject>
        </g>
    );
};

export default CustomNode;

