import { useEffect, useState } from 'react'
import {
  addPhotoLike,
  fetchPhotoDetail,
  fetchPhotoStatistic
} from '~/api/unsplashApi'
import { getIdFromURL } from '~/helpers/urlHelpers'
import { colors } from '~/styles/colors'
import { Photo } from '~/types/schema/PhotoSchema'
import { PhotoStatistic } from '~/types/schema/PhotoStatisticSchema'
import AvatarWithName from '~/components/User/AvatarWithName'
import ButtonSmall from '~/components/Button/ButtonSmall'
import { IconType } from '~/types/enum/iconType'
import { ButtonType } from '~/types/enum/buttonType'
import PhotoView from '~/components/Frame/PhotoView'
import {
  faCalendar,
  faCamera,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatDateTime } from '~/helpers/formatTime'
import ButtonWithDropdown from '~/components/Button/ButtonWithDropdown'
import { downloadPhoto } from '~/utils/downloadFiles'
import Loader from '~/components/Loader/LoaderIndicator'

export default function PhotoDetailPage() {
  const photoId: string = getIdFromURL()

  const [photo, setPhoto] = useState<Photo>()
  const [photoStats, setPhotoStats] = useState<PhotoStatistic>()

  useEffect(() => {
    handleFetchPhotoDetail()
    handleFetchPhotoStatistic()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  async function handleDownloadPhoto(url: string) {
    try {
      const fileName = `${photoId}.jpg`
      downloadPhoto(url, fileName)
    } catch (error) {
      console.log('Failed to download photo. ', error)
      throw error
    }
  }

  return (
    <>
      {photo ? (
        <div
          className='w-full flex flex-col justify-start items-center bg-white rounded-md'
          style={{ minWidth: '100vw', minHeight: 'calc(100vh - 1rem)' }}
        >
          {/* Header */}
          <div className='fixed top-16 w-full z-10 px-5 py-3 flex justify-between items-center bg-white'>
            <AvatarWithName user={photo.user} />
            <div className='flex gap-2'>
              <ButtonSmall
                buttonType={ButtonType.Border}
                iconType={IconType.Like}
                onClick={() => {
                  addPhotoLike(photo.id)
                }}
              />
              <ButtonWithDropdown
                buttonText='Download'
                onClick={() => {
                  handleDownloadPhoto(photo.urls.full)
                }}
                onDropdownSelectClick={handleDownloadPhoto}
                photoUrls={photo.urls}
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
                {photo.description !== null && (
                  <div className='pt-8'>
                    <p style={{ color: colors.textTertiary }}>Description</p>
                    <p style={{ color: colors.textDefault }}>
                      {photo.description}
                    </p>
                  </div>
                )}
                {/* Other details */}
                <div
                  className='pt-6 flex-col gap-3'
                  style={{ color: colors.textTertiary }}
                >
                  {/* Photo Location */}
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
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
}
