import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
interface IData {
  name: string,
  description: string,
  isOpen: boolean,
  closeModal: () => void
  updatePlayList: (data: any) => void
}
const DialogEdit: React.FC<IData> = ({ isOpen, closeModal, name, description, updatePlayList }) => {
  const [formName, setFormName] = useState(name)
  const [formDescription, setFormDescription] = useState(description)
  const submit = async (e: any) => {
    e.preventDefault()
    updatePlayList({
      name: formName,
      description: formDescription
    })
  }
  return (
    <>
      <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className={`${isOpen ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
        <div className="relative p-4 w-full max-w-md max-h-full">

          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Edit Detail
              </h3>
              <button type="button" onClick={closeModal} className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                <IoMdClose />
              </button>
            </div>

            <div className="p-4 md:p-5">
              <form className="space-y-4" onSubmit={submit}>
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                  <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={(e) => setFormName(e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                  <input type="text" name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={(e) => setFormDescription(e.target.value)} required />
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DialogEdit