import { Song } from './song'

interface Artist {
  img1v1Id: number
  topicPerson: number
  followed: boolean
  alias: string[]
  picId: number
  trans: string
  briefDesc: string
  albumSize: number
  musicSize: number
  picUrl: string
  img1v1Url: string
  name: string
  id: number
  img1v1Id_str?: string
  transNames?: string[]
}

interface Info {
  commentThread: {
    id: string
    resourceInfo: {
      id: number
      userId: number
      name: string
      imgUrl: string
      creator: unknown
      encodedId: unknown
      subTitle: unknown
      webUrl: unknown
    }
    resourceType: number
    commentCount: number
    likedCount: number
    shareCount: number
    hotCount: number
    latestLikedUsers: unknown
    resourceOwnerId: number
    resourceTitle: string
    resourceId: number
  }
  latestLikedUsers: unknown
  liked: boolean
  comments: unknown
  resourceType: number
  resourceId: number
  commentCount: number
  likedCount: number
  shareCount: number
  threadId: string
}

export interface Album {
  songs: Song[]
  paid: boolean
  onSale: boolean
  mark: number
  companyId: number
  blurPicUrl: string
  artists: Artist[]
  alias: string[]
  copyrightId: number
  picId: number
  artist: Artist
  pic: number
  publishTime: number
  company: string
  briefDesc: string
  picUrl: string
  commentThreadId: string
  description: string
  tags: string
  status: number
  subType: string
  name: string
  id: number
  type: string
  size: number
  picId_str: string
  transNames: string[]
  info: Info
}
