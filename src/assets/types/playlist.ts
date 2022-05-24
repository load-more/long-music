import { User } from './user'

export interface Track {
  name: string
  id: number
  pst: number
  t: number
  ar: {
    id: number
    name: string
    tns: string[]
    alias: string[]
  }[]
  alia: string[]
  pop: number
  st: number
  rt: unknown
  fee: number
  v: number
  crbt: unknown
  cf: string
  al: {
    id: number
    name: string
    picUrl: string
    tns: string[]
    pic_str: string
    pic: number
  }
  dt: number
  h: {
    br: number
    fid: number
    size: number
    vd: number
  }
  m: {
    br: number
    fid: number
    size: number
    vd: number
  }
  l: {
    br: number
    fid: number
    size: number
    vd: number
  }
  a: unknown
  cd: string
  no: number
  rtUrl: unknown
  ftype: number
  rtUrls: string[]
  djId: number
  copyright: number
  s_id: number
  mark: number
  originCoverType: number
  originSongSimpleData: unknown
  single: number
  noCopyrightRcmd: string
  rtype: number
  rurl: unknown
  mst: number
  cp: number
  mv: number
  publishTime: number
}

export interface TrackId {
  id: number
  v: number
  t: number
  at: number
  alg: unknown
  uid: number
  rcmdReason: string
}

export interface PlaylistDetail {
  id: number
  name: string
  coverImgId: number
  coverImgUrl: string
  coverImgId_str: unknown
  adType: number
  userId: number
  createTime: number
  status: number
  opRecommend: boolean
  highQuality: boolean
  newImported: boolean
  updateTime: number
  trackCount: number
  specialType: number
  privacy: number
  trackUpdateTime: number
  commentThreadId: string
  playCount: number
  trackNumberUpdateTime: number
  subscribedCount: number
  cloudTrackCount: number
  ordered: boolean
  description: string
  tags: string[]
  updateFrequency: unknown
  backgroundCoverId: number
  backgroundCoverUrl: unknown
  titleImage: number
  titleImageUrl: unknown
  englishTitle: unknown
  officialPlaylistType: unknown
  subscribers: User[]
  creator: User
  tracks: Track[]
  videoIds: unknown
  videos: unknown
  trackIds: TrackId[]
  shareCount: number
  commentCount: number
  remixVideo: unknown
  sharedUsers: unknown
  historySharedUsers: unknown
}

export interface SearchPlaylist {
  id: number
  name: string
  coverImgUrl: string
  creator: {
    nickname: string
    userId: number
    userType: number
    avatarUrl: string
    authStatus: number
    expertTags: unknown
    experts: unknown
  }
  subscribed: boolean
  trackCount: number
  userId: number
  playCount: number
  bookCount: number
  specialType: number
  officialTags: unknown
  action: unknown
  actionType: unknown
  recommendText: unknown
  description: string
  highQuality: boolean
}
