import { useEffect, useState } from 'react'
// import { fetchPhotoPage } from '~/api/unsplashApi'
import PhotoGrid from '~/components/Grid/PhotoGrid'
import NavBar from '~/components/Header/NavBar'
import { Photo } from '~/types/schema/PhotoSchema'
import photosData from '~/api/mockup.json'

export default function HomePage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setPhotos(photosData)
  }, [])

  // async function handleFetchPhotoPage() {
  //   try {
  //     const data = await fetchPhotoPage()
  //     setPhotos(data)
  //   } catch (err) {
  //     setError('Failed to fetch photos.')
  //     throw err
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // if (loading) return <p>Loading...</p>
  // if (error) return <p>{error}</p>

  return (
    <div className='flex flex-col justify-start items-center'>
      <NavBar />
      <PhotoGrid photos={photos} />
    </div>
  )
}
