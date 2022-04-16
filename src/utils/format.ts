// 将数量加上中文单位
export const formatCount = (count: number) => {
  if (count < 10000) {
    return count
  }
  if (count < 100000000) {
    return `${Math.round(count / 10000)}万`
  }
  return `${Math.round(count / 100000000)}亿`
}

// 01:01:33.34 => 3693.34
export const formatLyricTime = (time: string) => time.split(':')
  .reduceRight((p, c, i, a) => p + (+c * 60 ** (a.length - 1 - i)), 0)

// 将一个单位为秒的时间戳转化成时间对象
export const formatTimestamp = (seconds: number) => {
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
export const formatDuration = (duration: number, unit: 'ms' | 's' = 'ms') => {
  const sec = Math.round(unit === 'ms' ? duration / 1000 : duration)
  const secDigit = sec % 60
  const minDigit = Math.floor(sec / 60)
  return `${String(minDigit).padStart(2, '0')}:${String(secDigit).padStart(2, '0')}`
}
