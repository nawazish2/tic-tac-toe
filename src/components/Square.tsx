import MarkX from './MarkX'
import MarkO from './MarkO'

type SquareValue = 'X' | 'O' | null

interface SquareProps {
  value: SquareValue
  index: number
  onClick: () => void
  isWinning: boolean
}

export default function Square({ value, index, onClick, isWinning }: SquareProps) {
  const base = "w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer border-0 disabled:cursor-default"
  const empty = "bg-[#1e1e27] hover:bg-[#2a2a35] hover:-translate-y-0.5"
  const filled = value === 'X' ? "bg-indigo-400/10" : "bg-emerald-400/10"
  const win = "!bg-amber-400/10 ring-2 ring-amber-400 animate-pulse-glow"
  const delay = index * 0.04

  return (
    <button
      className={`${base} ${value ? filled : empty} ${isWinning ? win : ''} animate-scale-in`}
      style={{ animationDelay: `${delay}s` }}
      onClick={onClick}
      disabled={!!value}
      aria-label={`Cell ${index}, ${value || 'empty'}`}
    >
      {value === 'X' && <MarkX />}
      {value === 'O' && <MarkO />}
    </button>
  )
}
