import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function Room() {
  const { id } = useParams();
  const [msg,setMsg]=useState('');
  const [chat,setChat]=useState([]);

  useEffect(()=>{
    socket.emit('join_room',id);

    socket.on('receive_message',(data)=>{
      setChat(prev=>[...prev,data]);
    });
  },[]);

  const send = ()=>{
    socket.emit('send_message',{ room:id, text:msg });
    setChat(prev=>[...prev,{ text:msg, self:true }]);
    setMsg('');
  };

  return (
    <div className='flex h-screen'>

      {/* Sidebar */}
      <div className='w-60 bg-gray-800 text-white p-4'>
        <h2 className='text-xl font-bold mb-4'>Members</h2>
        <p>Coming soon...</p>
      </div>

      {/* Chat */}
      <div className='flex-1 flex flex-col'>
        
        <div className='flex-1 p-4 overflow-auto space-y-3'>
          {chat.map((c,i)=>(
            <div key={i}
              className={ c.self ? 'text-right' : 'text-left' }>
              <span className='inline-block bg-white p-2 rounded shadow'>
                {c.text}
              </span>
            </div>
          ))}
        </div>

        <div className='p-4 flex gap-2'>
          <input className='flex-1 p-3 border rounded'
            value={msg} onChange={e=>setMsg(e.target.value)} />

          <button onClick={send}
            className='bg-primary text-white px-4 rounded'>
            Send
          </button>
        </div>

      </div>
    </div>
  );
}
