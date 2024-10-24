import PhotoCard from '~/components/Card/PhotoCard'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { Photo } from '~/types/schema/PhotoSchema'
import { useEffect, useState } from 'react'
import { fetchPhotoPage } from '~/api/unsplashApi'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function PhotoGrid() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    handleFetchPhotoPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleFetchPhotoPage() {
    try {
      const data = await fetchPhotoPage(page, 10)
      console.log('Fetched data:', data)

      // Verify that `data` is a non-empty array before updating state
      if (Array.isArray(data) && data.length > 0) {
        setPhotos((prevPhotos) => [...prevPhotos, ...data])
        setPage((prevPage) => prevPage + 1)
      } else {
        // If no data is returned, assume there are no more photos
        setHasMore(false)
      }
    } catch (err) {
      console.error('Error fetching images:', err)
    }
  }

  return (
    <div className='w-full lg:max-w-[1336px] md:px-6 mx-auto my-6'>
      <InfiniteScroll
        dataLength={photos.length}
        next={handleFetchPhotoPage}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more photos to display.</p>}
      >
        <ResponsiveMasonry columnsCountBreakPoints={{ 640: 1, 768: 2, 990: 3 }}>
          <Masonry gutter='24px'>
            {photos.map((photo, index) => (
              <PhotoCard key={`photo-${photo.id}-${index}`} photo={photo} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </InfiniteScroll>
    </div>
  )
}
