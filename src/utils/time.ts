// 将一个时间戳（单位为秒）转化成时间格式
export default function getLocalTime(seconds: number) {
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
