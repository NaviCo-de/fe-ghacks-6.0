"use client";


import React, { useState } from 'react'
import axios from 'axios';
import Image from 'next/image';
const page = () => {
    const [file, setFile] = useState<File | null>(null)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!file) {
            return
        }

        const formData = new FormData()
        formData.append("file", file)

        const res = await axios.post("http://localhost:4000/ai/predict-image", formData )
        const data = await res.data;
        return data.result;
    }

  return (
    <div>
        <form onSubmit={handleUpload} className='flex flex-col justify-center items-center gap-12'>
            <h1 className='text-primary-500'>Find your desirable Indonesian tradisional dance</h1>
            <input 
                type="file" 
                accept="image/*,video/*" 
                onChange={handleFileChange} 
                className='hidden' 
                id='file-upload' 
            
            />
            <label htmlFor="file-upload" className='flex justify-center'>
                {!file && (
                    <div className='bg-secondary-50 rounded-[8px] border-neutral-gray border-1 w-239 h-119 flex justify-center items-center'>
                        <div className='border-dashed bg-transparent rounded-[8px] border-neutral-gray border-1 w-186 h-93 flex flex-col gap-20 justify-center items-center'>
                            <Image src="/upload.png" alt='upload' width={125} height={125}/>
                            <h1>Drag or Upload Your File Here</h1>
                        </div>
                    </div>
                )}

                {file && file.type.startsWith("image/") && (
                    <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="w-239 h-119 rounded-[8px]"
                    />
                )}

                {file && file.type.startsWith("video/") && (
                    <video
                        controls
                        className="w-239 h-119 rounded-[8px]"
                        src={URL.createObjectURL(file)}
                    />
                )}
            </label>
            <button type='submit' className='bg-tertiary-100 border-tertiary-500 border-2 text-[#5D5500] w-30 h-10 rounded-[8px]'>Find!</button>
        </form>
        
        
    </div>
  )
}

export default page