import PhotoGrid from '~/components/Grid/PhotoGrid'
import NavBar from '~/components/Header/NavBar'

export default function HomePage() {
  return (
    <div className='flex flex-col justify-start items-center'>
      <NavBar />
      <PhotoGrid />
    </div>
  )
}
