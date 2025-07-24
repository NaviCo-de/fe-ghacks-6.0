import React from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const page = () => {
    const [post, setPost] = useState<string>('')

    const handlePost = async () => {
        try {
            const res = await axios.post("http://localhost:4000/post/forum", { post })
        } catch (err) {
            console.log(err)
        }
    }
  return (
    <div>
        <input type='text' placeholder='Post' onChange={(e) => setPost(e.target.value)} />
        <Button onClick={handlePost}>Post</Button>
    </div>
  )
}

export default page