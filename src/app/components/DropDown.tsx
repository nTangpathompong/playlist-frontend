'use client'
import React, { useState, useEffect, useRef } from 'react'
import axios from '@/config/axios'
import DialogEdit from './DialogEdit'
interface IDropDown {
  playlistId: string | null,
  data: any
  deletePlayList: (id: string) => void
}
const DropDown: React.FC<IDropDown> = ({ playlistId, data, deletePlayList }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null);
  const updatePlayList = async (data: any) => {
    const res = await axios.post(`/playlist/${playlistId}`, { data })
    if (res.status) {
      closeModal()
    }
  }
  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }
  const closeModal = () => {
    setIsOpenEdit(false)
  }
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  return (
    <div className='inline-block relative' ref={dropdownRef}>
      <button onClick={toggleIsOpen} className="dot-outside" id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider" type="button">
        <div className="dot-inside">
          •••
        </div>
      </button>
      {isOpen && playlistId ?
        <>
          <div id="dropdownDivider" className={`absolute dropdown-list z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${isOpen ? 'block' : 'hidden'}`}>
            <ul className="menu-list py-2 text-sm" aria-labelledby="dropdownDividerButton">
              <li>
                <button className="block px-4 py-2 text-zinc-600 cursor-not-allowed" disabled>Go to Playlist Radio</button >
              </li>
            </ul>
            <ul className="menu-list py-2 text-sm" aria-labelledby="dropdownDividerButton">
              <li>
                <button className="block text-zinc-600 px-4 py-2  cursor-not-allowed" disabled>Collaborative Playlist</button>
              </li>
              <li>
                <button className="block text-zinc-600 px-4 py-2  cursor-not-allowed" disabled>Make Secret</button>
              </li>
            </ul>
            <ul className="menu-list py-2 text-sm" aria-labelledby="dropdownDividerButton">
              <li>
                <button className="block text-zinc-600 px-4 py-2  cursor-not-allowed" disabled onClick={() => setIsOpenEdit(true)}>Edit Detail</button>
              </li>
              <li>
                <button className="block text-zinc-600 px-4 py-2  cursor-not-allowed" disabled>Report</button>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-400 hover:text-gray-700" onClick={() => deletePlayList(playlistId)}>Delete</a>
              </li>
            </ul>
            <ul className="menu-list py-2 text-sm" aria-labelledby="dropdownDividerButton">
              <li>
                <button className="block text-zinc-600 px-4 py-2  cursor-not-allowed" disabled>Create Similar Playlist</button>
              </li>
              <li>
                <button className="block text-zinc-600 px-4 py-2  cursor-not-allowed" disabled>Download</button>
              </li>
              <li>
                <button className="block text-zinc-600 px-4 py-2  cursor-not-allowed" disabled>Share</button>
              </li>
            </ul>
          </div>
          <DialogEdit isOpen={isOpenEdit} name={data.name} description={data.description} closeModal={closeModal} updatePlayList={updatePlayList} />
        </> : ''}
    </div>
  )
}

export default DropDown