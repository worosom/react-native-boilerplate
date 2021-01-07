import { useColorScheme } from 'react-native-appearance'
import { useSelector } from 'react-redux'
import { DarkTheme, DefaultTheme } from '@react-navigation/native'
import Fonts from '@/Theme/Fonts'
import Gutters from '@/Theme/Gutters'
import Images from '@/Theme/Images'
import Layout from '@/Theme/Layout'
import Common from '@/Theme/Common'
import * as DefaultVariables from '@/Theme/Variables'
import themes from '@/Theme/themes'
import { RootState } from '../../Store/store.types'
import {
  SubTheme,
  Variables,
  Theme,
  VariablesOrNull,
  Fonts as FontType,
  Layout as LayoutType,
  Gutters as GuttersType,
  Common as CommonType,
  Colors,
} from '@/Theme/theme.type'

export default function () {
  // Get the scheme device
  const colorScheme = useColorScheme()

  // Get current theme from the store
  const currentTheme: string = useSelector(
    (state: RootState) => state.theme.theme || 'default',
  )
  const isDark = useSelector((state: RootState) => state.theme.darkMode)
  const darkMode = isDark === null ? colorScheme === 'dark' : isDark
  //Select the right theme light theme ({} if not exist)
  const { Variables: themeConfigVars = {}, ...themeConfig }: SubTheme =
    themes[currentTheme] || {}

  const {
    Variables: darkThemeConfigVars = {},
    ...darkThemeConfig
  }: SubTheme = darkMode ? themes[`${currentTheme}_dark`] || {} : {}

  const themeVariables: Variables = mergeVariables(
    DefaultVariables,
    themeConfigVars,
    darkThemeConfigVars,
  )

  // Build the default theme
  const baseTheme: Theme = {
    Fonts: Fonts(themeVariables) as FontType,
    Gutters: Gutters(themeVariables) as GuttersType,
    Common: Common(themeVariables) as CommonType,
    Images: Images(themeVariables),
    Layout: Layout(themeVariables) as LayoutType,
    ...(themeVariables as Variables),
  }

  // Merge and return the current Theme
  return buildTheme(
    darkMode,
    baseTheme,
    formatTheme(themeVariables, themeConfig || {}),
    formatTheme(themeVariables, darkThemeConfig || {}),
  )
}

/**
 * Generate Theme with theme variables
 *
 * @param variables
 * @param theme
 */
const formatTheme = (variables: VariablesOrNull, theme: SubTheme) => {
  return Object.entries(theme).reduce((acc, [name, generate]) => {
    return {
      ...acc,
      [name]: generate(variables),
    }
  }, {})
}

/**
 * Merge all variables for building the theme
 * baseTheme <- currentTheme <- currentDarkTheme
 *
 * @param variables : {MetricsSizes?: {small: number, large: number, tiny: number, regular: number}, NavigationColors?: {primary: string}, FontSize?: {small: number, large: number, regular: number}, Colors?: {white: string, success: string, text: string, error: string, transparent: string, primary: string}} variables from @Theme/Variables
 * @param themeConfig : currentTheme form @Theme/themes
 * @param darkThemeConfig : currentDarkTheme from @Theme/themes
 */
const mergeVariables = (
  variables: Variables,
  themeConfig: VariablesOrNull,
  darkThemeConfig: VariablesOrNull,
) =>
  Object.entries(variables).reduce(
    (acc: Variables, [group, vars]: [string, any]) => {
      return {
        ...acc,
        [group]: {
          ...vars,
          ...((themeConfig as any)[group] || {}),
          ...((darkThemeConfig as any)[group] || {}),
        },
      }
    },
    {} as Variables,
  )

/**
 * Provide all the theme exposed with useTheme()
 *
 * @param darkMode : boolean
 * @param baseTheme
 * @param themeConfig
 * @param darkThemeConfig
 */
const buildTheme = (
  darkMode: boolean,
  baseTheme: Theme,
  themeConfig: SubTheme,
  darkThemeConfig: SubTheme,
) => {
  return {
    ...mergeTheme(baseTheme, themeConfig, darkThemeConfig),
    darkMode,
    NavigationTheme: mergeNavigationTheme(
      darkMode ? DarkTheme : DefaultTheme,
      baseTheme.NavigationColors,
    ),
  }
}

/**
 * Merge theme from baseTheme <- currentTheme <- currentDarkTheme
 *
 * @param baseTheme
 * @param theme
 * @param darkTheme
 */
const mergeTheme = (
  baseTheme: Theme,
  theme: SubTheme,
  darkTheme: SubTheme,
) => ({
  ...Object.entries(baseTheme).reduce(
    (acc: Theme, [key, value]: [string, any]) => ({
      ...acc,
      [key]: {
        ...value,
        ...((theme as any)[key] || {}),
        ...((darkTheme as any)[key] || {}),
      },
    }),
    {} as Theme,
  ),
})

/**
 * Merge the React Navigation Theme
 *
 * @param reactNavigationTheme
 * @param overrideColors
 */
const mergeNavigationTheme = (
  reactNavigationTheme: { dark: boolean; colors: Colors },
  overrideColors: Colors,
) => ({
  ...reactNavigationTheme,
  colors: {
    ...reactNavigationTheme.colors,
    ...overrideColors,
  },
})
