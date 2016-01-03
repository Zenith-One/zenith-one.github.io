import { createReducer }     from '../utils';
import { PLAYER_MOVE,
         COMPUTER_MOVE,
         INIT,
         RESET_GAME } from 'constants/tictactoe';

import mini from 'projects/TicTacToe/minimax.js';

const tileBoard = [
  'topLeft', 'topMiddle', 'topRight',
  'centerLeft', 'centerMiddle', 'centerRight',
  'bottomLeft', 'bottomMiddle', 'bottomRight'
];


const initialState = {
  board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  depth: 0,
  playerTurn: true,
  winner: false,
  playerSigil: 'X',
  computerSigil: 'O'
};

export default createReducer(initialState, {
  [PLAYER_MOVE] : (state, payload) => {
    let newState = Object.assign({}, state);
    let newBoard = state.board.slice();
    let move = tileBoard.indexOf(payload.move);
    newBoard[move] = state.playerSigil;
    newState.board = newBoard;
    newState.playerTurn = !newState.playerTurn;
    newState.winner = mini.terminalState(newState.board);
    return newState;
  },
  [COMPUTER_MOVE]: (state) => {
    mini.minimax(state.board, state.depth, state.computerSigil);
    let newState = Object.assign({}, state);
    newState.depth = newState.depth + 1;
    newState.board = mini.choice;
    newState.playerTurn = !newState.playerTurn;
    newState.winner = mini.terminalState(newState.board);
    return newState;
  },
  [RESET_GAME]: () => {
    return initialState;
  },
  [INIT]: (initalState, payload) => {
    let newState = Object.assign(initialState, payload);
    newState.playerTurn = newState.playerSigil === 'X';
    newState.computerSigil = newState.playerSigil === 'X' ? 'O' : 'X';
    return newState;
  }
});
