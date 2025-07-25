"use client";

import React, { useEffect, useState } from 'react'
import { TypeOf, z, ZodError } from "zod";
import axios from "axios";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const signUpFormSchema = z
    .object({
        nama: z.string(),
        email: z.email({ message: "Masukkan email yang valid" }),
        password: z.string().min(8, "Password minimal terdiri dari 8 karakter."),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password tidak sesuai",
        path: ["confirmPassword"]
    })

    type SignUpSchema = z.infer<typeof signUpFormSchema>

const page = () => {
  const router = useRouter();
  const [nama, setNama] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [restricted, isRestricted] = useState<boolean>(true)
  const [errors, setErrors] = useState<{ [key: string]: string} >({})

  const SignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:4000/auth/register", { nama, email, password, fotoProfil: "/profil.png" })
      console.log("Berhasil")
      router.push("/")
    } catch (err) {
      alert("Gagal registrasi")
      console.log(err)
    }
  }

  

  useEffect(() => {
    const result = signUpFormSchema.safeParse({ nama, email, password, confirmPassword })

    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      const error = result.error;

      error.issues.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
      });

      setErrors(fieldErrors);
      isRestricted(true)
      return;
    }
    isRestricted(false)
    setErrors({})
  }, [nama, email, password, confirmPassword])
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

          <form onSubmit={SignUp} className='flex flex-col items-center gap-8'>
            <div className='flex flex-col items-center gap-4'>
              <input 
                type="text" 
                placeholder='Nama' 
                onChange={(e) => setNama(e.target.value)}
                className='bg-primary-50 border-2 border-neutral-gray w-71 h-10 rounded-[8px] p-2'
              />
              <input 
                type="text" 
                placeholder='Email' 
                onChange={(e) => setEmail(e.target.value)}
                className='bg-primary-50 border-2 border-neutral-gray w-71 h-10 rounded-[8px] p-2'  
              />
              {errors.email && email != '' && (
                <p className='text-red-500'>{errors.email}</p>
              )}
              <input 
                type="password" 
                placeholder='Password' 
                onChange={(e) => setPassword(e.target.value)}
                className='bg-primary-50 border-2 border-neutral-gray w-71 h-10 rounded-[8px] p-2'  
              />
              {errors.password && password != '' && (
                <p className ='text-red-500'>{errors.password}</p>
              )}
              <input 
                type="password" 
                placeholder='Confirm Password' 
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='bg-primary-50 border-2 border-neutral-gray w-71 h-10 rounded-[8px] p-2'
              />
              {errors.confirmPassword && confirmPassword != '' && (
                <p className ='text-red-500'>{errors.confirmPassword}</p>
              )}
            </div>
            

            <div className='flex flex-col items-center gap-3'>
              <Button type='submit' className='bg-tertiary-100 border-2 border-tertiary-500 text-[#5D5500] text-md'>
                Sign Up
              </Button>
            </div>

            
            
          </form>
        </div>
      </div>
    )
}

export default page