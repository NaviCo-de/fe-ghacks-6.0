"use client";


import React, { useState } from 'react'
import axios from 'axios';
const page = () => {
    const [file, setFile] = useState<File | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    const handleUpload = async () => {
        if (!file) {
            return
        }

        const formData = new FormData()
        formData.append("file", file)

        const res = await axios.post("http://localhost:4000/ai/predict-image", formData )
        const data = await res.data;
        console.log("Upload Response", data.result)
    }

  return (
    <div>
      <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {file && file.type.startsWith("image/") && (
            <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-48 h-48 object-cover"
            />
        )}

        {file && file.type.startsWith("video/") && (
            <video
                controls
                className="w-48 h-48"
                src={URL.createObjectURL(file)}
            />
        )}
    </div>
  )
}

export default page