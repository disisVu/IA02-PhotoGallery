import useHover from '~/hooks/useHover'
import { colors } from '~/styles/colors'
import { PhotoUrls } from '~/types/schema/PhotoSchema'

interface PhotoDownloadDropdownProps {
  photoUrls: PhotoUrls
  onDropdownSelectClick: (selectedItem: string) => void
}

export default function PhotoDownloadDropdown({
  photoUrls,
  onDropdownSelectClick
}: PhotoDownloadDropdownProps) {
  return (
    <div className='absolute top-10 right-0 w-48 py-2 flex flex-col bg-white rounded-md shadow-md border'>
      {photoUrls.raw && (
        <DropdownItem
          title='Raw'
          onClick={() => {
            onDropdownSelectClick(photoUrls.raw)
          }}
        />
      )}
      {photoUrls.small && (
        <DropdownItem
          title='Small'
          onClick={() => {
            onDropdownSelectClick(photoUrls.small)
          }}
        />
      )}
      {photoUrls.regular && (
        <DropdownItem
          title='Medium'
          onClick={() => {
            onDropdownSelectClick(photoUrls.regular)
          }}
        />
      )}
      <div
        className='w-full my-2'
        style={{
          height: '1px',
          display: 'inline-block',
          backgroundColor: colors.textTertiary
        }}
      ></div>
      {photoUrls.full && (
        <DropdownItem
          title='Original Size'
          onClick={() => {
            onDropdownSelectClick(photoUrls.full)
          }}
        />
      )}
    </div>
  )
}

interface DropdownItemProps {
  title: string
  onClick: () => void
}

function DropdownItem({ title, onClick }: DropdownItemProps) {
  const { isHovered, onMouseEnter, onMouseLeave } = useHover()

  return (
    <div
      className='w-full px-4 py-1 text-left select-none'
      style={{
        backgroundColor: isHovered ? colors.buttonTertiary : '#ffffff'
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span style={{ color: colors.textPrimary }}>{title}</span>
    </div>
  )
}
