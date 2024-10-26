import PhotoCard from '~/components/Card/PhotoCard'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { Photo } from '~/types/schema/PhotoSchema'
import { useEffect, useState } from 'react'
import { fetchPhotoPage } from '~/api/unsplashApi'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from '~/components/Loader/LoaderIndicator'

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
      const data = await fetchPhotoPage(page)
      console.log('Fetched data:', data)
      console.log('Page: ', page)

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

  function getAdjacentPhotoIds(currentPhotoId: string) {
    const currentIndex = photos.findIndex(
      (photo) => photo.id === currentPhotoId
    )

    if (currentIndex === -1) {
      return { prevId: null, nextId: null }
    }

    const prevId = currentIndex > 0 ? photos[currentIndex - 1].id : null
    const nextId =
      currentIndex < photos.length - 1 ? photos[currentIndex + 1].id : null

    return { prevId, nextId }
  }

  return (
    <div className='w-full lg:max-w-[1336px] md:px-6 mx-auto my-6'>
      <InfiniteScroll
        dataLength={photos.length}
        next={handleFetchPhotoPage}
        hasMore={hasMore}
        loader={<Loader />}
        endMessage={<p>No more photos to display.</p>}
      >
        <ResponsiveMasonry columnsCountBreakPoints={{ 640: 1, 768: 2, 990: 3 }}>
          <Masonry gutter='24px'>
            {photos.map((photo, index) => (
              <PhotoCard
                key={`photo-${photo.id}-${index}`}
                photo={photo}
                getAdjacentPhotoIds={getAdjacentPhotoIds}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </InfiniteScroll>
    </div>
  )
}
