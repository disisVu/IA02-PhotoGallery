import {
  faArrowDown,
  faChevronDown,
  faHeart
} from '@fortawesome/free-solid-svg-icons'

export enum IconType {
  Download = 'download',
  Like = 'like',
  Dropdown = 'dropdown'
}

export const iconMap = {
  [IconType.Download]: faArrowDown,
  [IconType.Like]: faHeart,
  [IconType.Dropdown]: faChevronDown
}
