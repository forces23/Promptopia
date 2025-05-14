'use client'
import { useAuth } from '@/src/utils/contexts/AuthContext';
import { fetchAuthSession, getCurrentUser, signIn, signOut } from 'aws-amplify/auth';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TestPage() {

    const { setSession, isAuthenticated, setIsAuthenticated, status, setStatus } = useAuth();

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('Signing in...');
        try {
            await signIn({
                username: 'bobby.lawson17@gmail.com',
                password: 'Test123!'
            });
            setStatus('Signed in successfully');
        } catch (error: any) {
            setStatus(`Sign in error: ${error.message}`);
            console.error('Sign in error:', error);
        }
    }

    const handleSignOut = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setStatus('Signing out...');
            await signOut();
            setStatus('Signed out successfully');
            setSession(null);
            setSession(null);
            setIsAuthenticated(false);
            // redirect('/signin');
        } catch (error: any) {
            setStatus(`Sign out error: ${error.message}`);
            console.error('Sign out error:', error);
        }
    };

    return (
        <div>
            <h1>Amplify Test Page</h1>
            <p>Status: {status}</p>
            {/* {testStatus === 'Authenticated' && (
                <>
                    <p>not using AuthContext</p>

                    <p>Welcome, {testUser?.username}</p>

                    <h1>Signin Successful</h1>
                    <form onSubmit={handleSignOut}>
                        <button className="bg-white text-black rounded">Sign Out</button>
                    </form>
                </>
            )} */}

            {(
                <>
                    <p>Using AuthContext</p>

                    <h1>Signin Successful, auth context working</h1>
                    <form onSubmit={handleSignOut}>
                        <button className="bg-white text-black rounded">Sign Out</button>
                    </form>
                </>
            )}

            {!isAuthenticated && (
                <form onSubmit={handleSignIn}>
                    <button className="bg-white text-black rounded" type='submit'> Sign In</button>
                </form>
            )}


        </div>
    );
}