import './app.css'
import { Square } from './components/square'
import { Restart } from './components/restart'
import { Modal } from './components/modal'
import { useState } from 'react'

// Assignment of icons
const symbolX = '✖'
const symbolO = '◯'
// Possible winning combinations
const WINNER = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
function App () {
  // State's declaration
  const [board, setBoard] = useState(() => {
    // Evalua si existe una partida guardada para reanudarla
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  }) // Status of each square (X || O || null)
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? symbolX
  }) // Status indicating whose turn it is (X || O)
  const [winner, setWinner] = useState(null)
  // Function to be executed when there are no more moves left.
  const tie = (array) => {
    let exit = 1 // Flag var
    array.forEach(element => {
      if (element == null) exit = 0
    })
    return exit
  }
  // Function that checks if someone has won
  const winnerValidation = (boardToCheck) => {
    for (const element of WINNER) {
      const a = element[0]; const b = element[1]; const c = element[2]
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a] // If someone wins
      }
    }
    return null // If anybody wins
  }
  // Function that updates a square when you click on it.
  const updateBoard = (index) => {
    const newBoard = [...board]
    // Check if there is already an element in the square.
    if (newBoard[index] != null) return
    // Stores "X" or "O" in a new array called newBoard
    newBoard[index] = turn
    setBoard(newBoard)
    // It checks whose turn it is and changes
    const newTurn = (turn === symbolX) ? symbolO : symbolX
    setTurn(newTurn)
    // Save the current match
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    // It is evaluated if someone won
    const win = winnerValidation(newBoard)
    setWinner(win)
  }
  return (
    <main className='container'>
      <h1>TIC TAC TOE</h1>
      {/* Container that indicates whose turn is it */}
      <div className='container-turn'>
        <h3>TURN OF</h3>
        <div className='turn'>{turn}</div>
      </div>
      <div className='grid-container'>
        {
          // For each position of the array board, a square is designated with its index.
          board.map((_, index) => {
            return (
              <Square
                updateBoard={updateBoard}
                index={index}
                key={index}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </div>
      {/* Container of the restart button */}
      <Restart
        setBoard={setBoard}
        setWinner={setWinner}
      >
        RESTART
      </Restart>
      {
        (winner != null || tie(board) === 1)
          ? <Modal
              winner={winner}
              setWinner={setWinner}
              setBoard={setBoard}
            />
          : ''
      }
    </main>
  )
}
export default App
