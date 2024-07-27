import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { HiMagnifyingGlass } from "react-icons/hi2";
import axios from '@/config/axios'
interface ITracks {
  addToPlaylist: (id: string) => void
}
const Tracks: React.FC<ITracks> = ({ addToPlaylist }) => {
  const [tracks, setTracks] = useState([])
  const [search, setSearch] = useState("")
  const getTrack = async (search: string) => {
    const res = await axios.get(`/tracks`, {
      params: {
        search
      }
    })
    if (res.status === 200) {
      setTracks(res.data.data)
    }
  }
  useEffect(() => {
    getTrack(search)
  }, [search])
  return (
    <div>
      <div className='flex flex-row justify-between mt-4'>
        <div >
          <div className="relative">
            <input type="text" onChange={(e) => setSearch(e.target.value)} value={search}
              className="pl-10 pr-4 py-2 border rounded-lg search-input"
              placeholder="Filter" />
            <div className="absolute inset-y-0 left-0 pl-3  
                    flex items-center  
                    pointer-events-none">
              <HiMagnifyingGlass className='search-icon' />
            </div>
          </div>
        </div>
        <div>
          <span className='btn-download'>Download</span> <label className="relative inline-flex cursor-pointer items-center">
            <input id="switch" type="checkbox" className="peer sr-only" />
            <label htmlFor="switch" className="hidden"></label>
            <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
          </label>
        </div>
      </div>
      {
        tracks.map((track: any) => (

          <div key={`playlist-${track._id}`} className='flex flex-row justify-between mt-4 playlist'>
            <div className='flex flex-1 items-center'>
              <div className='flex items-center px-2'>
                <Image
                  src="/music-thumbnail.png"
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
                <div>{track.name}</div>
                <div>{track.artist}</div>
              </div>
            </div>
            <div>
              {track.album}
            </div>
            <div className="flex w-20 items-center">
              <button className='btn-add' type='button' onClick={() => addToPlaylist(track._id)}>Add</button>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Tracks