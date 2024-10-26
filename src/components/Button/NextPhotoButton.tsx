import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useHover from '~/hooks/useHover'
import { colors } from '~/styles/colors'
import { Direction } from '~/types/enum/direction'

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
        fixed
        z-30
        ${direction === Direction.Right ? 'right-0' : 'left-0'} 
        lg:w-32
        md:w-16
        py-24
        cursor-pointer
        hidden md:flex lg:flex
        justify-center items-center
      `}
      style={{
        top: 'calc(50vh - 108px)'
      }}
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
