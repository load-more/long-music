export const formatPlayCount = (count: number) => {
  if (count < 10000) {
    return count
  }
  if (count < 100000000) {
    return `${Math.round(count / 10000)}万`
  }
  return `${Math.round(count / 100000000)}亿`
}

export const others = null
