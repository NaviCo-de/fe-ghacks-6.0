"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  const handleLogin = () => {
    router.push("/login")
  }

  const handleSignUp = () => {
    router.push("/signup")
  }

  return (
    <div className="">
      <nav className="flex justify-between mx-30 my-10">

        <button className="w-30" onClick={handleLogin}>
          <div className="border-red-600 border-4">
            Log in
          </div>
        </button>
        
        <button className="w-30" onClick={handleSignUp}>
          <div className="border-red-600 border-4">
            Sign Up
          </div>
        </button>

      </nav>
    </div>
  );
}
