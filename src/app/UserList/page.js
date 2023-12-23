"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useRouter} from 'next/navigation'

function page() {
    const [users, setUser] = useState([]);
    const router = useRouter();
    const getUsers = async()=>{
        const res = await axios.get(`${process.env.NEXT_PUBLIC_FIREBASE_BASE_URL}/users.json`);
        const u = res.data;
        const a = [] ;
        for(const i in u){
           a.push(u[i]);
        }
        setUser(a);
    }
    const handelClick = async(id)=>{
       router.push('/chat'+`?id=${id}`)       
    }
    useEffect(() => {
       getUsers()
    }, [])
    return (
        <>
            {/* component */}
            <div className="text-gray-900 bg-gray-200">
                <div className="p-4 flex">
                    <h1 className="text-3xl">Users</h1>
                </div>
                <div className="px-3 py-4 flex justify-center">
                    <table className="w-full text-md bg-white shadow-md rounded mb-4">
                        <tbody>
                            <tr className="border-b">
                                <th className="text-left p-3 px-5">Name</th>
                                <th className="text-left p-3 px-5">Email</th>

                                <th className="text-left p-3 px-5 ">statue</th>
                                <th className="text-left p-3 px-5  flex justify-end">Action</th>

                            </tr>
                            {users.map((user ,ind) => (
                                <tr key={ind} className="border-b hover:bg-orange-100 bg-gray-100">
                                    <td className="p-3 px-5">
                                        <p>{user.displayName}</p>
                                    </td>
                                    <td className="p-3 px-5">
                                        <p>{user.email}</p>
                                    </td>
                                    <td className="p-3 px-5">
                                        <p> jhyvhgd</p>
                                    </td>
                                    <td className="p-3 px-5 flex justify-end">
                                        <button
                                            type="button"
                                            className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                            onClick={() =>handelClick(user.uid)}
                                        >
                                            chat
                                        </button>

                                    </td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>
            </div>
        </>

    )
}

export default page