import { User } from './user'

export const targetType = {
  song: 1,
  album: 10,
  singer: 100,
  playlist: 1000,
  user: 1002,
  mv: 1004,
  lyric: 1006,
  dj: 1009,
  video: 1014,
  multiple: 1018,
  audio: 2000,
  webpage: 3000,
}

export interface Banner {
  imageUrl: string
  targetId: number
  /**
   * 对应 targetType
   */
  targetType: number
  titleColor: string
  typeTitle: string
  url: string
  exclusive: boolean
  encodeId: string
  scm: string
  adid: unknown
  monitorImpress: unknown
  monitorClick: unknown
  monitorType: unknown
  monitorImpressList: unknown
  monitorClickList: unknown
  monitorBlackList: unknown
  extMonitor: unknown
  extMonitorInfo: unknown
  adSource: unknown
  adLocation: unknown
  adDispatchJson: unknown
  program: unknown
  event: unknown
  video: unknown
  song: unknown
}

export interface RecommendPlaylist {
  id: number
  name: string
  picUrl: string
  playcount: number
  type: number
  copywriter: string
  createTime: number
  creator: User
  trackCount: number
  userId: number
  alg: string
}
