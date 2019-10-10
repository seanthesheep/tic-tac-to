import React from 'react';
import PropTypes from 'prop-types';
import { Game, IPlayer, IGameCtx } from 'boardgame.io/core';
import { AI, IAIMoveObj } from 'boardgame.io/ai';

type GameState = {
    cells: Array<IPlayer | null>
};

interface IProps {
    moves: any;
    events: any;
    isActive: boolean;
    G: GameState;
    ctx: IGameCtx;
  }

class Board extends React.Component<IProps> {
    onClick(id: number) {
      if (this.isActive(id)) {
        this.props.moves.clickCell(id);
        this.props.events.endTurn();
      }
    }
    isActive(id: number) {
      return this.props.isActive && this.props.G.cells[id] === null;
    }
  
    render() {
      const cellStyle: React.CSSProperties = {
        border: '1px solid #555',
        width: '50px',
        height: '50px',
        lineHeight: '50px',
        textAlign: 'center',
      };
  
      let tbody: JSX.Element[] = [];
      for (let i = 0; i < 3; i++) {
        let cells: JSX.Element[] = [];
        for (let j = 0; j < 3; j++) {
          const id = 3 * i + j;
          cells.push(
            <td style={cellStyle} key={id} onClick={() => this.onClick(id)}>
              {this.props.G.cells[id]}
            </td>
          );
        }
        tbody.push(<tr key={i}>{cells}</tr>);
      }
  
      let winner: JSX.Element | undefined = undefined;
      if (this.props.ctx.gameover) {
        winner =
          this.props.ctx.gameover.winner !== undefined ? (
            <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
          ) : (
              <div id="winner">Draw!</div>
            );
      }
      return (
        <div>
          <table id="board">
            <tbody>{tbody}</tbody>
          </table>
          {winner}
        </div>
      );
    }
  }
  
export default Board;