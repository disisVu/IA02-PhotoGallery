import { faArrowDown, faHeart } from '@fortawesome/free-solid-svg-icons'

export enum IconType {
  Download = 'download',
  Like = 'like'
}

export const iconMap = {
  [IconType.Download]: faArrowDown,
  [IconType.Like]: faHeart
}
