import { Outlet } from 'react-router-dom'
import NavBar from '~/components/Header/NavBar'

export function MainLayout() {
  return (
    <div className='flex flex-col justify-start items-center'>
      <NavBar />
      <Outlet />
    </div>
  )
}
