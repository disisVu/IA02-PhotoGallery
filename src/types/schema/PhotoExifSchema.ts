export interface Exif {
  make: string // Camera manufacturer
  model: string // Camera model
  name: string // Combined name of make and model
  exposure_time: string // Exposure time (e.g., "1/100")
  aperture: string // Aperture value (e.g., "7.1")
  focal_length: string // Focal length in millimeters (e.g., "70.0")
  iso: number // ISO sensitivity (e.g., 100)
}
