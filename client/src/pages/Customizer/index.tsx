import { Button, Tab } from '@/components'
import { EditorTabs, FilterTabs } from '@/config/constants'
import { fadeAnimation, slideAnimation } from '@/config/motion'
import { useStore } from '@/hooks'
import state from '@/store'
import { AnimatePresence, motion } from 'framer-motion'
import { Fragment } from 'react'

const Customizer = () => {
  const snap = useStore()

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
                  {
                    EditorTabs.map((tab) => (
                      <Tab
                        key={tab.name}
                        tab={tab}
                        onClick={() => { }}
                      />
                    ))
                  }
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
              {
                FilterTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    isFilterTab
                    activeTab=''
                    onClick={() => { }}
                  />
                ))
              }
            </motion.div>
          </Fragment>
        )
      }
    </AnimatePresence>
  )
}

export default Customizer
