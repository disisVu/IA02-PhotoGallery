import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useHover from '~/hooks/useHover'
import { colors } from '~/styles/colors'
import { IconType, iconMap } from '~/types/enum/iconType'

interface ButtonSmallProps {
  type: IconType
}

export default function ButtonSmall({ type }: ButtonSmallProps) {
  const { isHovered, onMouseEnter, onMouseLeave } = useHover()

  return (
    <div
      className={`
        w-10 h-8  
        ${isHovered ? 'bg-white' : 'bg-gray-200'}
        cursor-pointer
        flex justify-center items-center rounded-md
      `}
      style={{ color: isHovered ? colors.textDefault : colors.textTertiary }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <FontAwesomeIcon icon={iconMap[type]} />
    </div>
  )
}
