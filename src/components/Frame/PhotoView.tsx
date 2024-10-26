import {
  faDownLeftAndUpRightToCenter,
  faUpRightAndDownLeftFromCenter
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import useHover from '~/hooks/useHover'
import { colors } from '~/styles/colors'

interface PhotoViewProps {
  photoUrl: string
}

export default function PhotoView({ photoUrl }: PhotoViewProps) {
  const {
    isHovered: photoIsHovered,
    onMouseEnter: photoOnMouseEnter,
    onMouseLeave: photoOnMouseLeave
  } = useHover()
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <>
      <div
        className='
          w-full 
          h-full lg:h-[84vh]
          px-0 lg:px-5 py-3 
          flex justify-center
        '
      >
        <div className='relative'>
          <img
            src={photoUrl}
            alt='photo'
            className='object-contain cursor-zoom-in h-full w-auto'
            onClick={() => {
              setIsExpanded((prevState) => !prevState)
            }}
            onMouseEnter={photoOnMouseEnter}
            onMouseLeave={photoOnMouseLeave}
          />
          {photoIsHovered && (
            <div className='absolute top-4 right-4'>
              <FontAwesomeIcon
                icon={faUpRightAndDownLeftFromCenter}
                style={{ color: colors.buttonSecondary }}
              />
            </div>
          )}
        </div>
      </div>
      {isExpanded && (
        <div
          className='
            fixed inset-0 z-50 bg-black bg-opacity-80 cursor-zoom-out overflow-y-auto
          '
          onClick={() => {
            setIsExpanded((prevState) => !prevState)
          }}
        >
          <div className='flex justify-center items-start min-h-screen'>
            <img
              src={photoUrl}
              alt='expanded photo'
              className='object-cover w-full'
              style={{ maxWidth: '100%' }}
            />
            <FontAwesomeIcon
              icon={faDownLeftAndUpRightToCenter}
              className='fixed top-4 right-8'
              style={{ color: colors.buttonSecondary }}
            />
          </div>
        </div>
      )}
    </>
  )
}
