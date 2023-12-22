"use client"
import React, { useEffect, useRef, useState } from 'react'
import { serverTimestamp, Timestamp } from 'firebase/firestore'
import { redirect } from 'next/navigation'
import { UserAuth } from '@/context/AuthContext'
import axios from 'axios';
import Message from '../component/Message'
import {getDatabase, onValue, ref} from 'firebase/database'

function page() {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const { user, isLoading } = UserAuth()
  const  messageEndRef = useRef();
  const db = getDatabase()
      
  if (!user && !isLoading) redirect('/')
  const handelSubmit = async (e) => {
    if (!value) return;
    const { uid, displayName, photoURL } = user;
    const obj = {
      uid,
      displayName,
      img: photoURL,
      text: value,
      createdAt: Timestamp.now(),
    }

    const res = await axios.post(`${process.env.NEXT_PUBLIC_FIREBASE_BASE_URL}/messages.json`, obj, {
      headers: {
        ContentType: 'application/json'
      }
    })
    if (res.data.name) {
      setValue('')
    }

  }
  const scrolltoButtom = () =>{
    messageEndRef.current.scrollIntoView({behavios:'smooth'})
  }
  useEffect(()=>scrolltoButtom,[messages])

  useEffect(() => {
    const messageRef = ref(db,'messages')
    const getMessage = onValue(messageRef ,(snaphort)=>{
           const data = snaphort.val()
           const m = [];
           for(const i  in data){
               m.push({...data[i] ,id: i})
           }
           setMessages(m)
          })
    return () => getMessage()
  }, [])

  return (
    <>
      <div >
        <div className="chat-area flex-1 flex flex-col">
          <div className="flex-3">
            <h2 className="text-xl py-1 mb-8 border-b-2 border-gray-200">
              Chatting with <b>Mercedes Yemelyan</b>
            </h2>
          </div>
          <div className="messages flex-1 overflow-auto">
            { user &&  messages.map((data) => (
              <Message key={data.id} data={data} user={user} />
            ))}
            <div ref={messageEndRef} className='py-8'></div>
          </div>
          
        </div>
      </div>
      <div
        className="fixed w-full flex justify-between bg-green-100"
        style={{ bottom: 0 }}
      >

        <input
          className="flex-grow m-2 py-2 px-4 mr-1 rounded-full border border-gray-300 bg-gray-200 resize-none text-black"
          rows={1}
          placeholder="Message..."
          style={{ outline: "none", }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="m-2" style={{ outline: "none" }}>
          <svg
            className="svg-inline--fa text-green-400 fa-paper-plane fa-w-16 w-12 h-12 py-2 mr-2"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="paper-plane"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            onClick={handelSubmit}
          >
            <path
              fill="currentColor"
              d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
            />
          </svg>
        </button>
      </div>
    </>



  )
}

export default page