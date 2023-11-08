import { AIPicker, Button, ColorPicker, FilePicker, TabList } from '@/components'
import { EditorTabs, FilterTabs } from '@/config/constants'
import { fadeAnimation, slideAnimation } from '@/config/motion'
import { useStore } from '@/hooks'
import state from '@/store'
import { AnimatePresence, motion } from 'framer-motion'
import { Fragment, MouseEvent, useMemo, useState } from 'react'

const Customizer = () => {
  const snap = useStore()

  const [activeEditorTab, setActiveEditorTab] = useState('')

  const handleEditorTabClick = (event: MouseEvent<HTMLDivElement>) => {
    const tabName = event.currentTarget.id
    setActiveEditorTab((prev) => prev === tabName ? '' : tabName)
  }

  const TabComponents = useMemo(() => ({
    colorpicker: ColorPicker,
    filepicker: FilePicker,
    aipicker: AIPicker
  }), [])

  const TabPanelComponent = TabComponents[activeEditorTab as keyof typeof TabComponents] || null

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

                  { TabPanelComponent && <TabPanelComponent /> }

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
                onTabClick={(e) => console.log(e.currentTarget.id)}
              />
            </motion.div>
          </Fragment>
        )
      }
    </AnimatePresence>
  )
}

export default Customizer
