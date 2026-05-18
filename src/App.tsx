import { useState, useCallback } from 'react'
import Board from './components/Board'
import GameStatus from './components/GameStatus'

type Player = 'X' | 'O'
type SquareValue = Player | null
type Score = Record<'X' | 'O' | 'draw', number>

const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
]

interface GameResult {
  winner: Player
  line: number[]
}

function calculateWinner(squares: SquareValue[]): GameResult | null {
  for (const line of WIN_LINES) {
    const [a, b, c] = line
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a] as Player, line }
    }
  }
  return null
}

function App() {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [score, setScore] = useState<Score>({ X: 0, O: 0, draw: 0 })

  const result = calculateWinner(squares)
  const winner = result?.winner ?? null
  const winningLine = result?.line ?? null
  const isDraw = !winner && squares.every(Boolean)

  const handleClick = useCallback((i: number) => {
    if (winner || squares[i]) return
    const next = squares.slice()
    next[i] = xIsNext ? 'X' : 'O'
    setSquares(next)

    const newResult = calculateWinner(next)
    if (newResult) {
      setScore(prev => ({ ...prev, [newResult.winner]: prev[newResult.winner] + 1 }))
    } else if (next.every(Boolean)) {
      setScore(prev => ({ ...prev, draw: prev.draw + 1 }))
    }

    setXIsNext(!xIsNext)
  }, [squares, xIsNext, winner, setScore, setSquares, setXIsNext])

  const reset = useCallback(() => {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Tic Tac Toe
        </h1>
        <p className="text-gray-500 text-xs mt-2 font-normal">
          Web Dev Cohort 2026
        </p>
      </header>

      <div className="bg-[#15151c] rounded-3xl px-7 py-8 sm:px-9 sm:py-10 shadow-[0_4px_24px_rgba(0,0,0,0.3)] flex flex-col items-center w-full max-w-[400px] animate-fade-in-up">
        <GameStatus winner={winner} xIsNext={xIsNext} draw={isDraw} />
        <Board squares={squares} winningLine={winningLine} onSquareClick={handleClick} />
        <button
          className="mt-7 px-8 py-3 rounded-xl bg-white text-[#0c0c12] text-sm font-semibold cursor-pointer transition-all duration-200 hover:bg-[#e8e8ee] hover:-translate-y-0.5 active:scale-[0.97]"
          onClick={reset}
        >
          New Game
        </button>
      </div>

      <div className="mt-6 flex gap-6 text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold text-indigo-400">{score.X}</span>
          <span className="text-xs text-gray-500">X Wins</span>
        </div>
        <div className="w-px bg-white/5" />
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold text-gray-400">{score.draw}</span>
          <span className="text-xs text-gray-500">Draws</span>
        </div>
        <div className="w-px bg-white/5" />
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold text-emerald-400">{score.O}</span>
          <span className="text-xs text-gray-500">O Wins</span>
        </div>
      </div>
    </div>
  )
}

export default App
