import { AnimatePresence, motion } from 'framer-motion'

import { Button } from '@/components'
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '@/config/motion'
import { useStore } from '@/hooks'
import state from '@/store'

const Home = () => {
  const snap = useStore()

  return (
    <AnimatePresence>
      {
        snap.intro && (
          <motion.section className='home' {...slideAnimation('left')}>
            <motion.header {...slideAnimation('down')}>
              <img
                className='w-8 h-8 object-contain'
                src='./threejs.png'
                alt='Threejs Logo'
              />
            </motion.header>

            <motion.div className='home' {...headContainerAnimation}>
              <motion.div {...headTextAnimation}>
                <h1 className='head-text'>LET'S<br className='xl:block hidden' /> DO IT</h1>
              </motion.div>

              <motion.div className='flex flex-col gap-5' {...headContentAnimation}>
                <p className='max-w-md font-normal text-gray-600'>
                  Create your unique and exclusive shirt with our brand-new 3D customization tool.
                  <strong>Unleash your imagination</strong>{' '} and define your own style.
                </p>

                <Button
                  backgroundColor={state.primaryColor}
                  onClick={() => state.intro = false}
                  type='filled'
                  title='Customize it'
                  className='w-fit px-4 py-2.5 font-bold text-sm'  
                />
              </motion.div>

            </motion.div>
          </motion.section>
        )
      }
    </AnimatePresence>
  )
}

export default Home
