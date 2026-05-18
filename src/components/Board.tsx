import Square from './Square'

type SquareValue = 'X' | 'O' | null

interface BoardProps {
  squares: SquareValue[]
  winningLine: number[] | null
  onSquareClick: (index: number) => void
}

export default function Board({ squares, winningLine, onSquareClick }: BoardProps) {
  return (
    <div className="flex flex-col gap-2">
      {[0, 1, 2].map(row => (
        <div className="flex gap-2" key={row}>
          {[0, 1, 2].map(col => {
            const i = row * 3 + col
            return (
              <Square
                key={i}
                value={squares[i]}
                index={i}
                isWinning={winningLine?.includes(i) ?? false}
                onClick={() => onSquareClick(i)}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}
