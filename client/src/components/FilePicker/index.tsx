import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
import { Button } from '..'

interface FilePickerProps {
  file: File
  setFile: Dispatch<SetStateAction<File>>
  readFile: (type: string) => void
}

const FilePicker: FC<FilePickerProps> = ({
  file, readFile, setFile
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{
    setFile(event.target.files![0])
  }
  return (
    <div className='filepicker-container'>
      <div className='flex-1 flex flex-col'>
        <input
          accept='image/*'
          id='file-upload'
          type='file'
          onChange={handleChange}
        />
        <label htmlFor='file-upload' className='filepicker-label'>
          Upload File
        </label>

        <p className='mt-2 text-gray-500 text-xs truncate'>
          { file?.name || 'Not file selected'}
        </p>
      </div>

      <div className='mt-4 flex flex-wrap gap-3'>
        <Button
          className='text-xs'
          onClick={() => readFile('logo')}
          type='outline'
          title='Logo'
        />
        <Button
          className='text-xs'
          onClick={() => readFile('full')}
          type='filled'
          title='Full'
        />
      </div>
    </div>
  )
}

export default FilePicker
