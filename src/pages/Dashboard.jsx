import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [rooms, setRooms] = useState([])
  const nav = useNavigate()

  useEffect(()=> {
    axios.get('http://localhost:5000/rooms').then(r=>setRooms(r.data)).catch(()=>{})
  },[])

  return (
    <div className='flex'>
      <Sidebar rooms={rooms}/>
      <div className='flex-1'>
        <Topbar title='Dashboard' />
        <div className='p-6'>
          <h1 className='text-2xl font-semibold mb-4'>Welcome back!</h1>
          <div className='grid grid-cols-3 gap-4'>
            {rooms.map(r=>(
              <div key={r._id} className='p-4 bg-white dark:bg-slate-800 rounded shadow'>
                <div className='text-lg font-medium'>{r.name}</div>
                <div className='text-sm text-gray-500 dark:text-gray-300'>{r.description}</div>
                <div className='mt-3 flex gap-2'>
                  <button onClick={()=>nav('/room/'+r._id)} className='px-3 py-1 bg-primary text-white rounded'>Join</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
