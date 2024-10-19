interface PhotoCardProps {
  photoUrl: string
}

export default function PhotoCard({ photoUrl }: PhotoCardProps) {
  return (
    <div className='rounded-md w-full h-auto'>
      <img src={photoUrl} alt='photo' />
    </div>
  )
}
