import { getThemeColor } from '@/utils/storage'
import themeData from '@/assets/ts/themeData'

export const switchTheme = (key: string) => {
  // 遍历每个样式，加到 body 上
  const styleDict = themeData[key]
  Object.keys(styleDict).forEach((styleName) => {
    document.getElementsByTagName('body')[0].style.setProperty(styleName, styleDict[styleName])
  })
}

export const initTheme = () => {
  switchTheme(String(getThemeColor()))
}
