import { Chess } from 'cm-chess'

const chess = new Chess()
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
  '1.e4 e5 2. Nf3 (2. Nc3 d5) 2... Nc6',
]

chess.loadPgn(pgn.join('\n'))


console.log(chess.history({ verbose: true }))

const history_length = chess.history({ verbose: true }).length


