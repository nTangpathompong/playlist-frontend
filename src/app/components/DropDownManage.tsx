'use client'
import React, { useState, useEffect, useRef } from 'react'

interface IDropDown {
  deleteFromPlaylist: (id: string) => void
  trackId: string
}
const DropDownManage: React.FC<IDropDown> = ({ deleteFromPlaylist, trackId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
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
      <button onClick={toggleIsOpen} id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider" type="button">
        •••
      </button>
      <div id="dropdownDivider" className={`absolute right-1 dropdown-list z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${isOpen ? 'block' : 'hidden'}`}>
        <ul className="menu-list py-2 text-sm" aria-labelledby="dropdownDividerButton">
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-400 hover:text-gray-700 dark:hover:text-white" onClick={() => deleteFromPlaylist(trackId)}>Delete</a>
          </li>
        </ul>
      </div>
    </div >
  )
}

export default DropDownManage