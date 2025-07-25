"use client";

import React from 'react'
import Image from "next/image";
import { UUID } from "crypto";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
type User = {
  id: UUID,
  nama: string,
  email: string
}



const Navbar = () => {
    const router = useRouter()
    const { user, setUser } = useUser()

    const handleLogOut = () => {
        localStorage.removeItem("token")
        setUser(null)
        router.push("/")
    }

    
  return (
    <div>
        <nav className="flex justify-between items-center w-full bg-primary-50 px-20 py-2 shadow-lg">
          <Image src="/Logo.png" alt="Logo" width={62} height={62}/>

          
            {user ? (
                <div className="flex justify-between gap-10 items-center">
                    <Link href="/about" className="no-underline text-text-default">About</Link>
                    <Link href="/explore" className="no-underline text-text-default">Explore</Link>
                    <Link href="/forum" className="no-underline text-text-default">Forum</Link>
                    <h1 className='text-text-default'>Hello {user.nama}</h1>
                    <Button 
                        className='border-primary-500 border-2 rounded-[8px] text-text-default bg-transparent'
                        onClick={handleLogOut}    
                    >
                        <Image src="/log_out.png" width={10} height={10} alt='log_ou'/>
                    </Button>
                </div>
            )

            : (
                <Button 
                className="border-primary-500 border-2 rounded-[8px] text-text-default bg-transparent 
                hover:scale-115 transition-all ease-in-out duration-200"
                >
                    <Link href="/login" className="no-underline text-text-default">
                    Log In
                    </Link>
                </Button>
            )}
            
          
        </nav>
    </div>
  )
}

export default Navbar