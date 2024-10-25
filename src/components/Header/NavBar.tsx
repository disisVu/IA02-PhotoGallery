import { useNavigate } from 'react-router-dom'
import SearchBar from '~/components/InputField/SearchBar'
import { colors } from '~/styles/colors'

export default function NavBar() {
  const navigate = useNavigate()

  function navigateToHome() {
    navigate('/')
  }

  return (
    <div
      className='sticky z-20 top-0 h-16 pl-6 pr-10 py-3 bg-white flex flex-row justify-between items-center gap-4'
      style={{
        width: '100vw',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Logo onClick={navigateToHome} />
      <SearchBar />
    </div>
  )
}

interface LogoProps {
  onClick: () => void
}

function Logo({ onClick }: LogoProps) {
  return (
    <div className='cursor-pointer text-center' onClick={onClick}>
      <span className='text-2xl font-bold' style={{ color: colors.primary }}>
        Gallery
      </span>
    </div>
  )
}
