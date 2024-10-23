import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useHover from '~/hooks/useHover'
import { colors } from '~/styles/colors'

interface ButtonProps {
  buttonText: string
  onClick: () => void
  isEnabled: boolean
}

export default function ButtonPrimary({
  buttonText,
  onClick,
  isEnabled
}: ButtonProps) {
  const { isHovered, onMouseEnter, onMouseLeave } = useHover()

  return (
    <div
      className='h-8 px-3 cursor-pointer flex justify-between gap-3 items-center rounded-md shadow-sm'
      style={{
        color: isEnabled ? colors.textPrimary : '#ffffff',
        backgroundColor: isEnabled ? '#ffffff' : '#000000',
        border: `1px solid ${isHovered ? colors.textSecondary : colors.borderPrimary}`
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {!isEnabled && <FontAwesomeIcon icon={faLock} className='text-xs' />}
      <span className='text-sm'>{buttonText}</span>
    </div>
  )
}
