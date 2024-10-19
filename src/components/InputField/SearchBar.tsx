import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import { colors } from '~/types/colors'
import { useInputFieldClick } from '~/hooks/useInputFieldClick'

export default function SearchBar() {
  const [isInputFocused, setIsInputFocused] = useState(false)
  const ref = useInputFieldClick(() => setIsInputFocused(false))

  return (
    <div
      ref={ref}
      className={`
        ${isInputFocused ? 'border' : ''}
        flex-grow h-full px-4 rounded-full flex flex-row justify-between items-center gap-4
      `}
      style={{
        backgroundColor: isInputFocused ? colors.bgPrimary : colors.inputPrimary
      }}
    >
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        style={{ color: colors.textTertiary }}
      />
      <input
        type='text'
        className='flex-grow text-sm placeholder-gray-500'
        style={{
          color: colors.textPrimary,
          backgroundColor: isInputFocused
            ? colors.bgPrimary
            : colors.inputPrimary,
          border: 'none',
          outline: 'none',
          boxSizing: 'border-box'
        }}
        placeholder='Search photos and illustrations'
        onFocus={() => setIsInputFocused(true)}
      />
      <SearchButton onClickCallback={() => {}} />
    </div>
  )
}

interface SearchButtonProps {
  onClickCallback: () => void
}

function SearchButton({ onClickCallback }: SearchButtonProps) {
  return (
    <div className='cursor-pointer' onClick={onClickCallback}>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        version='1.1'
        aria-hidden='false'
        style={{ flexShrink: 0 }}
      >
        <path
          d='M5 15H3v4c0 1.1.9 2 2 2h4v-2H5v-4ZM5 5h4V3H5c-1.1 0-2 .9-2 2v4h2V5Zm14-2h-4v2h4v4h2V5c0-1.1-.9-2-2-2Zm0 16h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4ZM12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z'
          fill={colors.textTertiary}
        ></path>
      </svg>
    </div>
  )
}
