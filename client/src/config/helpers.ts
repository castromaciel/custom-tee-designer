export const downloadCanvasToImage = () => {
  const canvas = document.querySelector('canvas') as HTMLCanvasElement
  const dataURL = canvas.toDataURL()
  const link = document.createElement('a')

  link.href = dataURL
  link.download = 'canvas.png'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Reads a File and resolves a promise with the data URL.
 *
 * @param {File} file - The File object to be read.
 * @returns {Promise<string | ArrayBuffer | null>} A Promise that resolves with the data URL of the file.
 */
export const reader = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve) => {
    const fileReader = new FileReader()
    fileReader.onload = () => resolve(fileReader.result)
    fileReader.readAsDataURL(file)
  })

/**
 * Determines the contrasting color (black or white) for a given background color.
 *
 * @param {string} color - The background color in hexadecimal format (e.g., '#RRGGBB').
 * @returns {string} The contrasting text color ('black' or 'white') based on the background color.
 */
export const getContrastingColor = (color: string): string => {
  // Remove the '#' character if it exists
  const hex = color.replace('#', '')

  // Convert the hex string to RGB values
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  // Calculate the brightness of the color
  const brightness = (r * 299 + g * 587 + b * 114) / 1000

  // Return black or white depending on the brightness
  return brightness > 128 ? 'black' : 'white'
}
