import { getThemeColor } from '@/utils/storage'
import themeData from '@/assets/ts/themeData'

export const switchTheme = (key: string) => {
  // 遍历每个样式，加到 body 上
  const styleDict = themeData[key]
  Object.keys(styleDict).forEach((styleName) => {
    document.getElementsByTagName('body')[0].style.setProperty(styleName, styleDict[styleName])
  })
  // 修改 footer 文字扫光的样式
  const title = document.getElementsByClassName('title-holder')[0]
  if (title) {
    const themeKeys = Object.keys(themeData)
    // 删除之前的 .*-gradient 样式
    themeKeys.forEach((themeKey: string) => {
      const gradientClass = `${themeKey}-gradient`
      if (title.classList.contains(gradientClass)) {
        title.classList.remove(gradientClass)
      }
    })
    title.classList.add(`${key}-gradient`)
  }
}

export const initTheme = () => {
  switchTheme(String(getThemeColor()))
}
