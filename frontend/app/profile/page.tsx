"use client";

import React from "react";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const page = () => {
  const { user } = useUser();
  const router = useRouter();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-600 text-lg mb-4">You are not logged in.</p>
        <Button onClick={() => router.push("/login")}>Go to Login</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <div className="flex flex-col items-center">
          {/* Profile Picture */}
          <Image
            src={user.fotoProfil || "/profil.png"}
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full border-2 border-primary-500"
          />
          <h1 className="text-xl font-semibold mt-4">{user.nama}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>

        {/* User Info */}
        <div className="mt-6">
          <h2 className="text-lg font-medium mb-2">Account Information</h2>
          <div className="bg-gray-100 p-4 rounded-md space-y-2">
            <p>
              <span className="font-medium">Name:</span> {user.nama}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
            {/* Add more details if needed */}
          </div>
        </div>

        {/* Edit Profile / Log Out */}
        <div className="flex justify-between mt-6">
          <Button onClick={() => router.push("/edit-profile")} className="bg-blue-500 text-white">
            Edit Profile
          </Button>
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/");
            }}
            className="bg-red-500 text-white"
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
