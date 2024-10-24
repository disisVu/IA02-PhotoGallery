import { Collection } from '~/types/schema/CollectionSchema'
import { User } from '~/types/schema/UserSchema'

export interface PhotoUrls {
  raw: string // Raw image URL
  full: string // Full image URL
  regular: string // Regular-sized image URL
  small: string // Small image URL
  thumb: string // Thumbnail image URL
}

export interface PhotoLinks {
  self: string // API link to the photo
  html: string // URL to the photo page
  download: string // Link to download the photo
  download_location: string // API link to the download location
}

export interface Photo {
  id: string // Unique identifier for the photo
  created_at: string // Creation date of the photo in ISO format
  updated_at: string // Last update date of the photo in ISO format
  width: number // Width of the photo in pixels
  height: number // Height of the photo in pixels
  color: string // Dominant color in hex format
  blur_hash: string // Blur hash for a low-quality preview
  likes: number // Number of likes on the photo
  liked_by_user: boolean // Indicates if the current user liked the photo
  description: string | null // Description of the photo (can be null)
  user: User // User who uploaded the photo
  current_user_collections: Collection[] | null // Collections that the current user has created that this photo belongs to
  urls: PhotoUrls // URLs for different sizes of the photo
  links: PhotoLinks // Links related to the photo
}

export interface PhotoStatistic {
  id: string
  downloads: {
    total: number
    historical: HistoricalData
  }
  views: {
    total: number
    historical: HistoricalData
  }
  likes: {
    total: number
    historical: HistoricalData
  }
}

export interface HistoricalData {
  change: number // Total change for the past period (e.g., 30 days)
  resolution: string // Resolution, e.g., 'days'
  quantity: number // Number of data points (e.g., 30 for 30 days)
  values: HistoricalValue[] // Array of daily historical values
}

export interface HistoricalValue {
  date: string // Date in 'YYYY-MM-DD' format
  value: number // The count for that specific date
}
