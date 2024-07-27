'use client'
import PlaylistDetail from "./components/PlaylistDetail";
import Tracks from "./components/Tracks"
import MusicList from "./components/MusicList"
import Sidebar from "@/app/components/layout/Sidebar"
import { useEffect, useState } from "react";
import axios from '@/config/axios'
interface IPlaylist {
  name: string,
  description: string,
  image: string,
  _id: string
}
interface IPlaylists extends Array<IPlaylist> { }
interface ITrack {
  trackId: ITrackDetail
}
interface ITrackDetail {
  duration: number
}

export default function Home() {
  const [playlistId, setPlaylistId] = useState<string | null>(null)
  const [playlists, setPlaylists] = useState<IPlaylists>([])
  const [totalTrack, setTotalTrack] = useState<number>(0)
  const [totalDuration, setTotalDuration] = useState<number>(0)
  const [playlistTrack, setPlaylistTrack] = useState([])


  const getPlaylistsApi = async () => {
    const res = await axios.get("/playlist")
    if (res.status) {
      setPlaylists(res.data.data)
    }
  }
  const getPlayListTrack = async () => {
    const res = await axios.get(`/playlist/${playlistId}/track`)
    if (res.status === 200) {
      const tracks = res.data.data
      setPlaylistTrack(tracks)
      setTotalTrack(tracks.length)

      const totalDuration = tracks.reduce(
        (acc: number, track: ITrack) => acc + track?.trackId.duration,
        0,
      );
      setTotalDuration(totalDuration)
    }
  }
  const addToPlaylist = async (id: string) => {
    const res = await axios.put(`/playlist/${playlistId}/track`, { trackId: id })
    if (res.status === 200) {
      await getPlayListTrack()
    }
  }
  const deleteFromPlaylist = async (id: string) => {
    const res = await axios.delete(`/playlist/${playlistId}/track/${id}`)
    if (res.status === 200) {
      await getPlayListTrack()
    }
  }
  const addPlayList = async () => {
    const res = await axios.post("/playlist", {})
    if (res.status === 200) {
      await getPlaylistsApi()
    }
  }

  const deletePlayList = async (id: string) => {
    const res = await axios.delete(`/playlist/${id}`)
    if (res.status == 200) {
      await getPlaylistsApi()
      setPlaylistId(null)
    }
  }
  useEffect(() => {
    if (playlistId) {
      getPlayListTrack()
    }
  }, [playlistId])
  useEffect(() => {
    getPlaylistsApi()
  }, [])
  useEffect(() => {
    if (playlists.length > 0 && playlistId == null) {
      setPlaylistId(playlists?.[0]?._id)
    }
  }, [playlists])

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar selectPlaylist={setPlaylistId} playlists={playlists} addPlayList={addPlayList} />
      <div className="flex-1 p-8 overflow-y-auto">
        {playlistId ?
          <>
            <PlaylistDetail playlistId={playlistId} deletePlayList={deletePlayList} totalTrack={totalTrack} totalDuration={totalDuration} />
            <MusicList tracks={playlistTrack} deleteFromPlaylist={deleteFromPlaylist} />
            <Tracks addToPlaylist={addToPlaylist} />
          </>
          : ''}
      </div>
    </div>
  );
}
