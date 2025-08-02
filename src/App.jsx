import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/sidebar'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import College from './elements/college'
import Work from './elements/work'  
import Life from './elements/life'
import Chores from './elements/chores'
import Date from './components/date'
function App() {

  return (
    <>
      <BrowserRouter>
        <div className="main flex gap-4">
            <Sidebar />
            <div className='flex flex-col gap-2 mt-10'>
              <Date />
              <hr className='text-gray-400 w-[500px]'/>
              <Routes>
                <Route path='/' element={<Life />}></Route>
                <Route path='/college' element={<College />}></Route>
                <Route path='/work' element={<Work />}></Route>
                <Route path='/chores' element={<Chores />}></Route>
              </Routes>
            </div>

            
          
        </div>    
      </BrowserRouter>  
    </>
  )
}

export default App
