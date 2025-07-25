"use client";

import React, { createContext, useState, useEffect, useContext } from 'react'
import { jwtDecode } from "jwt-decode";
import { UUID } from 'crypto';

type User = {
    id: UUID;
    nama: string;
    email: string
};

type UserContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            try {
                const decoded = jwtDecode<User>(token)
                setUser(decoded)
            } catch (err) {
                console.error("Invalid token!", err)
                setUser(null)
            }
        }
    }, [])

    return (
       <UserContext.Provider value={{ user, setUser }}>
        {children}
       </UserContext.Provider>
    )
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};