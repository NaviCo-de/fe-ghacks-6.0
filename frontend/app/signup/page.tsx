import React from 'react'
import { z } from "zod";
import axios from "axios";

const signUpFormScheme = z
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


const page = () => {
  return (
    <div>
        <form action="">

        </form>
    </div>
  )
}

export default page