import { Song, Privilege } from '@/assets/types/song'

/**
 * 解析一首或多首歌曲详情（和 resolveSearchSongsDetail 不同的是，这里传入的数据 privileges 是单独的数组）
 * @param data 请求得到的原始数据
 * @returns 返回解析后的歌曲详情列表
 */
export const resolveSongsDetail = (data: {
  songs: Song[];
  privileges: Privilege[]
}): Song[] => {
  const arr: Song[] = []
  data.songs.forEach((item, index: number) => {
    const song = item
    song.privilege = data.privileges[index]
    song.hasSq = data.privileges[index].maxbr >= 999000
    song.isVip = data.privileges[index].fee === 1 || data.privileges[index].fee === 4
    song.canPlay = data.privileges[index].st !== -200
    song.hasSrc = data.privileges[index].fee !== 16
    song.noCopyrightInfo = item.noCopyrightRcmd || { type: 0, typeDesc: '' }
    arr.push(song)
  })
  return arr
}

/**
 * 解析一首或多首歌曲详情（和 resolveSongsDetail 不同的是，这里传入的数据 privilege 是放在 song 中的）
 * @param songs 请求得到的原始数据
 * @returns 返回解析后的歌曲详情列表
 */
export const resolveSearchSongsDetail = (songs: Song[]): Song[] => songs.map((item) => {
  const song = item
  song.hasSq = song.privilege.maxbr >= 999000
  song.isVip = song.privilege.fee === 1 || song.privilege.fee === 4
  song.canPlay = song.privilege.st !== -200
  song.hasSrc = song.privilege.fee !== 16
  song.noCopyrightInfo = song.noCopyrightRcmd || { type: 0, typeDesc: '' }
  song.lyrics = song.lyrics || []
  return song
})
