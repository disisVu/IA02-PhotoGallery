export async function downloadPhoto(url: string, filename: string) {
  try {
    const response = await fetch(url, { mode: 'cors' })
    if (!response.ok) {
      throw new Error('Failed to fetch image.')
    }

    const blob = await response.blob()
    const link = document.createElement('a')
    const objectUrl = URL.createObjectURL(blob)

    link.href = objectUrl
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()

    // Clean up
    URL.revokeObjectURL(objectUrl)
    link.remove()
  } catch (error) {
    console.error('Error downloading photo:', error)
  }
}
