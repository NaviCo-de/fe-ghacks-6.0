"use client";

import React, { useEffect, useState } from 'react'
import { TypeOf, z, ZodError } from "zod";
import axios from "axios";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';

const page = () => {
  const router = useRouter();
  
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('');

  const { setUser } = useUser()

  const Login = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:4000/auth/login", { email, password })
      setError('')
      const token = res.data.access_token
      const user = res.data.user

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user)

      router.push("/")
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        const errorMessage = err.response.data.message;
        setError(errorMessage)
      }
    }
  }

  return (
    <div className='flex justify-center bg-[url(/bg-image.png)] bg-repeat bg-contain bg-center'>
      <div className='flex flex-col justify-center items-center gap-20 bg-secondary-50 w-200 h-159 my-10'>
        <div className='flex items-center'>
          <Image src="/Logo_nama.png" alt="Logo_nama" width={120} height={120}/>
          <div>
            <p>Dari seniman untuk rakyat,</p>
            <p>Menarilah bersama dengan <span>Juita</span></p>
          </div>
        </div>

        <form onSubmit={Login} className='flex flex-col items-center gap-8'>
          <div className='flex flex-col items-center gap-4'>
            <input 
              type="text" 
              placeholder='Email' 
              onChange={(e) => setEmail(e.target.value)}
              className='bg-primary-50 border-2 border-neutral-gray w-71 h-10 rounded-[8px] p-2'  
            />
            <input 
              type="password" 
              placeholder='Password' 
              onChange={(e) => setPassword(e.target.value)}
              className='bg-primary-50 border-2 border-neutral-gray w-71 h-10 rounded-[8px] p-2'  
            />
          </div>
          {error != '' && (
            <p className='text-red-500'>{error}</p>
          )}

          <div className='flex flex-col items-center gap-3'>
            <Button type='submit' className='bg-tertiary-100 border-2 border-tertiary-500 text-[#5D5500] text-md'>
              Login
            </Button>
            <Link href="/forgot-password" className='text-[#5D5500] underline'>Forgot your password?</Link>
          </div>

          
          
        </form>

        <p>
            Not yet join us? <Link href="/signup" className='text-[#5D5500] underline'>Sign up</Link>
          </p>
      </div>
    </div>
  )
}

export default page