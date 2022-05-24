interface UserBase {
  userType: number
  avatarDetail: {
    userType: unknown
    identityLevel: number
    identityIconUrl: string
  }
  accountStatus: number
  vipType: number
  followed: boolean
  remarkName: string
  avatarUrl: string
  authStatus: number
  gender: number
  expertTags: string[]
  experts: {
    [key: string]: string
  }
  nickname: string
  mutual: boolean
  userId: number
  signature: string
}

export interface UserRelation extends UserBase {
  py: string
  time: number
  followeds: number
  follows: number
  vipRights: unknown
  eventCount: number
  playlistCount: number
}

export interface User extends UserBase {
  avatarImgIdStr: string
  detailDescription: string
  avatarImgId: number
  backgroundImgId: number
  defaultAvatar: boolean
  backgroundImgIdStr: string
  province: number
  birthday: number
  city: number
  djStatus: number
  backgroundUrl: string
  description: string
  authority: number
}

export interface UserProfile extends User {
  authenticationTypes: number
  anchor: boolean
  avatarImgId_str: string
  privacyItemUnlimit: {
    area: boolean
    college: boolean
    age: boolean
    villageAge: boolean
  }
  allAuthTypes: {
    type: number
    desc: string
    tags: unknown
  }[]
  followeds: number
  follows: number
  blacklist: boolean
  eventCount: number
  allSubscribedCount: number
  playlistBeSubscribedCount: number
  mainAuthType: {
    type: number
    desc: string
    tags: unknown
  }
  followTime: unknown
  followMe: boolean
  artistIdentity: unknown[]
  cCount: number
  inBlacklist: boolean
  sDJPCount: number
  playlistCount: number
  sCount: number
  newFollows: number
}

export interface UserLevel {
  userId: number
  info: string
  progress: number
  nextPlayCount: number
  nextLoginCount: number
  nowPlayCount: number
  nowLoginCount: number
  level: number
}

export interface UserDetail {
  level: number
  listenSongs: number
  userPoint: {
    userId: number
    balance: number
    updateTime: number
    version: number
    status: number
    blockBalance: number
  }
  mobileSign: boolean
  pcSign: boolean
  profile: UserProfile
  peopleCanSeeMyPlayRecord: boolean
  bindings: {
    expired: boolean
    url: string
    userId: number
    expiresIn: number
    refreshTime: number
    bindingTime: number
    tokenJsonStr: unknown
    id: number
    type: number
  }[]
  adValid: boolean
  createTime: number
  createDays: number
  profileVillageInfo: {
    title: string
    imageUrl: string
    targetUrl: string
  }
}

export interface UserPlaylist {
  subscribers: unknown
  subscribed: boolean
  creator: User
  artists: unknown
  tracks: unknown
  updateFrequency: unknown
  backgroundCoverId: number
  backgroundCoverUrl: unknown
  titleImage: number
  titleImageUrl: unknown
  englishTitle: unknown
  opRecommend: boolean
  recommendInfo: unknown
  subscribedCount: number
  cloudTrackCount: number
  userId: number
  totalDuration: number
  coverImgId: number
  privacy: number
  trackUpdateTime: number
  trackCount: number
  updateTime: number
  commentThreadId: string
  coverImgUrl: string
  specialType: number
  anonimous: boolean
  createTime: number
  highQuality: boolean
  newImported: boolean
  trackNumberUpdateTime: number
  playCount: number
  adType: number
  description: string
  tags: string[]
  ordered: boolean
  status: number
  name: string
  id: number
  coverImgId_str: string
  sharedUsers: unknown
  sharedStatus: unknown
}

export interface SearchUser {
  defaultAvatar: boolean
  province: number
  authStatus: number
  followed: boolean
  avatarUrl: string
  accountStatus: number
  gender: number
  city: number
  birthday: number
  userId: number
  userType: number
  nickname: string
  signature: string
  description: string
  detailDescription: string
  avatarImgId: number
  backgroundImgId: number
  backgroundUrl: string
  authority: number
  mutual: boolean
  expertTags: unknown
  experts: unknown
  djStatus: number
  vipType: number
  remarkName: unknown
  authenticationTypes: number
  avatarDetail: unknown
  avatarImgIdStr: string
  backgroundImgIdStr: string
  anchor: boolean
  followeds: number
  follows: number
  alg: string
  playlistCount: number
  playlistBeSubscribedCount: number
}
