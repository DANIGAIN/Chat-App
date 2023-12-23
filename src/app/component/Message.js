import React from 'react'


function Message({ user, data }) {

  return (
    <>
      {user.uid === data.rid? <div className={`message mb-4 flex`}>
        <div className="flex-2 ">
          <div className="w-12 h-12 relative">
            <img
              className="w-12 h-12 rounded-full mx-auto"
              src={data.img}
              alt="chat-user"
            />
            <span className="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white" />
          </div>
        </div>
        <div className="flex-1 px-2">
          <div className="inline-block bg-gray-300 rounded-full p-2 px-6 text-gray-700">
            <span>
              {data.text}
            </span>
          </div>
          <div className="pl-4">
            <small className="text-gray-500">{new Date(data.createdAt.seconds).getHours() + ':' + new Date(data.createdAt.seconds).getMinutes() + ':' + new Date(data.createdAt.seconds).getSeconds()}</small>
          </div>
        </div>
      </div>
        : ''
      }
      {user.uid === data.uid? <div className="message me mb-4 flex text-right">
        <div className="flex-1 px-2">
          <div className="inline-block bg-blue-600 rounded-full p-2 px-6 text-white">
            <span>{data.text}</span>
          </div>
          <div className="pr-4">
            <small className="text-gray-500">{new Date(data.createdAt.seconds).getHours() + ':' + new Date(data.createdAt.seconds).getMinutes() + ':' + new Date(data.createdAt.seconds).getSeconds()}</small>
          </div>
        </div>
      </div> : ''}

    </>
  )
}

export default Message