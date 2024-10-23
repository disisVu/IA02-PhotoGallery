import axios from 'axios'

const BASE_URL = 'https://api.unsplash.com/'
const ACCESS_KEY = 'UrrYC0olPDtGlUwLk8-v1-155GlVvzn1Se8VYK4LAng'

const unsplashApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`
  }
})

export const fetchPhotoPage = async (page?: number, perPage?: number) => {
  try {
    const response = await unsplashApi.get('/photos', {
      params: {
        page,
        per_page: perPage
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching photo page:', error)
    throw error
  }
}
