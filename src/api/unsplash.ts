// import axios, { AxiosResponse } from 'axios'

// // Replace with your actual Access Key from Unsplash
// const UNSPLASH_BASE_URL = 'https://image.unsplash.com'
// const UNSPLASH_ACCESS_KEY = 'your_access_key_here'

// // Create an instance of axios with default headers
// const unsplashClient = axios.create({
//   baseURL: UNSPLASH_BASE_URL,
//   headers: {
//     Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
//   }
// })

// /**
//  * Fetch a list of photos from Unsplash
//  * @param {number} page - The page number to fetch
//  * @param {number} perPage - The number of photos per page
//  * @returns {Promise<AxiosResponse<any>>} - List of photos
//  */
// export async function fetchPhotos(
//   page: number = 1,
//   perPage: number = 10
// ): Promise<AxiosResponse<any>> {
//   try {
//     const response = await unsplashClient.get('/photos', {
//       params: {
//         page,
//         per_page: perPage
//       }
//     })
//     return response.data
//   } catch (error) {
//     console.error('Error fetching photos:', error)
//     throw error
//   }
// }
