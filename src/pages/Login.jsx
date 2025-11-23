import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/auth/login', { email, password })
      if (res.data.token) {
        localStorage.setItem('token', res.data.token)
        nav('/dashboard')
      }
    } catch (err) {
      alert('Login failed')
    }
  }

  return (
    <div className='flex items-center justify-center h-screen bg-gray-50 dark:bg-slate-900'>
      <div className='w-full max-w-md bg-white dark:bg-slate-800 rounded shadow p-6'>
        <h2 className='text-2xl font-bold mb-4'>Sign in</h2>
        <input className='w-full mb-3 p-2 border rounded' placeholder='Email' onChange={e=>setEmail(e.target.value)}/>
        <input type='password' className='w-full mb-3 p-2 border rounded' placeholder='Password' onChange={e=>setPassword(e.target.value)}/>
        <button onClick={login} className='w-full bg-primary text-white py-2 rounded'>Sign in</button>
        <div className='mt-4 text-center text-sm'>
          <Link to='/register' className='text-primary'>Create account</Link>
        </div>
      </div>
    </div>
  )
}
