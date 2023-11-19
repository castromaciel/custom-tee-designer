import { getContrastingColor } from '@/config/helpers'
import { useStore } from '@/hooks'
import { CSSProperties, FC, MouseEventHandler } from 'react'
type ButtonType = 'filled' | 'outline'

interface ButtonProps {
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  title: string
  type: ButtonType
  disabled?: boolean
}

const Button: FC<ButtonProps> = ({
  className = '',
  onClick,
  title,
  type,
  disabled = false
}) => {
  const snap = useStore()

  const generateStyle = (type: ButtonType): CSSProperties => {
    if (type === 'filled') {
      return {
        backgroundColor: snap.primaryColor,
        color: getContrastingColor(snap.primaryColor)
      }
    }

    if (type === 'outline') {
      return {
        borderWidth: '1px',
        borderColor: snap.primaryColor,
        color: snap.primaryColor,
      }
    }

    return {}
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`px-2 py-1.5 flex-1 rounded-md ${className}`}
      style={generateStyle(type)}
    >
      {title}
    </button>
  )
}

export default Button
