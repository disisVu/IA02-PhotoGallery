import { Direction } from '~/types/direction'
import NextPhotoButton from '~/components/Button/NextModalButton'
import CloseModalButton from '~/components/Button/CloseModalButton'
import AvatarWithName from '~/components/User/AvatarWithName'
import ButtonPrimary from '~/components/Button/ButtonPrimary'
import { colors } from '~/styles/colors'
import { useEffect, useRef } from 'react'

interface PhotoModalProps {
  photoSrc: string
  onClose: () => void
}

export default function PhotoModal({ photoSrc, onClose }: PhotoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Temporarily disable outer modal content scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    // Re-enable scroll when modal closes
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Handle modal scroll event on backdrop area
  const handleScroll = (e: React.WheelEvent) => {
    if (modalRef.current) {
      modalRef.current.scrollBy({
        top: e.deltaY,
        behavior: 'smooth'
      })
      e.preventDefault() // Prevent default scroll behavior on page content
    }
  }

  return (
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
      {/* Close Modal Button */}
      <CloseModalButton />
      {/* Left Photo Button */}
      <NextPhotoButton direction={Direction.Left} onClick={() => {}} />
      {/* Right Photo Button */}
      <NextPhotoButton direction={Direction.Right} onClick={() => {}} />
      {/* Modal Content */}
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
            <AvatarWithName />
            <ButtonPrimary
              buttonText='Download'
              onClick={() => {}}
              isEnabled={false}
            />
          </div>
          {/* Photo view */}
          <div
            className='w-full h-full lg:px-5 sm:px-0 py-3 flex justify-center'
            style={{ maxHeight: '84vh' }}
          >
            <img src={photoSrc} alt='photo' className='object-contain' />
          </div>
          {/* Views and Downloads count */}
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
              <p style={{ color: colors.textDefault }}>53482</p>
            </div>
            <div className='h-full leading-5'>
              <p className='text-sm' style={{ color: colors.textTertiary }}>
                Downloads
              </p>
              <p style={{ color: colors.textDefault }}>1024</p>
            </div>
          </div>
          <div className='w-full h-64 bg-black'></div>
        </div>
      </div>
    </div>
  )
}
