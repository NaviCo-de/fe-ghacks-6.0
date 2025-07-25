"use client";

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

const Navbar = () => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div>
      <nav className="flex justify-between items-center w-full bg-primary-50 px-20 py-2 shadow-lg">
        {/* Logo */}
        <Image src="/Logo.png" alt="Logo" width={62} height={62} />

        {user ? (
          <div className="flex justify-between gap-10 items-center relative">
            
            <Link
              href="/class"
              className="relative text-text-default no-underline 
                        after:content-[''] after:absolute after:left-0 after:-bottom-1
                        after:h-[2px] after:w-0 after:bg-current
                        after:transition-all after:duration-300 hover:after:w-full font-lora"
            >
              Class
            </Link>

            <Link
              href="/ai-feature"
              className="relative text-text-default no-underline 
                        after:content-[''] after:absolute after:left-0 after:-bottom-1
                        after:h-[2px] after:w-0 after:bg-current
                        after:transition-all after:duration-300 hover:after:w-full font-lora"
            >
              Explore
            </Link>

            <Link
              href="/forum"
              className="relative text-text-default no-underline 
                        after:content-[''] after:absolute after:left-0 after:-bottom-1
                        after:h-[2px] after:w-0 after:bg-current
                        after:transition-all after:duration-300 hover:after:w-full font-lora"
            >
              Forum
            </Link>

            

            
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-primary-50 bg-primary-500 w-20 h-10 rounded-[8px] font-lora"
              >
                Hello {user.nama}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Button
            className="border-primary-500 border-2 rounded-[8px] text-text-default bg-transparent 
                       hover:scale-115 transition-all ease-in-out duration-200"
          >
            <Link href="/login" className="no-underline text-text-default">
              Log In
            </Link>
          </Button>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
