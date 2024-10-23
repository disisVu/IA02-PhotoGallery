import PhotoCard from '~/components/Card/PhotoCard'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { Photo } from '~/types/schema/PhotoSchema'
// import InfiniteScroll from 'react-infinite-scroll-component'

interface PhotoGridProps {
  photos: Photo[]
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
  return (
    <div
      className='
        w-full
        lg:max-w-[1336px] 
        md:px-6 
        mx-auto
        my-6
      '
    >
      <ResponsiveMasonry columnsCountBreakPoints={{ 640: 1, 768: 2, 990: 3 }}>
        <Masonry gutter='24px'>
          {photos.map((photo, index) => {
            return <PhotoCard key={`photo-${index}`} photo={photo} />
          })}
        </Masonry>
      </ResponsiveMasonry>
    </div>
    //   <InfiniteScroll
    //     dataLength={9}
    //     next={() => {}}
    //     hasMore={false}
    //     loader={<h4>Loading...</h4>}
    //   >
    //   </InfiniteScroll>
    // </>
  )
}
