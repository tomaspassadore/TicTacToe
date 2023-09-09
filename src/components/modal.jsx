import confetti from 'canvas-confetti'

const Modal = ({ winner, setWinner, setBoard }) => {
  const handleClick = () => {
    setBoard(Array(9).fill(null))
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }
  const win = (wins) => {
    if (wins != null) {
      confetti({
        particleCount: 30,
        spread: 50,
        ticks: 150,
        startVelocity: 42
      })
    }
  }
  return (
    <section className='modal'>
      <div className='modal-text'>
        <h3>
          {
            winner == null ? 'TIE' : 'WINS:'
          }
        </h3>
        <h3>
          {
            winner == null ? '' : winner
          }
        </h3>
        <button
          className='modal-button'
          onClick={handleClick}
        >
          RESTART
        </button>
      </div>
      {win(winner)}
    </section>
  )
}
export { Modal }
