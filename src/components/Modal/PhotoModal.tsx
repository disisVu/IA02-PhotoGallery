import { Direction } from '~/types/enum/direction'
import NextPhotoButton from '~/components/Button/NextModalButton'
import CloseModalButton from '~/components/Button/CloseModalButton'
import AvatarWithName from '~/components/User/AvatarWithName'
import ButtonPrimary from '~/components/Button/ButtonPrimary'
import { colors } from '~/styles/colors'
import { useEffect, useRef, useState } from 'react'
import { Photo } from '~/types/schema/PhotoSchema'
import { PhotoStatistic } from '~/types/schema/PhotoStatisticSchema'
import {
  addPhotoLike,
  fetchPhotoDetail,
  fetchPhotoStatistic
} from '~/api/unsplashApi'
import ButtonSmall from '~/components/Button/ButtonSmall'
import { IconType } from '~/types/enum/iconType'
import { ButtonType } from '~/types/enum/buttonType'
import { useNavigate } from 'react-router-dom'
import { getIdFromURL, updateURL } from '~/helper/getIdFromUrl'
import PhotoView from '~/components/Frame/PhotoView'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendar,
  faCamera,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons'
import { formatDateTime } from '~/helper/formatTime'

interface PhotoModalProps {
  photoId: string
  onClose: () => void
  getAdjacentPhotoIds: (currentPhotoId: string) => {
    prevId: string | null
    nextId: string | null
  }
}

export default function PhotoModal({
  onClose,
  getAdjacentPhotoIds
}: PhotoModalProps) {
  const [photoId, setPhotoId] = useState<string>(getIdFromURL())
  const navigate = useNavigate()
  const modalRef = useRef<HTMLDivElement>(null)
  const [photo, setPhoto] = useState<Photo>()
  const [photoStats, setPhotoStats] = useState<PhotoStatistic>()

  useEffect(() => {
    handleFetchPhotoDetail()
    handleFetchPhotoStatistic()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoId])

  async function handleFetchPhotoDetail() {
    try {
      const data = await fetchPhotoDetail(photoId)
      console.log('Fetched data:', data)
      setPhoto(data)
    } catch (err) {
      console.error('Error fetching images:', err)
    }
  }

  async function handleFetchPhotoStatistic() {
    try {
      const data = await fetchPhotoStatistic(photoId, undefined, 1)
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

  function handleClose() {
    onClose()
    navigate('/')
  }

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

  function navigateNextPhoto(direction: Direction) {
    const { prevId, nextId } = getAdjacentPhotoIds(photoId)
    switch (direction) {
      case Direction.Left: {
        if (prevId === null) return
        updateURL(prevId)
        setPhotoId(prevId)
        break
      }
      case Direction.Right: {
        if (nextId === null) return
        updateURL(nextId)
        setPhotoId(nextId)
        break
      }
    }
  }

  return (
    <>
      {photo ? (
        // Backdrop Area
        <div
          className='
          fixed inset-0 
          max-h-full
          overflow-y-auto
          md:px-16 lg:px-32
          md:pt-4
          cursor-zoom-out
          flex justify-center 
          bg-black bg-opacity-50 z-20
        '
          onClick={(e) => {
            e.stopPropagation()
            handleClose()
          }}
          onWheel={handleScroll}
        >
          {/* Modal Content */}
          <div
            className='relative w-full cursor-default'
            onClick={(e) => e.stopPropagation()} // Prevent click event propagation from inner content
          >
            <div
              className='w-full flex flex-col justify-start items-center bg-white rounded-md'
              style={{ minHeight: 'calc(100vh - 1rem)' }}
            >
              {/* Header */}
              <div className='w-full z-40 px-5 py-3 flex justify-between items-center'>
                <AvatarWithName user={photo.user} />
                <div className='flex gap-2'>
                  <ButtonSmall
                    buttonType={ButtonType.Border}
                    iconType={IconType.Like}
                    onClick={() => {
                      addPhotoLike(photo.id)
                    }}
                  />
                  <ButtonPrimary
                    buttonText='Download'
                    onClick={() => {}}
                    isEnabled={true}
                  />
                </div>
              </div>
              {/* Modal detail */}
              <div className='w-full h-auto'>
                {/* Photo view */}
                <PhotoView photoUrl={photo.urls.full} />
                {/* Photo detail */}
                {photoStats !== undefined && (
                  <div
                    className='
                  w-full
                  px-5 py-4 leading-5 
                  flex flex-col
                  justify-start items-start
                  text-sm
                  text-left
                '
                  >
                    {/* Photo Views and Downloads */}
                    <div className='flex flex-col md:flex-row gap-4 md:gap-40'>
                      <div>
                        <p style={{ color: colors.textTertiary }}>Views</p>
                        <p style={{ color: colors.textDefault }}>
                          {photoStats.views.total}
                        </p>
                      </div>
                      <div>
                        <p style={{ color: colors.textTertiary }}>Downloads</p>
                        <p style={{ color: colors.textDefault }}>
                          {photoStats.downloads.total}
                        </p>
                      </div>
                    </div>
                    {/* Photo Description */}
                    <div className='pt-8 pb-6'>
                      <p style={{ color: colors.textTertiary }}>Description</p>
                      <p style={{ color: colors.textDefault }}>
                        {photo.alt_description}
                      </p>
                    </div>
                    {/* Photo Location */}
                    <div
                      className='flex flex-col gap-2'
                      style={{ color: colors.textTertiary }}
                    >
                      {photo.location.name !== null && (
                        <div className='flex flex-row items-center gap-3'>
                          <FontAwesomeIcon icon={faLocationDot} />
                          <p>{photo.location.name}</p>
                        </div>
                      )}
                      {/* Photo Created at Time */}
                      {photo.created_at !== null && (
                        <div className='flex flex-row items-center gap-3'>
                          <FontAwesomeIcon icon={faCalendar} />
                          <p>Published at {formatDateTime(photo.created_at)}</p>
                        </div>
                      )}
                      {/* Photo Exif */}
                      {photo.exif.name !== null && (
                        <div className='flex flex-row items-center gap-3'>
                          <FontAwesomeIcon icon={faCamera} />
                          <p>{photo.exif.name}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* Close Modal Button */}
              <CloseModalButton
                onClick={(e) => {
                  e.stopPropagation()
                  handleClose()
                }}
              />
              {/* Left Photo Button */}
              <NextPhotoButton
                direction={Direction.Left}
                onClick={() => {
                  navigateNextPhoto(Direction.Left)
                }}
              />
              {/* Right Photo Button */}
              <NextPhotoButton
                direction={Direction.Right}
                onClick={() => {
                  navigateNextPhoto(Direction.Right)
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <h4>Loading</h4>
      )}
    </>
  )
}
