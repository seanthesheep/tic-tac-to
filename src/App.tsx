import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Client } from 'boardgame.io/react';
import TicTacToe from './game'
import Board from './Board'

const App = Client({
  game: TicTacToe,
  board: Board
})

export default App;
