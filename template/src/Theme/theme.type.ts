import { ImageStyle, TextStyle, ViewStyle } from 'react-native'

type StyleType = TextStyle & ViewStyle & ImageStyle

export type Variables = {
  Colors?: { [key: string]: string }
  NavigationColors?: { [key: string]: string }
  FontSize?: { [key: string]: number | string }
  MetricsSizes?: { [key: string]: number | string }
}

export interface SubTheme {
  Variables?: Variables
  Fonts?: StyleType
  Images?: Images
  Layout?: StyleType
  Gutters?: StyleType
}

interface Images {
  [key: string]: any
}

export interface Theme {
  Colors: { [key: string]: string }
  NavigationColors: { [key: string]: string }
  FontSize: { [key: string]: number | string }
  MetricsSizes: { [key: string]: number | string }
  Fonts: StyleType
  Images: Images
  Layout: StyleType
  Gutters: StyleType
}
