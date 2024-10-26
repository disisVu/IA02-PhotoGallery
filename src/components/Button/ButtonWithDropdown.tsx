import useHover from '~/hooks/useHover'
import { colors } from '~/styles/colors'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import PhotoDownloadDropdown from '~/components/Dropdown/PhotoDownloadDropdown'
import { PhotoUrls } from '~/types/schema/PhotoSchema'

interface ButtonWithDropdownProps {
  buttonText: string
  photoUrls: PhotoUrls
  onClick: () => void
  onDropdownSelectClick: (selectedItem: string) => void
}

export default function ButtonWithDropdown({
  buttonText,
  photoUrls,
  onClick,
  onDropdownSelectClick
}: ButtonWithDropdownProps) {
  const [isDropdownOpened, setIsDropdownOpened] = useState<boolean>(false)
  const {
    isHovered: isHoveredLeft,
    onMouseEnter: onMouseEnterLeft,
    onMouseLeave: onMouseLeaveLeft
  } = useHover()
  const {
    isHovered: isHoveredRight,
    onMouseEnter: onMouseEnterRight,
    onMouseLeave: onMouseLeaveRight
  } = useHover()

  function toggleDropdown() {
    setIsDropdownOpened((prevState) => !prevState)
  }

  return (
    <div className='flex flex-row'>
      <div
        className='h-8 px-3 cursor-pointer flex justify-between gap-3 items-center rounded-l-md'
        style={{
          color: colors.textPrimary,
          backgroundColor: '#ffffff',
          border: `1px solid ${isHoveredLeft ? colors.textSecondary : colors.borderPrimary}`
        }}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
        onMouseEnter={onMouseEnterLeft}
        onMouseLeave={onMouseLeaveLeft}
      >
        <span className='text-sm'>{buttonText}</span>
      </div>
      <div
        className={`
        relative
        w-10 h-8  
        bg-white
        cursor-pointer
        flex justify-center items-center rounded-r-md
      `}
        style={{
          color: isHoveredRight ? colors.textDefault : colors.textTertiary,
          border: `1px solid ${isHoveredRight ? colors.textSecondary : colors.borderPrimary}`
        }}
        onClick={(e) => {
          e.stopPropagation()
          toggleDropdown()
        }}
        onMouseEnter={onMouseEnterRight}
        onMouseLeave={onMouseLeaveRight}
      >
        <FontAwesomeIcon icon={faChevronDown} />
        {isDropdownOpened && (
          <PhotoDownloadDropdown
            photoUrls={photoUrls}
            onDropdownSelectClick={onDropdownSelectClick}
          />
        )}
      </div>
    </div>
  )
}
