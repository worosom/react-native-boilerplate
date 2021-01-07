import { ImageStyle, TextStyle, ViewStyle } from 'react-native'

export type StyleType = TextStyle & ViewStyle & ImageStyle

export type Colors = { [key: string]: string }
export type NavigationColors = Colors
export type FontSize = { [key: string]: number }
export type MetricsSizes = { [key: string]: number | string }

export type Fonts = { [key: string]: TextStyle }
export type Layout = { [key: string]: StyleType }
export type Gutters = { [key: string]: StyleType }
export type Common = { [key: string]: StyleType }

export interface Variables {
  Colors: Colors
  NavigationColors: NavigationColors
  FontSize: FontSize
  MetricsSizes: MetricsSizes
}

export type VariablesOrNull = Partial<Variables>

export interface Theme {
  Colors: Colors
  NavigationColors: NavigationColors
  FontSize: FontSize
  MetricsSizes: MetricsSizes
  Fonts: Fonts
  Images: Images
  Layout: Layout
  Gutters: Gutters
  Common: Common
}

export interface SubTheme extends Partial<Theme> {
  Variables?: VariablesOrNull
}

interface Images {
  [key: string]: any
}
