import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useHover from '~/hooks/useHover'
import { colors } from '~/styles/colors'

interface CloseModalButtonProps {
  onClick?: (e: React.MouseEvent) => void
}

export default function CloseModalButton({ onClick }: CloseModalButtonProps) {
  const { isHovered, onMouseEnter, onMouseLeave } = useHover()

  return (
    <div
      className='absolute z-40 top-0 left-0 w-12 h-12 cursor-pointer lg:flex md:flex justify-center items-center hidden'
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <FontAwesomeIcon
        icon={faXmark}
        className='w-6 h-6'
        style={{
          color: isHovered ? colors.buttonTertiary : colors.buttonSecondary
        }}
      />
    </div>
  )
}
