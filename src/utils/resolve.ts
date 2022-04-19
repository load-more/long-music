import {
  songType,
  playlistDetailType,
  userDetailType,
  commentType,
  userBriefType,
  bannerType,
  albumDetailType,
  artistType,
  artistDescType,
  mvType,
} from '@/assets/ts/type'

export const resolveSongsDetail = (data: any): songType[] => {
  /*
    字段含义：
    fee
      0: 免费/无版权; 1: VIP; 4: 歌曲所在专辑需单独付费; 8: 低品免费，高品下载收费; 16: 无音源
    st
      0: 可以播放; !0: 不可播放
  */
  const arr: songType[] = []
  data.songs.forEach((item: any, index: number) => {
    const obj: songType = {
      id: item.id,
      name: item.name,
      alias: item.alia,
      tns: item.tns || [],
      artists: item.ar,
      album: item.al,
      duration: item.dt,
      mv: item.mv,
      hasSq: data.privileges[index].maxbr >= 999000,
      isVip: data.privileges[index].fee === 1 || data.privileges[index].fee === 4,
      canPlay: data.privileges[index].st !== -200,
      hasSrc: data.privileges[index].fee !== 16,
      noCopyrightInfo: item.noCopyrightRcmd || { type: 0, typeDesc: '' },
    }
    arr.push(obj)
  })
  return arr
}

export const resolveSearchSongsDetail = (songs: any[]): songType[] => {
  const arr: songType[] = []
  songs.forEach((item: any) => {
    const obj: songType = {
      id: item.id,
      name: item.name,
      alias: item.alia,
      tns: item.tns || [],
      artists: item.ar,
      album: item.al,
      duration: item.dt,
      mv: item.mv,
      hasSq: item.privilege.maxbr >= 999000,
      isVip: item.privilege.fee === 1 || item.privilege.fee === 4,
      canPlay: item.privilege.st !== -200,
      hasSrc: item.privilege.fee !== 16,
      noCopyrightInfo: item.noCopyrightRcmd || { type: 0, typeDesc: '' },
    }
    arr.push(obj)
  })
  return arr
}

export const resolvePlaylistDetail = (playlist: any): playlistDetailType => {
  const obj: playlistDetailType = {
    id: playlist.id,
    name: playlist.name,
    coverImgUrl: playlist.coverImgUrl,
    createTime: playlist.createTime,
    updateTime: playlist.updateTime,
    trackCount: playlist.trackCount,
    playCount: playlist.playCount,
    subscribedCount: playlist.subscribedCount,
    description: playlist.description,
    tags: playlist.tags,
    creator: {
      userId: playlist.creator.userId,
      nickname: playlist.creator.nickname,
      avatarUrl: playlist.creator.avatarUrl,
    },
  }
  return obj
}

export const resolveUserDetail = (data: any): userDetailType => {
  const obj: userDetailType = {
    userId: data.profile.userId,
    nickname: data.profile.nickname,
    gender: data.profile.gender,
    birthday: data.profile.birthday,
    avatarUrl: data.profile.avatarUrl,
    description: data.profile.description,
    province: data.profile.province,
    city: data.profile.city,
    followed: data.profile.followed,
    signature: data.profile.signature,
    followeds: data.profile.followeds,
    follows: data.profile.follows,
    playlistCount: data.profile.playlistCount,
    createTime: data.createTime,
    createDays: data.createDays,
    level: data.level,
    listenSongs: data.listenSongs,
  }
  return obj
}

export const resolveComment = (comment: any): commentType => {
  const obj: commentType = {
    user: {
      userId: comment.user.userId,
      avatarUrl: comment.user.avatarUrl,
      nickname: comment.user.nickname,
      followed: comment.user.followed,
    },
    beReplied: {
      user: {
        userId: comment.beReplied[0] ? comment.beReplied[0].user.userId : null,
        nickname: comment.beReplied[0] ? comment.beReplied[0].user.nickname : null,
      },
      content: comment.beReplied[0] ? comment.beReplied[0].content : null,
    },
    commentId: comment.commentId,
    content: comment.content,
    time: comment.time,
    timeStr: comment.timeStr,
    likedCount: comment.likedCount,
  }
  return obj
}

export const resolveUserBrief = (user: any): userBriefType => {
  const obj: userBriefType = {
    time: user.time,
    followeds: user.followeds,
    followed: user.followed,
    avatarUrl: user.avatarUrl,
    gender: user.gender,
    nickname: user.nickname,
    userId: user.userId,
    follows: user.follows,
    signature: user.signature,
    eventCount: user.eventCount,
    playlistCount: user.playlistCount,
  }
  return obj
}

export const resolveBanners = (banners: any): bannerType[] => {
  const arr: bannerType[] = []
  banners.forEach((banner: any) => {
    const obj: bannerType = {
      imageUrl: banner.imageUrl,
      targetId: banner.targetId,
      targetType: banner.targetType,
      titleColor: banner.titleColor,
      typeTitle: banner.typeTitle,
      url: banner.url,
    }
    arr.push(obj)
  })
  return arr
}

export const resolveAlbumDetail = (album: any): albumDetailType => {
  const obj: albumDetailType = {
    alias: album.alias,
    artist: album.artist,
    briefDesc: album.briefDesc,
    publishTime: album.publishTime,
    company: album.company,
    picUrl: album.picUrl,
    description: album.description,
    tags: album.tags,
    name: album.name,
    id: album.id,
    size: album.size,
    commentCount: album.info.commentCount,
    shareCount: album.info.shareCount,
  }
  return obj
}

export const resolveAlbums = (albums: any): albumDetailType[] => {
  const arr: albumDetailType[] = []
  albums.forEach((album: any) => {
    const obj: albumDetailType = {
      alias: album.alias,
      artist: album.artist,
      briefDesc: album.briefDesc,
      publishTime: album.publishTime,
      company: album.company,
      picUrl: album.picUrl,
      description: album.description,
      tags: album.tags,
      name: album.name,
      id: album.id,
      size: album.size,
    }
    arr.push(obj)
  })
  return arr
}

export const resolveArtist = (artist: any): artistType => {
  const obj: artistType = {
    followed: artist.followed,
    alias: artist.alias,
    musicSize: artist.musicSize,
    albumSize: artist.albumSize,
    briefDesc: artist.briefDesc,
    picUrl: artist.picUrl,
    trans: artist.trans,
    name: artist.name,
    id: artist.id,
    publishTime: artist.publishTime,
    mvSize: artist.mvSize,
    img1v1Url: artist.img1v1Url,
  }
  return obj
}

export const resolveArtistDesc = (introduction: any): artistDescType[] => {
  const arr: artistDescType[] = []
  introduction.forEach((item: any) => {
    arr.push({
      ti: item.ti,
      txt: item.txt,
    })
  })
  return arr
}

export const resolveMvs = (mvs: any): mvType[] => {
  const arr: mvType[] = []
  mvs.forEach((mv: any) => {
    arr.push({
      id: mv.id,
      name: mv.name,
      imgurl16v9: mv.imgurl16v9,
      duration: mv.duration,
      playCount: mv.playCount,
      publishTime: mv.publishTime,
    })
  })
  return arr
}
