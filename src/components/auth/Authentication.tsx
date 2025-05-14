'use client'
import { fetchAuthSession, getCurrentUser, signOut } from 'aws-amplify/auth';
import React, { useEffect, useState } from 'react'
import Login from './Login';
import { useAuth } from '@/src/utils/contexts/AuthContext';

const Authentication = () => {
    const { status, setStatus, isAuthenticated, setIsAuthenticated, session, setSession} = useAuth();
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    const handleSignOut = async () => {
        try {
            setStatus('Signing out...');
            await signOut();
            setStatus('Signed out successfully');
            setSession(null);
            setIsAuthenticated(false);
        } catch (error: any) {
            setStatus(`Sign out error: ${error.message}`);
            console.error('Sign out error:', error);
        }
    };

    if (isAuthenticated) {
        console.log('Status:', status);
        console.log('Authenticated:', isAuthenticated);
        console.log('Session:', session);
    }
    

    return (
        <div>
            {isAuthenticated ? (
                <>
                    <button
                        onClick={handleSignOut}
                        className='bg-white text-black py-2 px-3 rounded-full shadow-xl shadow-white/10'
                    >
                        Sign Out
                    </button>
                </>
            ) : (
                <>
                    <button
                        type='button'
                        onClick={() => setIsAuthOpen(true)}
                        className='bg-white text-black py-2 px-3 rounded-full shadow-xl shadow-white/10'
                    >
                        Login
                    </button>
                </>
            )}

            {isAuthOpen && (
                <Login
                    isAuthOpen={isAuthOpen}
                    setIsAuthOpen={setIsAuthOpen}
                />)
            }
        </div>
    )
}

export default Authentication