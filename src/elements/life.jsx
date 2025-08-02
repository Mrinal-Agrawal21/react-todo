import React from 'react'
import Date from '../components/date'
import { useState, useEffect, useRef } from 'react'
import { IoMdAdd } from "react-icons/io";
import { AiTwotoneEdit } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";

const Life = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [List, setList] = useState([])
  const [key, setKey] = useState(0)
  const [editingIndex, setEditingIndex] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const isInitialMount = useRef(true)

  // Load todos from localStorage on component mount
  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem('lifeTodos')
      if (savedTodos) {
        const parsedTodos = JSON.parse(savedTodos)
        console.log('Loaded todos from localStorage:', parsedTodos)
        if (Array.isArray(parsedTodos)) {
          setList(parsedTodos)
        }
      }
    } catch (error) {
      console.error('Error loading todos from localStorage:', error)
      // Clear corrupted data
      localStorage.removeItem('lifeTodos')
    }
  }, [])

  // Save todos to localStorage whenever List changes (but not on initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    
    try {
      console.log('Saving todos to localStorage:', List)
      localStorage.setItem('lifeTodos', JSON.stringify(List))
    } catch (error) {
      console.error('Error saving todos to localStorage:', error)
    }
  }, [List])

  const handleEdit = (index) => {
    setEditingIndex(index)
    setEditTitle(List[index].title)
    setEditDescription(List[index].description)
  }

  const handleSaveEdit = (index) => {
    if (editTitle && editDescription) {
      setList(List.map((item, i) => 
        i === index 
          ? { ...item, title: editTitle, description: editDescription }
          : item
      ))
      setEditingIndex(null)
      setEditTitle('')
      setEditDescription('')
    } else {
      alert('Please enter both title and description')
    }
  }

  const handleCancelEdit = () => {
    setEditingIndex(null)
    setEditTitle('')
    setEditDescription('')
  }

  return (
    <>
      <div className="main absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[500px] overflow-y-auto">
        <div className='p-4 flex flex-col gap-4'>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' className='w-[500px] p-2  border-b-2 outline-none' />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' className='w-[500px] p-2  border-b-2 outline-none' />
          <button className=' text-white p-2 rounded-md ' onClick={() => {
            if(title && description){
              setTitle('')
              setDescription('')
              setList([...List, {title, description}])
            }else{
              alert('Please enter a title and description')
            }
          }}><IoMdAdd  className='text-4xl bg-red-400 p-2 hover:text-red-400 hover:bg-white cursor-pointer transition-all duration-200 rounded-full float-right'/></button>
          
        </div>

        <div className='p-4 flex flex-col gap-4'>
          
          {List.map((item,index) => (
            <div className='flex justify-between items-center p-4 rounded-md shadow-gray-400 shadow-md' key={index}>
              {editingIndex === index ? (
                // Edit mode
                <div className='flex-1 flex flex-col gap-2'>
                  <input 
                    type="text" 
                    value={editTitle} 
                    onChange={(e) => setEditTitle(e.target.value)} 
                    placeholder='Title' 
                    className='w-full p-2 border-b-2 outline-none' 
                  />
                  <textarea 
                    value={editDescription} 
                    onChange={(e) => setEditDescription(e.target.value)} 
                    placeholder='Description' 
                    className='w-full p-2 border-b-2 outline-none' 
                  />
                  <div className='flex gap-2 mt-2'>
                    <button 
                      onClick={() => handleSaveEdit(index)}
                      className='bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors'
                    >
                      <IoMdCheckmark className='text-xl' />
                    </button>
                    <button 
                      onClick={handleCancelEdit}
                      className='bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition-colors'
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // Display mode
                <>
                  <div className='flex flex-col gap-1'>
                    <h1 className='text-2xl font-bold'>{item.title}</h1>
                    <p className='text-gray-500'>{item.description}</p>
                  </div>
                  <div className='flex gap-2'>
                    <div onClick={() => handleEdit(index)}>
                      <AiTwotoneEdit className='text-2xl text-red-500 hover:text-red-600 cursor-pointer transition-colors'/>
                    </div>
                    <div className='rounded-full w-5 h-5 border-2 border-red-500 hover:bg-red-300 cursor-pointer' onClick={() => {
                      // display button color as red and then delete the item
                      setList(List.filter((_, i) => i !== index))
                    }}></div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      
    </>
  )
}

export default Life
