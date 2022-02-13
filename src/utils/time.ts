// 将一个时间戳（单位为秒）转化成时间格式
export const getLocalTime = (seconds: number) => {
  const d = new Date(seconds)
  return {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    date: d.getDate(),
    hour: d.getHours(),
    minute: d.getMinutes(),
    second: d.getSeconds(),
  }
}

// 格式化歌曲时间
export const formatDuration = (ms: number) => {
  const sec = Math.round(ms / 1000)
  const secDigit = sec % 60
  const minDigit = Math.floor(sec / 60)
  return `${String(minDigit).padStart(2, '0')}:${String(secDigit).padStart(2, '0')}`
}
