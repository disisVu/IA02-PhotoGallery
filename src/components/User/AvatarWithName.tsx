import Avatar from '~/components/User/Avatar'
import { colors } from '~/styles/colors'
import { AvatarWithNameType } from '~/types/enum/avatarWithNameType'
import { User } from '~/types/schema/UserSchema'

interface AvatarWithNameProps {
  user: User
  type?: AvatarWithNameType
}

export default function AvatarWithName({
  user,
  type = AvatarWithNameType.default
}: AvatarWithNameProps) {
  return (
    <div className='flex items-center gap-2'>
      <Avatar profileImage={user.profile_image.medium} />
      <div
        className={`
          h-full flex flex-col leading-5 text-left
          ${type === AvatarWithNameType.default ? 'justify-between' : 'justify-center'}
        `}
      >
        <p
          style={{
            color:
              type === AvatarWithNameType.default
                ? colors.textDefault
                : '#f3f3f3'
          }}
        >
          {user.name}
        </p>
        {type === AvatarWithNameType.default && (
          <p className='text-xs' style={{ color: colors.textTertiary }}>
            {user.username}
          </p>
        )}
      </div>
    </div>
  )
}
