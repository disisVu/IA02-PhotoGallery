import Avatar from '~/components/User/Avatar'
import { colors } from '~/styles/colors'

export default function AvatarWithName() {
  return (
    <div className='flex items-center gap-2'>
      <Avatar />
      <div className='h-full flex flex-col justify-between leading-5'>
        <p style={{ color: colors.textDefault }}>disisVu</p>
        <p className='text-xs' style={{ color: colors.textTertiary }}>
          disisvuphoto
        </p>
      </div>
    </div>
  )
}
