type Player = 'X' | 'O'

interface GameStatusProps {
  winner: Player | null
  xIsNext: boolean
  draw: boolean
}

export default function GameStatus({ winner, xIsNext, draw }: GameStatusProps) {
  if (winner) {
    const color = winner === 'X' ? 'text-indigo-400' : 'text-emerald-400'
    return (
      <div className="text-center mb-6 animate-scale-in">
        <span className={`text-lg font-semibold ${color}`}>{winner}</span>
        <span className="text-amber-400 font-semibold text-lg ml-1">wins!</span>
      </div>
    )
  }

  if (draw) {
    return (
      <div className="text-center mb-6 animate-scale-in">
        <span className="text-gray-500 font-semibold text-lg">It's a draw!</span>
      </div>
    )
  }

  const color = xIsNext ? 'text-indigo-400' : 'text-emerald-400'
  return (
    <div className="text-center mb-6">
      <span className={`text-base font-medium ${color}`}>{xIsNext ? 'X' : 'O'}</span>
      <span className="text-gray-500 text-base ml-1">'s turn</span>
    </div>
  )
}
