'use client'

const bubbleStyles = [
  { width: 80, height: 80, left: '10%', animationDuration: '30s', animationDelay: '0s' },
  { width: 60, height: 60, left: '30%', animationDuration: '25s', animationDelay: '-5s' },
  { width: 100, height: 100, left: '50%', animationDuration: '35s', animationDelay: '-10s' },
  { width: 70, height: 70, left: '70%', animationDuration: '28s', animationDelay: '-15s' },
  { width: 90, height: 90, left: '90%', animationDuration: '32s', animationDelay: '-20s' },
]

export function BackgroundBubbles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbleStyles.map((style, index) => (
        <div
          key={index}
          className="bubble"
          style={{
            position: 'absolute',
            width: style.width,
            height: style.height,
            left: style.left,
            animationDuration: style.animationDuration,
            animationDelay: style.animationDelay,
          }}
        />
      ))}
    </div>
  )
} 