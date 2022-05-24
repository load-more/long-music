interface User {
  locationInfo: unknown
  liveInfo: unknown
  anonym: number
  commonIdentity: unknown
  userId: number
  avatarUrl: string
  avatarDetail: unknown
  userType: number
  followed: boolean
  mutual: boolean
  remarkName: unknown
  vipRights: unknown
  nickname: string
  authStatus: number
  expertTags: string[]
  experts: {
    [key: string]: string
  }
  vipType: number
}

export interface Comment {
  user: User
  beReplied: {
    user: User
    beRepliedCommentId: number
    content: string
    status: number
    expressionUrl: unknown
  }[]
  pendantData: unknown
  showFloorComment: unknown
  status: number
  commentId: number
  content: string
  contentResource: unknown
  time: number
  timeStr: string
  needDisplayTime: boolean
  likedCount: number
  expressionUrl: unknown
  commentLocationType: number
  parentCommentId: number
  decoration: unknown[]
  repliedMark: unknown
  grade: unknown
  liked: boolean
}
