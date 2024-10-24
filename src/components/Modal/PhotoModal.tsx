import { Direction } from '~/types/enum/direction'
import NextPhotoButton from '~/components/Button/NextModalButton'
import CloseModalButton from '~/components/Button/CloseModalButton'
import AvatarWithName from '~/components/User/AvatarWithName'
import ButtonPrimary from '~/components/Button/ButtonPrimary'
import { colors } from '~/styles/colors'
import { useEffect, useRef, useState } from 'react'
import { Photo, PhotoStatistic } from '~/types/schema/PhotoSchema'
import { fetchPhotoStatistic } from '~/api/unsplashApi'

interface PhotoModalProps {
  photo: Photo
  onClose: () => void
}

export default function PhotoModal({ photo, onClose }: PhotoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [photoStats, setPhotoStats] = useState<PhotoStatistic>()

  useEffect(() => {
    fetchPhotoStats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchPhotoStats() {
    try {
      const data = await fetchPhotoStatistic(photo.id, undefined, 1)
      console.log('Fetched data:', data)
      setPhotoStats(data)
    } catch (err) {
      console.error('Error fetching images:', err)
    }
  }

  // Temporarily disable outer modal content scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    // Re-enable scroll when modal closes
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Handle modal scroll event on backdrop area
  function handleScroll(e: React.WheelEvent) {
    if (modalRef.current) {
      modalRef.current.scrollBy({
        top: e.deltaY,
        behavior: 'smooth'
      })
      e.preventDefault() // Prevent default scroll behavior on page content
    }
  }

  return (
    <div>
      {/* Close Modal Button */}
      <CloseModalButton
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
      />
      {/* Left Photo Button */}
      <NextPhotoButton direction={Direction.Left} onClick={() => {}} />
      {/* Right Photo Button */}
      <NextPhotoButton direction={Direction.Right} onClick={() => {}} />
      // Backdrop Area
      <div
        className='
          fixed inset-0 
          max-h-full
          overflow-y-auto
          lg:px-32
          md:px-16
          pt-4
          cursor-zoom-out
          flex items-center justify-center 
          bg-black bg-opacity-50 z-30
        '
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        onWheel={handleScroll}
      >
        <div
          className='relative w-full h-full cursor-default bg-white rounded-md shadow-lg'
          onClick={(e) => e.stopPropagation()} // Prevent click event propagation from inner content
        >
          <div
            className='w-full flex flex-col items-center'
            style={{ maxHeight: '100vh' }}
          >
            {/* Header */}
            <div className='w-full px-5 py-3 flex justify-between items-center'>
              <AvatarWithName user={photo.user} />
              <ButtonPrimary
                buttonText='Download'
                onClick={() => {}}
                isEnabled={false}
              />
            </div>
            {/* Photo view */}
            <div
              className='w-full h-full lg:px-5 sm:px-0 py-3 flex justify-center'
              style={{ height: '84vh' }}
            >
              <img
                src={photo.urls.full}
                alt='photo'
                className='object-contain h-full w-auto'
              />
            </div>
            {/* Views and Downloads count */}
            {photoStats !== undefined && (
              <div
                className='
                w-full h-16 px-5 pt-4 leading-5 
                flex 
                lg:flex-row lg:gap-40
                justify-start items-start
                flex-col gap-6
              '
              >
                <div className='h-full leading-5'>
                  <p className='text-sm' style={{ color: colors.textTertiary }}>
                    Views
                  </p>
                  <p style={{ color: colors.textDefault }}>
                    {photoStats.views.total}
                  </p>
                </div>
                <div className='h-full leading-5'>
                  <p className='text-sm' style={{ color: colors.textTertiary }}>
                    Downloads
                  </p>
                  <p style={{ color: colors.textDefault }}>
                    {photoStats.downloads.total}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
