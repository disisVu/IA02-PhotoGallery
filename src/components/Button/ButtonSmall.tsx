import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useHover from '~/hooks/useHover'
import { colors } from '~/styles/colors'
import { ButtonType } from '~/types/enum/buttonType'
import { IconType, iconMap } from '~/types/enum/iconType'

interface ButtonSmallProps {
  buttonType?: ButtonType
  iconType: IconType
  onClick: () => void
}

export default function ButtonSmall({
  buttonType = ButtonType.Solid,
  iconType,
  onClick
}: ButtonSmallProps) {
  const { isHovered, onMouseEnter, onMouseLeave } = useHover()

  return (
    <div
      className={`
        w-10 h-8  
        ${buttonType === ButtonType.Border ? 'bg-white' : isHovered ? 'bg-white' : 'bg-gray-200'}
        cursor-pointer
        flex justify-center items-center rounded-md
      `}
      style={{
        color: isHovered ? colors.textDefault : colors.textTertiary,
        border:
          buttonType === ButtonType.Border
            ? `1px solid ${isHovered ? colors.textSecondary : colors.borderPrimary}`
            : ''
      }}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <FontAwesomeIcon icon={iconMap[iconType]} />
    </div>
  )
}
