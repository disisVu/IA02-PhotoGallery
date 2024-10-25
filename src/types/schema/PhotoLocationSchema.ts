export interface Position {
  latitude: number // Latitude coordinate
  longitude: number // Longitude coordinate
}

export interface Location {
  name: string | null // Location name (can be null)
  city: string | null // City name (can be null)
  country: string | null // Country name (can be null)
  position: Position // Geographical position with latitude and longitude
}
