import { Game, IPlayer, IGameCtx } from 'boardgame.io/core';
import { AI, IAIMoveObj } from 'boardgame.io/ai';



const IsVictory = (cells: Array<IPlayer | null>, player: IPlayer) => {
    const positions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let pos of positions) {
      const symbol = cells[pos[0]];
      let winner = symbol;
      for (let i of pos) {
        if (cells[i] != symbol) {
          winner = null;
          break;
        }
      }
      if (winner != null) return true;
    }
    return false;
  }

  const TicTacToe = ({
    name: "tic-tac-toe",

    setup: () => ({
      cells: Array(9).fill(null)
    }),

    moves: {
      clickCell(G: any, ctx: any, id: any) {
        if (G.cells[id] === null) {
          G.cells[id] = ctx.currentPlayer;
        }
      }
    },
    turn: { moveLimit: 1 },

    endIf: (G: any, ctx: any) => {
        if (IsVictory(G.cells, ctx.currentPlayer)) {
            return { winner: ctx.currentPlayer };
        }
    }
  });
export default TicTacToe;
