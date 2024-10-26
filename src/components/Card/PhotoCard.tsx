import { createPortal } from 'react-dom'
import useHover from '~/hooks/useHover'
import useModal from '~/hooks/useModal'
import PhotoModal from '~/components/Modal/PhotoModal'
import { Photo } from '~/types/schema/PhotoSchema'
import PhotoCardOverlay from '~/components/Card/PhotoCardOverlay'
import Tooltip from '~/components/Tooltip'
import { updateURL } from '~/helpers/urlHelpers'

interface PhotoCardProps {
  photo: Photo
  getAdjacentPhotoIds: (currentPhotoId: string) => {
    prevId: string | null
    nextId: string | null
  }
}

export default function PhotoCard({
  photo,
  getAdjacentPhotoIds
}: PhotoCardProps) {
  const { isHovered, onMouseEnter, onMouseLeave } = useHover()
  const { showModal, openModal, closeModal } = useModal()

  let mouseEvent: React.MouseEvent | null = null

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
          <PhotoModal
            photoId={photo.id}
            onClose={closeModal}
            getAdjacentPhotoIds={getAdjacentPhotoIds}
          />,
          document.body
        )}
      {isHovered && mouseEvent && (
        <Tooltip text={photo.alt_description!} e={mouseEvent} />
      )}
    </div>
  )
}
