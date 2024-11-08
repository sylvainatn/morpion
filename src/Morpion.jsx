import React, { useState } from "react";
import "./Morpion.css"; // Fichier CSS pour les styles

// Composant principal TicTacToe
function Morpion() {

   const [board, setBoard] = useState(Array(9).fill(null)); // Tableau de 9 cases
   const [isXNext, setIsXNext] = useState(true); // Détermine le joueur en cours
   const [winner, setWinner] = useState(null); // Garde le gagnant s'il y en a un

   // Fonction qui gère le clic sur une case
   const handleClick = (index) => {
      if (board[index] || winner) return; // Ignore le clic si la case est remplie ou si on a déjà un gagnant

      const newBoard = [...board];
      newBoard[index] = isXNext ? "X" : "O"; // Place X ou O dans la case
      setBoard(newBoard);
      setIsXNext(!isXNext); // Change de joueur

      const calculatedWinner = calculateWinner(newBoard);
      if (calculatedWinner) setWinner(calculatedWinner); // Définit le gagnant s'il y en a un
   };

   // Fonction qui calcule le gagnant
   const calculateWinner = (squares) => {
      const winningCombinations = [
         [0, 1, 2],
         [3, 4, 5],
         [6, 7, 8],
         [0, 3, 6],
         [1, 4, 7],
         [2, 5, 8],
         [0, 4, 8],
         [2, 4, 6],
      ];

      for (let [a, b, c] of winningCombinations) {
         if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
         }
      }
      return null;
   };

   // Fonction pour réinitialiser le jeu
   const resetGame = () => {
      setBoard(Array(9).fill(null));
      setIsXNext(true);
      setWinner(null);
   };

   return (
      <div className="tic-tac-toe">
         <h1>Tic-Tac-Toe</h1>
         <div className="board">
            {board.map((value, index) => (
               <button
                  key={index}
                  className="square"
                  onClick={() => handleClick(index)}
               >
                  {value}
               </button>
            ))}
         </div>
         <div className="status">
            {winner ? (
               <p>🎉 Le joueur {winner} a gagné ! 🎉</p>
            ) : (
               <p>Tour du joueur : {isXNext ? "X" : "O"}</p>
            )}
         </div>
         <button className="reset-button" onClick={resetGame}>
            Réinitialiser le jeu
         </button>
      </div>
   );
}

export default Morpion;
