import { useStore } from '@/hooks'
import state from '@/store'
import { FC } from 'react'
import { ColorResult, SketchPicker } from 'react-color'


interface ColorPickerProps { }

const ColorPicker: FC<ColorPickerProps> = () => {
  const snap = useStore()

  const handleChange = (color: ColorResult) => {
    state.primaryColor = color.hex
  }

  return (
    <div className='absolute left-full ml-3'>
      <SketchPicker
        color={snap.primaryColor}
        disableAlpha
        onChange={handleChange}
      />
    </div>
  )
}

export default ColorPicker
