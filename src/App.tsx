import { Routes, Route } from 'react-router-dom'
import { MainLayout } from '~/layout'
import HomePage from '~/pages/HomePage'
import PhotoDetailPage from '~/pages/PhotoDetailPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path='/IA02-PhotoGallery' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/photos/:id' element={<PhotoDetailPage />} />
      </Route>
    </Routes>
  )
}

export default App
