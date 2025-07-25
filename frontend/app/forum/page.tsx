"use client";

import React, { useEffect } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useUser } from '@/context/UserContext';
import Image from 'next/image';
import { date } from 'zod';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"

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

    const handlePost = async (e: React.FormEvent) => {
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
    <div className='my-15 bg-[url(/bg-image.png)] bg-repeat bg-contain bg-center'>
        <div className='flex justify-center gap-3'>
            <div className='bg-secondary-50 border-neutral-gray border-1 rounded-[8px] max-h-[400px] w-50 px-5 py-3'>
                <div className='flex gap-2'>
                    <Image src="/filter.png" alt='filter' width={30} height={30}/>
                    <p>Filter By</p>
                </div>
                <div>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className='no-underline'>Time</AccordionTrigger>
                            <AccordionContent>
                                <div className='flex gap-2'>
                                    <Checkbox className='border-tertiary-500 border-2' />
                                    <p>Oldest</p>
                                </div>

                                <div className='flex gap-2'>
                                    <Checkbox className='border-tertiary-500 border-2' />
                                    <p>Latest</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value='item-2'>
                            <AccordionTrigger className='no-underline'>Engagement</AccordionTrigger>
                            <AccordionContent>
                                <div className='flex gap-2'>
                                    <Checkbox className='border-tertiary-500 border-2' />
                                    <p>Most Replied</p>
                                </div>

                                <div className='flex gap-2'>
                                    <Checkbox className='border-tertiary-500 border-2' />
                                    <p>Most Viewed</p>
                                </div>

                                <div className='flex gap-2'>
                                    <Checkbox className='border-tertiary-500 border-2' />
                                    <p>Most Liked</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value='item-3'>
                            <AccordionTrigger className='no-underline'>Dance Origin</AccordionTrigger>    
                        </AccordionItem>
                        
                    </Accordion>
                </div>
            </div>

            <div className='flex flex-col gap-5'>
                
                <form className='flex flex-col items-end gap-3 w-200 px-7 py-5 bg-secondary-50 border-neutral-gray border-1 rounded-[8px]' onSubmit={handlePost}>
                    <div className='flex justify-center items-center gap-5 w-full'>
                        <Image src={user?.fotoProfil || "/profil.png"} alt='foto-profil' width={55} height={55}/>
                        <input 
                            type="text" 
                            placeholder='Enter your message'
                            className='bg-primary-50 border-neutral-gray border-1 rounded-[8px] h-12 px-5 w-full'
                            onChange={(e) => setPost(e.target.value)}
                        />
                    </div>
                    <Button type='submit' className='bg-tertiary-100 border-tertiary-500 border-2 rounded-[8px] text-[#5D5500] w-30'>
                        <Image src="/post.png" alt='post' width={20} height={20}/>
                        <p className='text-[#5D5500]'>Post</p>
                    </Button>
                </form>
            

                
                {collection.length === 0 && (
                    <div className='flex justify-center bg-secondary-50 border-neutral-gray border-1 rounded-[8px] w-200 px-7 py-5'>
                        <p>Belum ada postingan</p>
                    </div>
                )}
                {collection.map((item) => (
                    <div className='bg-secondary-50 border-neutral-gray border-1 rounded-[8px] w-200 px-7 py-5 flex flex-col justify-center items-start gap-3' key={item.id}>
                        <div className='flex items-center gap-2'>
                            <Image src={user?.fotoProfil || "/profil.png"} alt='foto-profil' width={55} height={55}/>
                            <div className='flex flex-col gap-1'>
                                <p>{item.writer?.nama}</p>
                                <p>
                                    {new Date(item.tanggalDibuat).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric"
                                    })}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p>{item.post}</p>
                        </div>
                    </div>
                ))}
                
            </div>

        </div>

    </div>

  )
}

export default page