'use client'
import React from 'react'
import Image from 'next/image'
import { GoPlus } from "react-icons/go";
interface ISidebar {
  selectPlaylist: (id: string | null) => void,
  playlists: Array<any>,
  addPlayList: () => void
}
const Sidebar: React.FC<ISidebar> = ({ selectPlaylist, playlists, addPlayList }) => {
  const changePlaylist = async (id: string) => {
    selectPlaylist(id)
  }
  return (
    <div className="w-64 bg-gray-800 p-4">
      <div className="flex flex-row justify-between mb-4">
        <h2 className="text-lg font-bold">Your Library</h2>
        <button type="button" onClick={addPlayList}>
          <GoPlus />
        </button>
      </div>
      <div>
        {
          playlists.map((playlist: any) => (
            <button key={`sidebar-${playlist._id}`} className="flex items-center mb-2 p-2 hover:bg-gray-700 rounded" onClick={() => changePlaylist(playlist._id)} type="button">
              <div className='flex flex-1 items-center'>
                <div className='flex items-center'>
                  <div className='inline-block pr-2'>
                    <Image
                      src={playlist.image || "/music-thumbnail.png"}
                      alt="Music Thumbnail"
                      className="dark:invert"
                      width={40}
                      height={40}
                      max-width={40}
                      max-height={40}
                      priority
                    />
                  </div>
                  <div className='inline-block'>
                    <div className='text-left'>{playlist.name}</div>
                    <div className='sidebar-playlist-creator'>Playlist &#x2022; {playlist.creatorName}</div>
                  </div>
                </div>
              </div>
            </button>
          ))
        }

      </div>
    </div>
  )
}

export default Sidebar