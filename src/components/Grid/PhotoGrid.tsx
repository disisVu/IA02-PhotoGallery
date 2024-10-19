import { photos } from '~/helpers/readImageFiles'
import PhotoCard from '~/components/Card/PhotoCard'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
// import InfiniteScroll from 'react-infinite-scroll-component'

type PhotoModule = {
  default: string
}

export default function PhotoGrid() {
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
          {Object.entries(photos).map(([path, module], index) => {
            const photoModule = module as PhotoModule
            return (
              <PhotoCard
                key={`${path}-${index}`}
                photoUrl={photoModule.default}
              />
            )
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
