import { createPortal } from 'react-dom'
import useHover from '~/hooks/useHover'
import useModal from '~/hooks/useModal'
import PhotoModal from '~/components/Modal/PhotoModal'
import { Photo } from '~/types/schema/PhotoSchema'
import PhotoCardOverlay from './PhotoCardOverlay'
import Tooltip from '../Tooltip'

interface PhotoCardProps {
  photo: Photo
}

export default function PhotoCard({ photo }: PhotoCardProps) {
  const { isHovered, onMouseEnter, onMouseLeave } = useHover()
  const { showModal, openModal, closeModal } = useModal()

  let mouseEvent: React.MouseEvent | null = null

  function updateURL(id: string) {
    // Update the URL without reloading the page
    window.history.replaceState(null, '', `/photos/${id}`)
  }

  function handleClickPhotoCard() {
    updateURL(photo.id)
    openModal()
  }

  function handleMouseEnter(e: React.MouseEvent) {
    mouseEvent = e
    onMouseEnter()
  }

  return (
    <div
      className='relative z-0 rounded-md w-full h-auto cursor-zoom-in'
      onClick={handleClickPhotoCard}
      onMouseEnter={(e) => {
        handleMouseEnter(e)
      }}
      onMouseLeave={onMouseLeave}
    >
      {isHovered && <PhotoCardOverlay photo={photo} />}
      <img src={photo.urls.regular} alt='photo' className='w-full h-auto' />
      {showModal &&
        createPortal(
          <PhotoModal photo={photo} onClose={closeModal} />,
          document.body
        )}
      {isHovered && mouseEvent && (
        <Tooltip text={photo.alt_description!} e={mouseEvent} />
      )}
    </div>
  )
}
