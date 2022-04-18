export interface homeBannerType {
  imgUrl: string
  targetId: number
  titleColor: string
  typeTitle: string
}

export interface rcmdPlaylistType {
  id: number
  name: string
  picUrl: string
  playCount: number
}

export interface searchSuggestType {
  songs: {
    id: number
    name: string
    alias: string
    artists: string
  }[]
  artists: {
    id: number
    name: string
    alias: string
  }[]
  albums: {
    id: number
    name: string
    artists: string
  }[]
  playlists: {
    id: number
    name: string
    trackCount: number
  }[]
}

export interface sidebarPlaylistType {
  id: number
  coverImg: string
  title: string
}

export interface playlistEditFormType {
  name: string
  desc: string
  tags: string[]
}

export interface playlistDetailType {
  id: number
  name: string
  coverImgUrl: string
  createTime: number
  updateTime: number
  trackCount: number
  playCount: number
  subscribedCount: number
  description: string
  tags: string[]
  shareCount?: number
  creator: {
    userId: number
    nickname: string
    avatarUrl: string
  }
}

export interface userDetailType {
  userId: number
  nickname: string
  gender: number
  birthday: number
  avatarUrl: string
  description: string
  province: number
  city: number
  followed: boolean
  signature: string
  followeds: number
  follows: number
  playlistCount: number
  createTime: number
  createDays: number
  level: number
  listenSongs: number
  nextPlayCount?: number
  nowPlayCount?: number
  nextLoginCount?: number
  nowLoginCount?: number
}

export interface commentType {
  user: {
    userId: number
    avatarUrl: string
    nickname: string
    followed: boolean
  }
  beReplied: {
    user: {
      userId: number
      nickname: string
    }
    content: string
  }
  commentId: number
  content: string
  time: number
  timeStr: string
  likedCount: number
}

export interface userBriefType {
  time: number
  followeds: number
  followed: boolean
  avatarUrl: string
  gender: number
  nickname: string
  userId: number
  follows: number
  signature: string
  eventCount: number
  playlistCount: number
}

export interface songType {
  id: number
  name: string
  alias: string[] // 别名
  tns: string[] // 译名
  artists: {
    id: number
    name: string
    tns: string[]
    alias: string[]
  }[]
  album: {
    id: number
    name: string
    picUrl: string
    tns: string[]
  }
  duration: number
  mv: number // 0: 无 MV; !0: 有 MV
  hasSq: boolean // 是否有超品音质
  isVip: boolean // 是否是 VIP 歌曲
  canPlay: boolean // 是否可以播放
  hasSrc: boolean // 是否有音源
  noCopyrightInfo: {
    type: number
    typeDesc: string
  } // 无版权信息
}
