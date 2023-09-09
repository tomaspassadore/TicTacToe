// Button to restart the game
const Restart = ({ children, setBoard, setWinner }) => {
  const handleClick = () => {
    setBoard(Array(9).fill(null))
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }
  return (
    <button
      className='restart'
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
export { Restart }
