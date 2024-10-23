import avatarPng from '~/assets/avatar/avatar.jpg'

export default function Avatar() {
  return (
    <div className='w-8 h-8 flex justify-center items-center overflow-hidden rounded-full'>
      <img
        src={avatarPng}
        alt='avatar'
        className='w-full h-full object-cover'
      />
    </div>
  )
}
