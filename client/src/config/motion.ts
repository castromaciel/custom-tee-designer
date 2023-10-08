/**
 * Animation Configurations
 *
 * This module defines animation configuration objects for various animations to 
 * use with framer-motion
 *
 * @module motion
 */

export type TransitionConfig = {
  type: string
  duration: number
  delay?: number
  damping?: number,
  stiffness?: number,
  restDelta?: number,
  delayChildren?: number,
}

export type Direction = 'down' | 'left' | 'right' | 'up'

export type AnimationState = {
  x?: number
  y?: number
  opacity?: number
  transition?: TransitionConfig
}

export type AnimationStates = {
  initial?: AnimationState;
  animate?: AnimationState;
  exit?: AnimationState;
  transition?: TransitionConfig
}

export const transition = { type: 'spring', duration: 0.8 }

/**
 * Generate Slide Animation Configuration
 *
 * This function generates a configuration object for a slide animation based on the specified direction.
 *
 * @param {Direction} direction - The direction of the slide animation ('left', 'right', 'up', or 'down').
 *
 * @returns {AnimationStates} An animation configuration object with 'initial,' 'animate,' and 'exit' properties.
 *
 * @example
 * // Example usage:
 * const slideLeftAnimation = slideAnimation('left');
 * const slideRightAnimation = slideAnimation('right');
 *
 * // Use in a component with a motion library like Framer Motion:
 * <motion.div initial={slideLeftAnimation.initial} animate={slideLeftAnimation.animate} exit={slideLeftAnimation.exit}>
 *   Content to animate
 * </motion.div>
 */
export const slideAnimation = (direction: Direction): AnimationStates => {
  return {
    initial: {
      x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      opacity: 0,
      transition: { ...transition, delay: 0.5 },
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { ...transition, delay: 0 },
    },
    exit: {
      x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      transition: { ...transition, delay: 0 },
    }
  }
}

/**
 * Fade Animation Configuration
 *
 * This configuration defines a fade animation with 'initial,' 'animate,' and 'exit' states.
 *
 * @constant {AnimationStates} fadeAnimation - The fade animation configuration.
 * @property {AnimationState} initial - The initial state of the animation.
 * @property {AnimationState} animate - The animate state of the animation.
 * @property {AnimationState} exit - The exit state of the animation.
 */
export const fadeAnimation = {
  initial: {
    opacity: 0,
    transition: { ...transition, delay: 0.5 },
  },
  animate: {
    opacity: 1,
    transition: { ...transition, delay: 0 },
  },
  exit: {
    opacity: 0,
    transition: { ...transition, delay: 0 },
  },
}

/**
 * Head Text Animation Configuration
 *
 * This configuration defines a head text animation with 'initial' and 'animate' states.
 *
 * @constant {AnimationStates} headTextAnimation - The head text animation configuration.
 * @property {AnimationState} initial - The initial state of the animation.
 * @property {AnimationState} animate - The animate state of the animation.
 * @property {AnimationState} transition - The transition settings for the animation.
 */
export const headTextAnimation: AnimationStates = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: {
    type: 'spring',
    damping: 5,
    stiffness: 40,
    restDelta: 0.001,
    duration: 0.3,
  },
}

/**
 * Head Content Animation Configuration
 *
 * This configuration defines a head content animation with 'initial' and 'animate' states.
 *
 * @constant {AnimationStates} headContentAnimation - The head content animation configuration.
 * @property {AnimationState} initial - The initial state of the animation.
 * @property {AnimationState} animate - The animate state of the animation.
 * @property {AnimationState} transition - The transition settings for the animation.
 */
export const headContentAnimation: AnimationStates = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: {
    type: 'spring',
    damping: 7,
    stiffness: 30,
    restDelta: 0.001,
    duration: 0.6,
    delay: 0.2,
    delayChildren: 0.2,
  },
}

/**
 * Head Container Animation Configuration
 *
 * This configuration defines a head container animation with 'initial,' 'animate,' and 'exit' states.
 *
 * @constant {AnimationStates} headContainerAnimation - The head container animation configuration.
 * @property {AnimationState} initial - The initial state of the animation.
 * @property {AnimationState} animate - The animate state of the animation.
 * @property {AnimationState} exit - The exit state of the animation.
 */
export const headContainerAnimation: AnimationStates = {
  initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
  animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
  exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
}
