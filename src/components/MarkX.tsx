export default function MarkX() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100">
      <line
        className="mark-line--1"
        x1="20" y1="20" x2="80" y2="80"
        stroke="#818cf8" strokeWidth="8" strokeLinecap="round"
      />
      <line
        className="mark-line--2"
        x1="80" y1="20" x2="20" y2="80"
        stroke="#818cf8" strokeWidth="8" strokeLinecap="round"
      />
    </svg>
  )
}
