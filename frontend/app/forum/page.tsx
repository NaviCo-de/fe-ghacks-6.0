"use client";

import React, { useEffect } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useUser } from '@/context/UserContext';

type ForumPost = {
    id: string,
    post: string,
    writer?: {
        id: string,
        nama: string,
        email: string,
    } | null,
    tanggalDibuat: string
}



const page = () => {
    const [post, setPost] = useState<string>('')
    const [collection, setCollection] = useState<ForumPost[]>([])
    const { user } = useUser()

    const handlePost = async () => {
        if (!user) {
            alert("You must be login first!")
            return
        }
        try {
            const token = localStorage.getItem("token")
            const res = await axios.post("http://localhost:4000/forum/post", { post }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get("http://localhost:4000/forum/main")
                setCollection(res.data)
            } catch (err) {
                console.error("Failed to fetch posts: ", err)
            }
        }
        fetchPosts();
    })
  return (
    <div>
        <input type='text' placeholder='Post' onChange={(e) => setPost(e.target.value)} />
        <Button onClick={handlePost}>Post</Button>

        <div>
            {collection.length === 0 && (
                <div>
                    <p>Belum ada postingan</p>
                </div>
            )}
            {collection.map((item) => (
                <div className='border p-3 rounded shadow-sm' key={item.id}>
                    {item.writer && item.tanggalDibuat && (
                        <div>
                            <p>
                                {item.writer.nama}
                            </p>
                            <p>
                                {new Date(item.tanggalDibuat).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric"
                                })}
                            </p>
                        </div>
                        
                    )}
                    <p className='text-gray-800'>
                        {item.post}
                    </p>
                </div>
            ))}
        </div>
    </div>

  )
}

export default page