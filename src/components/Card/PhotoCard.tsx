import { createPortal } from 'react-dom'
import useHover from '~/hooks/useHover'
import useModal from '~/hooks/useModal'
import PhotoModal from '~/components/Modal/PhotoModal'

interface PhotoCardProps {
  photoUrl: string
}

export default function PhotoCard({ photoUrl }: PhotoCardProps) {
  const { isHovered, onMouseEnter, onMouseLeave } = useHover()
  const { showModal, openModal, closeModal } = useModal()

  return (
    <div
      className='relative z-0 rounded-md w-full h-auto cursor-zoom-in'
      onClick={openModal}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isHovered && (
        <div
          className='absolute z-10 w-full h-full shadow-inner'
          style={{
            backgroundColor: 'rgba(0,0,0,0.15)',
            boxShadow: 'inset 0px 0px 40px rgba(0, 0, 0, 0.3)'
          }}
        ></div>
      )}
      <img src={photoUrl} alt='photo' />
      {showModal &&
        createPortal(
          <PhotoModal photoSrc={photoUrl} onClose={closeModal} />,
          document.body
        )}
    </div>
  )
}
