"use client";

import React, { useEffect, useState } from 'react'
import { TypeOf, z, ZodError } from "zod";
import axios from "axios";
import { useRouter } from 'next/navigation';

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
      const res = await axios.post("http://localhost:4000/auth/register", { nama, email, password })
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
  })
  return (
    <div>
        <form onSubmit={SignUp}>
          <input type="text" placeholder='Nama' onChange={(e) => setNama(e.target.value)}/>
          <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
          {errors.email && email != '' && (
            <p className='text-red-500'>{errors.email}</p>
          )}
          <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
          {errors.password && password != '' && (
            <p className='text-red-500'>{errors.password}</p>
          )}
          <input type="password" placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)}/>
          {errors.confirmPassword && confirmPassword != '' && (
            <p className='text-red-500'>{errors.confirmPassword}</p>
          )}
          <button type='submit' disabled={restricted}>Submit</button>
        </form>
    </div>
  )
}

export default page