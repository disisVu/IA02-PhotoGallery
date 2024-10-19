import SearchBar from '~/components/InputField/SearchBar'

export default function NavBar() {
  return (
    <div
      className='sticky top-0 h-16 px-6 py-3 bg-white flex flex-row justify-between items-center gap-4'
      style={{
        width: '100vw',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Logo />
      <SearchBar />
    </div>
  )
}

function Logo() {
  return (
    <>
      <svg
        height='36px'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 448 512'
      >
        <path d='M448 230.2V480H0V230.2H141.1V355.1H306.9V230.2zM306.9 32H141.1V156.9H306.9z' />
      </svg>
    </>
  )
}
