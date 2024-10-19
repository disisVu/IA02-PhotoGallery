import fs from 'fs'
import path from 'path'

// Supported image file extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp']

export function readImageFilesFromFolder(folderPath: string): string[] {
  try {
    // Read all files from the folder
    const files = fs.readdirSync(folderPath)

    // Filter and get only image files
    const imageFiles = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase()
        return IMAGE_EXTENSIONS.includes(ext)
      })
      .map((file) => path.join(folderPath, file)) // Get the full path of each image file

    return imageFiles
  } catch (error) {
    console.error('Error reading image files from folder:', error)
    return []
  }
}

export const photos = import.meta.glob('~/assets/mockup/*.{png,jpg,jpeg,svg}', {
  eager: true
})
