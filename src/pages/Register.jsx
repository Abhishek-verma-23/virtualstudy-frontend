import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const register = async () => {
    try {
      await axios.post('http://localhost:5000/auth/register', { name, email, password })
      nav('/')
    } catch {
      alert('Register failed')
    }
  }

  return (
    <div className='flex items-center justify-center h-screen bg-gray-50 dark:bg-slate-900'>
      <div className='w-full max-w-md bg-white dark:bg-slate-800 rounded shadow p-6'>
        <h2 className='text-2xl font-bold mb-4'>Create account</h2>
        <input className='w-full mb-3 p-2 border rounded' placeholder='Full name' onChange={e=>setName(e.target.value)}/>
        <input className='w-full mb-3 p-2 border rounded' placeholder='Email' onChange={e=>setEmail(e.target.value)}/>
        <input type='password' className='w-full mb-3 p-2 border rounded' placeholder='Password' onChange={e=>setPassword(e.target.value)}/>
        <button onClick={register} className='w-full bg-primary text-white py-2 rounded'>Create account</button>
        <div className='mt-4 text-center text-sm'>
          <Link to='/' className='text-primary'>Back to sign in</Link>
        </div>
      </div>
    </div>
  )
}
