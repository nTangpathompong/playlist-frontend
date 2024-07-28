import React, { useEffect, useState } from "react";
import Image from "next/image";
import DropDown from "./DropDown";
import axios from '@/config/axios'
const totalTimeString = (totalSeconds: number) => {
  console.log(totalSeconds)
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let formattedTime = ""
  if (hours > 0) {
    formattedTime = `${hours} hr`
  }

  if (minutes > 0) {
    formattedTime += ` ${minutes} min`
  }

  if (seconds > 0) {
    formattedTime += ` ${seconds} sec`
  }
  return formattedTime
}
interface IPlaylistDetail {
  playlistId: string | null,
  deletePlayList: (id: string) => void,
  totalTrack: number,
  totalDuration: number
}
interface IDetail {
  name: string,
  image: string | null,
  description: string,
  creatorName: string
}
const PlaylistDetail: React.FC<IPlaylistDetail> = ({ playlistId, deletePlayList, totalTrack, totalDuration }) => {
  const [detail, setDetail] = useState<IDetail>({
    name: "Driving",
    description: "Pop jams for the car",
    creatorName: "Ari Vaniderstine",
    image: "/music-thumbnail.png",
  })
  const [stringDuration, SetStringDuration] = useState<string>('')
  const getPlaylistDetailApi = async () => {
    const res = await axios.get(`/playlist/${playlistId} `)
    if (res.status) {
      setDetail(res.data.data)
    }
  }
  useEffect(() => {
    if (playlistId) {
      getPlaylistDetailApi()
    }
  }, [playlistId])
  useEffect(() => {
    SetStringDuration(
      totalTimeString(totalDuration)
    )
  }, [totalDuration])
  return (
    <div className="flex flex-col md:flex-row p-2">
      <div>
        <Image
          src={detail?.image || "/music-thumbnail.png"}
          alt="Music Thumbnail"
          className="dark:invert"
          width={400}
          height={400}
          max-width={400}
          max-height={400}
          priority
        />
      </div>
      <div className="flex-1 self-end pl-10">
        <div className="playlist-title">Play List</div>
        <div className="playlist-name">{detail.name}</div>
        <div className="playlist-description">{detail.description}</div>
        <div className="playlist-createdBy"><span>Created by: </span><span className="playlist-creator">{detail.creatorName}</span> {totalTrack ? <span> &#x2022; {totalTrack} songs, {stringDuration}</span> : ''} </div>
        <div>
          <button className="btn-play inline-block" >PLAY</button>
          <div className="inline-block">
            <DropDown playlistId={playlistId} data={detail} deletePlayList={deletePlayList} />
          </div>
          <div className="inline-block float-right">
            <div className="follower-title">
              Follower
            </div>
            <div className="follower-title text-right">
              10
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaylistDetail