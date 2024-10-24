import { AvatarWithNameType } from '~/types/enum/avatarWithNameType'
import ButtonSmall from '~/components/Button/ButtonSmall'
import AvatarWithName from '~/components/User/AvatarWithName'
import { IconType } from '~/types/enum/iconType'
import { Photo } from '~/types/schema/PhotoSchema'

interface PhotoCardOverlayProps {
  photo: Photo
}

export default function PhotoCardOverlay({ photo }: PhotoCardOverlayProps) {
  return (
    <div
      className='absolute z-10 w-full h-full p-3 flex flex-col justify-between items-center shadow-inner'
      style={{
        backgroundColor: 'rgba(0,0,0,0.15)',
        boxShadow: 'inset 0px 0px 10rem rgba(0, 0, 0, 0.3)'
      }}
    >
      <div className='w-full flex justify-end'>
        <ButtonSmall iconType={IconType.Like} />
      </div>
      <div className='w-full flex justify-between'>
        <AvatarWithName user={photo.user} type={AvatarWithNameType.thumb} />
        <ButtonSmall iconType={IconType.Download} />
      </div>
    </div>
  )
}
