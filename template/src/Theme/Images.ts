import {Variables} from '@/Theme/theme.type'

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function (Theme: Variables) {
  return {
    logo: require('@/Assets/Images/TOM.png'),
  }
}
