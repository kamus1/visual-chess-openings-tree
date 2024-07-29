// tools/pgnToJsonTree.ts
import { Chess } from 'cm-chess';

export const stringPgnToJson = (pgn: string) => {
  const chess = new Chess();
  chess.loadPgn(pgn);
  const history = chess.history({ verbose: true });

  let id = 0;
  const processHistory = (history: any, parentNode: any) => {
    let currentNode = parentNode;

    history.forEach((move: any, index: number) => {
      id++;
      const newNode = {
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

  const data = { id: "0", name: "Initial Position", fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", children: [] };
  processHistory(history, data);

  return data;
};
