import { CSSProperties, FC, MouseEventHandler } from 'react'

type ButtonType = 'filled'

interface ButtonProps {
  backgroundColor?: string
  className?: string
  onClick: MouseEventHandler<HTMLButtonElement>
  title: string
  type: ButtonType
}

const Button: FC<ButtonProps> = ({
  backgroundColor = '#efbd48',
  className = '',
  onClick,
  title,
  type
}) => {
  const generateStyle = (type: ButtonType): CSSProperties => {
    if (type === 'filled') {
      return {
        backgroundColor,
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
