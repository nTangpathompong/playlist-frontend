"use client"
import React from 'react'
import Image from 'next/image'
import { IoTimeOutline } from "react-icons/io5";
import DropDownManage from "@/app/components/DropDownManage"
interface ITracks {
  tracks: Array<any>,
  deleteFromPlaylist: (id: string) => void
}
const Musiclist: React.FC<ITracks> = ({ tracks, deleteFromPlaylist }) => {
  const converTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const paddedSeconds = remainingSeconds.toString().padStart(2, '0');
    return `${minutes}:${paddedSeconds}`;
  }
  return (
    <>{
      tracks.length ?
        <div>
          <div className='flex flex-row  mt-4 player-header'>
            <div className='w-10 p-4 text-right items-center'>
              #
            </div>
            <div className='flex flex-1 items-center'>
              <div className='flex items-center'>
                Title
              </div>
            </div>
            <div className='flex flex-1 items-center'>
              Album
            </div>
            <div className='flex w-20 items-center w-50'>
              <IoTimeOutline className='clock-icon' />
            </div>
            <div className='flex w-20  items-center w-50'>
            </div>
          </div>
          {
            tracks.map((track, index) => (
              <div key={`music-${track._id}`} className='flex flex-row  mt-4 playlist'>
                <div className='w-10 p-4 text-right items-center'>
                  {index + 1}
                </div>
                <div className='flex flex-1 items-center'>
                  <div className='flex items-center'>
                    <div className='inline-block pr-2'>
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
                      <div>{track.trackId.name}</div>
                      <div>{track.trackId.artist}</div>
                    </div>
                  </div>
                </div>
                <div className='flex flex-1 items-center'>
                  {track.trackId.album}
                </div>
                <div className='flex w-20 items-center'>
                  {converTime(track.trackId.duration)}
                </div>
                <div className='flex w-20 items-center w-50'>
                  <DropDownManage deleteFromPlaylist={deleteFromPlaylist} trackId={track._id} />
                </div>
              </div>
            ))
          }
        </div> : ""}
    </>
  )
}

export default Musiclist