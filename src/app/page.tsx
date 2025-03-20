'use client'
import { useState } from 'react';

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  const checkWinner = (squares) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner || isDraw) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (newBoard.every(square => square !== null)) {
      setIsDraw(true);
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsDraw(false);
  };

  const renderSquare = (index) => {
    return (
      <button
        className={`w-20 h-20 text-5xl font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md
          ${!board[index] && !winner && !isDraw ? 'bg-yellow-100 hover:bg-yellow-200' : 'bg-yellow-100'} 
          ${board[index] === 'X' ? 'text-purple-500' : 'text-teal-500'}`}
        onClick={() => handleClick(index)}
        disabled={!!board[index] || !!winner || isDraw}
      >
        {board[index]}
      </button>
    );
  };

  const getStatus = () => {
    if (winner) return `${winner} Wins! 🎉`;
    if (isDraw) return 'It\'s a Tie! 🤝';
    return `${isXNext ? 'X' : 'O'}'s Turn!`;
  };

  const getStatusClass = () => {
    if (winner) return "text-green-500";
    if (isDraw) return "text-orange-500";
    return isXNext ? "text-purple-500" : "text-teal-500";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-purple-100">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border-4 border-purple-200">
        <h1 className="text-4xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-teal-400">Tic Tac Toe</h1>
        
        <div className={`mb-6 text-2xl font-bold text-center rounded-full py-2 ${getStatusClass()}`}>
          {getStatus()}
        </div>
        
        <div className="grid grid-cols-3 gap-3 bg-purple-50 p-4 rounded-2xl">
          {[...Array(9)].map((_, index) => (
            <div key={index} className="flex justify-center">
              {renderSquare(index)}
            </div>
          ))}
        </div>
        
        {(winner || isDraw) && (
          <div className="mt-6 flex justify-center">
            <button
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-teal-400 text-white text-xl font-bold rounded-full hover:from-purple-600 hover:to-teal-500 transform hover:scale-105 transition-all shadow-lg"
              onClick={resetGame}
            >
              Play Again! 🎮
            </button>
          </div>
        )}
      </div>
    </div>
  );
}