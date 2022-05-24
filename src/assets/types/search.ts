import { PlaylistDetail } from './playlist'
import { Album } from './album'

export interface SearchSuggest {
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

export interface SearchMultiMatch {
  orders: string[]
  artist?: {
    name: string
    id: number
    picId: number
    img1v1Id: number
    briefDesc: string
    picUrl: string
    img1v1Url: string
    albumSize: number
    alias: string[]
    trans: string
    musicSize: number
    picId_str: string
    img1v1Id_str: string
    transNames: unknown
    mvSize: number
    alg: string
    fansSize: number
    videoSize: number
    officialTags: string[]
    searchCircle: {
      id: string
      entranceText: string
      entranceUrl: string
    }
    occupation: string
  }[]
  playlist?: PlaylistDetail[]
  album?: Album[]
}
