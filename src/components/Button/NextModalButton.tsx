import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useHover from '~/hooks/useHover'
import { colors } from '~/styles/colors'
import { Direction } from '~/types/direction'

interface NextPhotoButtonProps {
  direction: Direction
  onClick: () => void
}

export default function NextPhotoButton({
  direction,
  onClick
}: NextPhotoButtonProps) {
  const { isHovered, onMouseEnter, onMouseLeave } = useHover()

  return (
    <div
      className={`
        absolute 
        ${direction === Direction.Right ? 'right-0' : 'left-0'} 
        top-1/2 transform -translate-y-1/2 
        z-40 
        lg:w-32
        md:w-16
        py-24
        cursor-pointer
        flex justify-center items-center
      `}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <FontAwesomeIcon
        icon={direction === Direction.Right ? faChevronRight : faChevronLeft}
        className='h-6'
        style={{
          color: isHovered ? colors.buttonTertiary : colors.buttonSecondary
        }}
      />
    </div>
  )
}
