interface Artist {
  id: number
  name: string
  tns: string[]
  alias: string[]
}

interface Album {
  id: number
  name: string
  picUrl: string
  tns: string[]
  pic_str: string
  pic: number
}

interface Quality {
  br: number
  fid: number
  size: number
  vd: number
  sr: number
}

export interface Privilege {
  id: number
  /**
   * 0: 免费/无版权; 1: VIP; 4: 歌曲所在专辑需单独付费; 8: 低品免费，高品下载收费; 16: 无音源
   */
  fee: number
  payed: number
  /**
   * -200: 不可播放; !-200: 可以播放
   */
  st: number
  pl: number
  dl: number
  sp: number
  cp: number
  subp: number
  cs: boolean
  maxbr: number
  fl: number
  toast: boolean
  flag: number
  preSell: boolean
  playMaxbr: number
  downloadMaxbr: number
  maxBrLevel: string
  playMaxBrLevel: string
  downloadMaxBrLevel: string
  plLevel: string
  dlLevel: string
  flLevel: string
  rscl: number
  freeTrialPrivilege: {
    resConsumable: boolean
    userConsumable: boolean
    listenType: unknown
  }
  chargeInfoList: {
    rate: number
    chargeUrl: unknown
    chargeMessage: unknown
    chargeType: number
  }[]
}

export interface Song {
  name: string
  id: number
  pst: number
  t: number
  /**
   * 歌手
   */
  ar: Artist[]
  /**
   * 别名
   */
  alia: string[]
  /**
   * 译名
   */
  tns?: string[]
  pop: number
  st: number
  rt: string
  fee: number
  v: number
  crbt: unknown
  cf: string
  /**
   * 专辑
   */
  al: Album
  /**
   * 时长
   */
  dt: number
  h: Quality
  m: Quality
  l: Quality
  sq: Quality
  hr: Quality
  a: unknown
  cd: string
  no: number
  rtUrl: unknown
  ftype: number
  rtUrls: unknown[]
  djId: number
  copyright: number
  s_id: number
  mark: number
  originCoverType: number
  originSongSimpleData: unknown
  tagPicList: unknown
  resourceState: boolean
  version: number
  songJumpInfo: unknown
  entertainmentTags: unknown
  single: number
  noCopyrightRcmd: {
    type: number
    typeDesc: string
  }
  rtype: number
  rurl: unknown
  mst: number
  cp: number
  /**
   * MV id，0 表示没有 MV
   */
  mv: number
  publishTime: number
  privilege: Privilege
  /**
   * 是否有超品音质
   */
  hasSq?: boolean,
  /**
   * 是否是 VIP 歌曲
   */
  isVip?: boolean,
  /**
   * 是否可以播放
   */
  canPlay?: boolean,
  /**
   * 是否有音源
   */
  hasSrc?: boolean,
  /**
   * 无版权信息
   */
  noCopyrightInfo?: {
    type: number
    typeDesc: string
  }
  /**
   * 歌词
   */
  lyrics?: string[]
}
