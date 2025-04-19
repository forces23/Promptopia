'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Session } from "@node_modules/next-auth";
import { signIn, signOut } from "@node_modules/next-auth/react";
import LoginModal from "./LoginModal";

interface NavProps {
  session: Session | null;
}

const Nav = ({ session }: NavProps) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleSignOut = () => signOut({redirectTo: '/',});
  // const handleLogin = () => signIn('github');


  const renderLoginModal = () => {
    return (
      // <div className="modal">
      //   <h2>Login</h2>
      //   <p>Please login to access this feature.</p>
      //   <button onClick={handleLogin}>Login with GitHub</button>
      // </div>
      <LoginModal open={showLogin} setOpen={setShowLogin}/>
    );
  };

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={`/`} className="flex gap-2 flex-center">
        <Image
          src='/assets/images/logo.svg'
          alt='Promptoptia logo'
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={`/create-prompt`}
              className="black_btn">
              Create Post
            </Link>
            
            <button type="submit" className="black_btn" onClick={() => handleSignOut()}>
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session.user?.image || 'assets/images/logo.svg'}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            <button type="button" className="black_btn" onClick={() => setShowLogin(prev => !prev)}>
              Sign In
            </button>
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session ? (
          <div className="flex">
            <Image
              src={session.user?.image || 'assets/images/logo.svg'}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => { setToggleDropdown((prev) => !prev) }}
            />

            {toggleDropdown && (
              <>
                <div className="dropdown">
                  <Link
                    href={`/profile`}
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href={`/create-prompt`}
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Prompt
                  </Link>
                  <Link
                    href={`/profile`}
                    className="mt-5 w-full black_btn"
                    onClick={() => {
                      setToggleDropdown(false);
                      handleSignOut();
                    }}
                  >
                    Sign Out
                  </Link>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <button type="button" className="black_btn" onClick={() => setShowLogin(prev => !prev)}>
              Sign In
            </button>
          </>
        )}
      </div>

      {renderLoginModal()}

    </nav>
  )
}

export default Nav