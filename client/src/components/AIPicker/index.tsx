import { Dispatch, FC, Fragment, SetStateAction } from 'react'
import { Button } from '..'

interface AIPickerProps {
  prompt: string
  setPrompt: Dispatch<SetStateAction<string>>
  generatingImg: boolean
  handleSubmit: (type: string) => Promise<void>
}

const AIPicker: FC<AIPickerProps> = ({
  generatingImg, handleSubmit, prompt, setPrompt
}) => (
  <div className='aipicker-container'>
    <textarea
      className='aipicker-textarea'
      rows={5}
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      placeholder='Ask AI'>
    </textarea>
    <div className='flex flex-wrap gap-3'>
      {
        generatingImg ? (
          <Button
            type='outline'
            title='Asking AI...'
            className='text-xs'
            disabled
          />
        ):
        <Fragment>
          <Button
            title='AI Logo'
            type='outline'
            className='text-xs'
            onClick={() => handleSubmit('logo')}
          />
          <Button
            title='AI full'
            type='filled'
            className='text-xs'
            onClick={() => handleSubmit('full')}
          />

        </Fragment>
      }
    </div>
  </div>
)

export default AIPicker
