import React, { useEffect, useState, useRef, useContext } from 'react'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'
import axios from 'axios'
import ChatBubble from '../components/ChatBubble'
import FileGrid from '../components/FileGrid'
import Polls from '../components/Polls'
import Topbar from '../components/Topbar'

const socket = io('http://localhost:5000')

export default function RoomPage() {
  const { id } = useParams()
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [typingUsers, setTypingUsers] = useState({})
  const [files, setFiles] = useState([])
  const [polls, setPolls] = useState([])
  const [online, setOnline] = useState([])
  const meRef = useRef({ id: Math.random().toString(36).slice(2), name: 'You' })

  useEffect(()=> {
    socket.emit('join_room', id)
    socket.emit('get_online', id)

    socket.on('receive_message', m => setMessages(s => [...s, m]))
    socket.on('user_typing', (u) => setTypingUsers(prev => ({ ...prev, [u.id]: u })))
    socket.on('user_stop_typing', (u) => setTypingUsers(prev => { const c = { ...prev }; delete c[u.id]; return c }))
    socket.on('online_users', list => setOnline(list))

    // load resources & polls
    axios.get('http://localhost:5000/resources').then(r=>setFiles(r.data)).catch(()=>{})
    axios.get('http://localhost:5000/polls/'+id).then(r=>setPolls(r.data)).catch(()=>{})

    return ()=> {
      socket.off('receive_message')
      socket.off('user_typing')
      socket.off('user_stop_typing')
      socket.off('online_users')
    }
  },[id])

  const sendMessage = () => {
    if (!text.trim()) return
    const msg = { roomId: id, text, timestamp: Date.now(), user: { name: meRef.current.name, id: meRef.current.id } }
    socket.emit('send_message', msg)
    setMessages(s => [...s, msg])
    setText('')
    socket.emit('stop_typing', meRef.current)
  }

  let typingTimeout = null
  const onTyping = (v) => {
    setText(v)
    socket.emit('typing', meRef.current)
    clearTimeout(typingTimeout)
    typingTimeout = setTimeout(()=> socket.emit('stop_typing', meRef.current), 800)
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <Topbar title='Room' />
      <div className='flex flex-1'>
        <div className='w-3/4 p-6'>
          <div className='bg-white dark:bg-slate-800 p-4 rounded shadow h-[55vh] overflow-y-auto mb-4'>
            {messages.map((m,i)=>(
              <ChatBubble key={i} message={m} mine={m.user?.id === meRef.current.id} />
            ))}

            {Object.keys(typingUsers).length > 0 && (
              <div className='text-sm text-gray-500 mt-2'>{Object.values(typingUsers).map(u=>u.name).join(', ')} typing...</div>
            )}
          </div>

          <div className='flex gap-2'>
            <input value={text} onChange={e=>onTyping(e.target.value)} className='flex-1 p-3 border rounded' placeholder='Type a message...' />
            <button onClick={sendMessage} className='px-4 py-2 bg-primary text-white rounded'>Send</button>
          </div>

          <div className='mt-6'>
            <h3 className='text-lg font-semibold mb-3'>Resources</h3>
            <FileGrid files={files} />
          </div>
        </div>

        <aside className='w-1/4 p-6 border-l bg-gray-50 dark:bg-slate-900'>
          <div className='mb-4'>
            <h4 className='font-semibold'>Online</h4>
            <div className='space-y-2 mt-2'>
              {online.map(u=> <div key={u.id} className='flex items-center gap-2'><div className='w-2 h-2 bg-green-400 rounded-full'></div><div className='text-sm'>{u.name}</div></div>)}
            </div>
          </div>

          <div className='mb-4'>
            <h4 className='font-semibold'>Polls</h4>
            <Polls polls={polls} />
          </div>
        </aside>
      </div>
    </div>
  )
}
