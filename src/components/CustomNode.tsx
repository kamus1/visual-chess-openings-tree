import Chessboard from "chessboardjsx";

interface NodeDatum {
  fen: string; // Assuming fen is a string representing the chessboard position
  // Add other properties if necessary
}

const CustomNode = ({ nodeDatum }: { nodeDatum: NodeDatum }) => {
  return (
    <g>
      <foreignObject width={600} height={600} x={-200} y={-200}>
        <div style={{ width: "400px", height: "400px" }}>
          <Chessboard position={nodeDatum.fen} width={400} />
        </div>
      </foreignObject>
    </g>
  );
};

export default CustomNode;
