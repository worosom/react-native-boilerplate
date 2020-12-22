import React from 'react'
import { View, Image } from 'react-native'
import { useTheme } from '@/Theme'
import { ITheme } from '@/Theme/theme.type'

interface IProps {
  height: number
  width: number
  mode: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center'
}

const Brand = ({ height = 200, width = 200, mode = 'contain' }: IProps) => {
  const { Layout, Images }: ITheme = useTheme()

  return (
    <View style={{ height, width }}>
      <Image style={Layout.fullSize} source={Images.logo} resizeMode={mode} />
    </View>
  )
}

export default Brand
