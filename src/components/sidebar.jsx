import React from 'react'
import { Avatar } from 'antd';
import AvatarImg from '../assets/avatar.jpg';
import { Link } from 'react-router-dom';
const sidebar = () => {
  return (
    <div className='sidebar h-screen w-64 bg-red-100 p-5'>
        {/* profile */}
        <div className="profile flex gap-6 items-center">
            <Avatar size={54} src={AvatarImg} className='m-4' />
            <h3 className='font-bold'>Mrinal Agrawal</h3>
            
        </div>
        <hr className='mt-4' />
        {/* menu */}
        <div className="menu mt-[25vh]">
            <h1 className='text-2xl underline'>Pages</h1>
            <ul className='mt-4 ml-4'>
                <Link to='/'><li className='text-lg font-semibold mb-4 cursor-pointer hover:text-red-400'># Life</li></Link>
                <Link to='/college'><li className='text-lg font-semibold mb-4 cursor-pointer  hover:text-red-400'># College</li></Link>
                <Link to='/work'><li className='text-lg font-semibold mb-4 cursor-pointer  hover:text-red-400'># Work</li></Link>
                <Link to='/chores'><li className='text-lg font-semibold mb-4 cursor-pointer  hover:text-red-400'># Chores</li></Link>
            </ul>
        </div>
    </div>
  )
}

export default sidebar
