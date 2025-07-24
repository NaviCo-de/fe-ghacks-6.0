"use client";

import { UUID } from "crypto";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

type User = {
  id: UUID,
  nama: string,
  email: string
}

const placeholder = [
  "TARI JAIPONG",
  "TARI SAMAN",
  "TARI KECAK",
  "TARI TOR TOR"
]
export default function Home() {
  const router = useRouter()
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [user, setUser] = useState<User | null>(null)


  const handleLogin = () => {
    router.push("/login")
  }

  const handleSignUp = () => {
    router.push("/signup")
  }

  const handleForum = () => {
    router.push("/forum")
  }

  const handleLogOut = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUser(user); // Store in state
    }
  }, []);

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])


  return (
    <div className="overflow-hidden">
      
      <div className="flex justify-center">
        <Carousel
          className="w-full h-fit"
          setApi={setApi}
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex items-center justify-center h-60 p-6">
                      <span className="text-lg font-semibold">{index + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-5"/>
          <CarouselNext className="absolute right-5"/>
        </Carousel>
      </div>
      <div className="flex justify-center mt-4 gap-2">

      {Array.from({ length: count }).map((_, index) => {
        const isActive = current === index + 1;
        return (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-3 rounded-full transition-all duration-300 ease-in-out ${
              isActive ? 'bg-gray-800 w-10' : 'bg-gray-300 w-3'
            }`}
          />
        );
      })}
  </div>
    </div>
  );
}
