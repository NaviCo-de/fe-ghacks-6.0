"use client";

import React, { useEffect, useState } from 'react'
import { TypeOf, z, ZodError } from "zod";
import axios from "axios";
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('');

  const Login = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:4000/auth/login", { email, password })
      setError('')
      router.push("/")
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        const errorMessage = err.response.data.message;
        setError(errorMessage)
      }
    }
  }

  return (
    <div>
        <form onSubmit={Login}>
          <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
          <button type='submit'>Submit</button>
          {error != '' && (
            <p className='text-red-500'>{error}</p>
          )}
        </form>
    </div>
  )
}

export default page