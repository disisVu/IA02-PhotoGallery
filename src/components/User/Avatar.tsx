interface AvatarProps {
  profileImage: string
}

export default function Avatar({ profileImage }: AvatarProps) {
  return (
    <div className='w-8 h-8 flex justify-center items-center overflow-hidden rounded-full'>
      <img
        src={profileImage}
        alt='avatar'
        className='w-full h-full object-cover'
      />
    </div>
  )
}
