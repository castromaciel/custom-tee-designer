import state from '@/store'
import { CSSProperties, FC, MouseEventHandler } from 'react'
import { useSnapshot } from 'valtio'

type ButtonType = 'filled'

interface ButtonProps {
  type: ButtonType
  title: string
  onClick: MouseEventHandler<HTMLButtonElement>
  className?: string
}

const Button: FC<ButtonProps> = ({
  onClick, title, type, className = ''
}) => {
  const snap = useSnapshot(state)

  const generateStyle = (type: ButtonType): CSSProperties => {
    if (type === 'filled') {
      return {
        backgroundColor: snap.color,
        color: '#fff'
      }
    }

    return {}
  }

  return (
    <button
      onClick={onClick}
      className={`px-2 py-1.5 flex-1 rounded-md ${className}`}
      style={generateStyle(type)}
    >
      {title}
    </button>
  )
}

export default Button
