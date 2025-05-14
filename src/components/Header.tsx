'use client'
import React from 'react';
import Image from "next/image";
import Authentication from './auth/Authentication';
import Link from 'next/link';
import { useAuth } from '../utils/contexts/AuthContext';

const Header = () => {
  const {isAuthenticated} = useAuth();
  return (
    <header className="flex py-3">
      <div className="flex basis-50  gap-2 content-center">
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="h-8 w-8"
        />
        <span className="font-bold text-lg  content-center">
          Promptopia
        </span>
      </div>

      <div className="flex flex-grow justify-center">
        {/* Empty incase i want to add something here later */}
      </div>

      <div className="basis-75 flex gap-2 justify-end ">
        {isAuthenticated &&
          <Link
            className='bg-white text-black py-2 px-3 rounded-full shadow-xl shadow-white/10'
            href='/create-prompt'
          >
            Create Prompt
          </Link>
        }
        <Authentication />
      </div>
    </header>
  )
}

export default Header