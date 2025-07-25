"use client";

import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

type User = {
  id: UUID;
  nama: string;
  email: string;
};

const IMAGE = [
  "/tortor.png",
  "/jaipong.png",
  "/kecak.png",
  "/jaipong1.png",
];

export default function Home() {
  const router = useRouter();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = () => router.push("/login");
  const handleSignUp = () => router.push("/signup");
  const handleForum = () => router.push("/forum");
  const handleLogOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  return (
    <div className="overflow-hidden">
      {/* Carousel */}
      <div className="flex justify-center">
        <Carousel
          className="w-full h-fit"
          setApi={setApi}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
            }),
          ]}
        >
          <CarouselContent>
            {IMAGE.map((img, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex items-center justify-center p-0 h-80 bg-primary-50">
                      <div className="relative w-full h-80">
                        <Image
                          src={img}
                          alt={`Dance ${index + 1}`}
                          fill
                          className="object-contain rounded-md"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-5" />
          <CarouselNext className="absolute right-5" />
        </Carousel>
      </div>

      {/* Cool Pagination */}
      <div className="flex flex-col items-center mt-6 gap-3">
        <div className="flex gap-3">
          {Array.from({ length: count }).map((_, index) => {
            const isActive = current === index + 1;
            return (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`px-3 py-1 text-sm rounded-lg border transition-all duration-300 ${
                  isActive
                    ? "bg-primary-500 text-white border-primary-500 scale-110 shadow-lg"
                    : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
        <div className="relative w-40 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-1 bg-primary-500 transition-all duration-500 ease-in-out"
            style={{ width: `${(current / count) * 100}%` }}
          />
        </div>
      </div>

      {/* Zig-Zag Banner Sections */}
      <section className="bg-secondary-50 py-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 px-5">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-4 text-text-default">
              Join the Dance Forum
            </h2>
            <p className="mb-6 text-gray-600">
              Share experiences, learn from others, and discuss Indonesian
              traditional dances with our vibrant community.
            </p>
            <Link href="/forum">
              <button className="bg-primary-500 text-white px-6 py-2 rounded-lg shadow hover:bg-primary-600 transition">
                Go to Forum
              </button>
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/forum.png"
              alt="Forum"
              width={500}
              height={300}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-secondary-50 py-20">
        <div className="container mx-auto flex flex-col md:flex-row-reverse items-center gap-10 px-5">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-4 text-text-default">
              Try Our AI Dance Detector
            </h2>
            <p className="mb-6 text-gray-600">
              Upload your dance image or video, and let our AI recognize the
              traditional Indonesian dance for you!
            </p>
            <Link href="/ai-feature">
              <button className="bg-primary-500 text-white px-6 py-2 rounded-lg shadow hover:bg-primary-600 transition">
                Try AI Feature
              </button>
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/ai.png"
              alt="AI Feature"
              width={500}
              height={300}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-secondary-50 py-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 px-5">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-4 text-text-default">
              Find Nearest Sanggar Tari
            </h2>
            <p className="mb-6 text-gray-600">
              Explore nearby sanggar tari in your city, discover classes, and
              book your next dance session easily.
            </p>
            <Link href="/sanggar-tari">
              <button className="bg-primary-500 text-white px-6 py-2 rounded-lg shadow hover:bg-primary-600 transition">
                Find Sanggar Tari
              </button>
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/foto3.png"
              alt="Sanggar Tari"
              width={500}
              height={300}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
