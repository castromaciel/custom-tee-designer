import { AIPicker, Button, ColorPicker, FilePicker, TabList } from '@/components'
import { DecalTypes, EditorTabs, FilterTabs } from '@/config/constants'
import { reader } from '@/config/helpers'
import { fadeAnimation, slideAnimation } from '@/config/motion'
import { useStore } from '@/hooks'
import { DecalFilterTab } from '@/interfaces/constants.interface'
import state from '@/store'
import { AnimatePresence, motion } from 'framer-motion'
import { Fragment, MouseEvent, useMemo, useState } from 'react'

type TabType = 'colorpicker' | 'filepicker' | 'aipicker';

const Customizer = () => {
  const snap = useStore()
  const [file, setFile] = useState<File>({} as File)

  const [activeEditorTab, setActiveEditorTab] = useState('')
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false
  })

  const [prompt, setPrompt] = useState('')
  const [generatingImg, setGeneratingImg] = useState(false)

  const handleEditorTabClick = (event: MouseEvent<HTMLDivElement>) => {
    const tabName = event.currentTarget.id
    setActiveEditorTab((prev) => prev === tabName ? '' : tabName)
  }

  const handleDecals = (type: string, result: string) => {
    const decalType = DecalTypes[type]

    state[decalType.stateProperty] = result

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab = (tabName: DecalFilterTab) => {
    switch (tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true
        state.isFullTexture = false
        break;
    }

    setActiveFilterTab((prev) => ({
      ...prev,
      [tabName]: !prev[tabName]
    }))
  }

  const readFile = (type: string) => {
    reader(file)
      .then((result: any) => {
        handleDecals(type, result)
        setActiveEditorTab('')
      })
  }

  const handleSubmit = async (type: string) => {
    if (!prompt) return alert('Enter a prompt')

    try {
      setGeneratingImg(true)
      const response = await fetch('https://custom-tee-designer.onrender.com/api/v1/dalle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt
        })
      })

      const data: { photo: string } = await response.json()
      handleDecals(type, `data:image/png;base64,${data.photo}`)

    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false)
      setActiveEditorTab('')
    }
  }

  const TabComponents: Record<TabType, any> = useMemo(() => ({
    colorpicker: ColorPicker,
    filepicker: FilePicker,
    aipicker: AIPicker
  }), [])

  const TabPanelComponent = TabComponents[activeEditorTab as TabType] || null;

  return (
    <AnimatePresence>
      {
        !snap.intro && (
          <Fragment>
            <motion.div
              {...slideAnimation('left')}
              key='Custom'
              className='absolute top-0 left-0 z-10'
            >
              <div className='flex items-center min-h-screen'>
                <div className='editortabs-container tabs'>
                  <TabList
                    items={EditorTabs}
                    onTabClick={handleEditorTabClick}
                  />

                  {
                    TabPanelComponent && (
                      <TabPanelComponent
                        prompt={prompt}
                        setPrompt={setPrompt}
                        generatingImg={generatingImg}
                        handleSubmit={handleSubmit}
                        file={file}
                        readFile={readFile}
                        setFile={setFile}
                      />
                    )}

                </div>
              </div>
            </motion.div>

            <motion.div
              {...fadeAnimation}
              className='absolute top-5 right-5 z-10'
            >
              <Button
                title='Back'
                type='filled'
                onClick={() => state.intro = true}
                className='w-fit px-4 py-2.5 font-bold text-sm'
              />

            </motion.div>

            <motion.div
              {...slideAnimation('up')}
              className='filtertabs-container'
            >
              <TabList
                items={FilterTabs}
                isFilterTab
                activeFilterTab={activeFilterTab}
                onTabClick={(e) => handleActiveFilterTab(e.currentTarget.id as DecalFilterTab)}
              />
            </motion.div>
          </Fragment>
        )
      }
    </AnimatePresence>
  )
}

export default Customizer
