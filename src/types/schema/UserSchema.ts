export interface User {
  id: string // Unique identifier for the user
  username: string // Username of the user
  name: string // Full name of the user
  portfolio_url: string | null // URL to the user's portfolio (can be null)
  bio: string | null // User's bio (can be null)
  location: string | null // User's location (can be null)
  total_likes: number // Total likes by the user
  total_photos: number // Total photos uploaded by the user
  total_collections: number // Total collections created by the user
  instagram_username: string | null // User's Instagram username (can be null)
  twitter_username: string | null // User's Twitter username (can be null)
  profile_image: UserProfileImage // Object containing URLs for the user's profile image
  links: UserLinks // Links related to the user
}

export interface UserProfileImage {
  small: string // URL for small profile image
  medium: string // URL for medium profile image
  large: string // URL for large profile image
}

export interface UserLinks {
  self: string // API link to the user
  html: string // URL to the user's profile page
  photos: string // API link to the user's photos
  likes: string // API link to the user's likes
  portfolio: string // API link to the user's portfolio
}
