export const formatPlayCount = (count: number) => {
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
