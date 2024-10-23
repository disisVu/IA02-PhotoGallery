import { User } from '~/types/schema/UserSchema'

export interface Collection {
  id: number // Unique identifier for the collection
  title: string // Title of the collection
  published_at: string // Published date of the collection
  last_collected_at: string // Last date the collection was updated
  updated_at: string // Last update date of the collection
  cover_photo: string | null // URL to the cover photo (can be null)
  user: User | null // User who created the collection (can be null)
}
