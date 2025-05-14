'use client'
import React, { createContext, use, useContext, useEffect, useState } from 'react'
import { AuthSession, fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';

interface AuthContextInterface {
    // user: any;
    // setUser: React.Dispatch<React.SetStateAction<any>>;
    // userId: any;
    // setUserId: React.Dispatch<React.SetStateAction<any>>;
    // signInDetails: any;
    // setSignInDetails: React.Dispatch<React.SetStateAction<any>>;
    session: AuthSession | null;
    setSession: React.Dispatch<React.SetStateAction<AuthSession | null>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuth: () => Promise<void>;
    status: string;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
    error: Error | null;
}

const AuthContext = createContext<AuthContextInterface>({
    // user: null,
    // setUser: () => { },
    // userId: null,
    // setUserId: () => { },
    // signInDetails: null,
    // setSignInDetails: () => { },
    session: null,
    setSession: () => { },
    isAuthenticated: false,
    setIsAuthenticated: () => { },
    isLoading: true,
    setIsLoading: () => { },
    checkAuth: async () => { },
    status: 'Loading...',
    setStatus: () => { },
    error: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    // const [user, setUser] = useState<any>(null);
    // const [userId, setUserId] = useState<any>(null);
    // const [signInDetails, setSignInDetails] = useState<any>(null);
    const [session, setSession] = useState<AuthSession | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState('Waiting...');

    const [error, setError] = useState<Error | null>(null);

    const checkAuth = async () => {
        try {
            setStatus('Checking auth...');
            const session: AuthSession = await fetchAuthSession();
            setSession(session);
            setIsAuthenticated(session.tokens ? true : false);
            setStatus(`${session.tokens ? 'Authenticated' : 'Unauthenticated'}`);
        } catch (err: any) {
            setSession(null);
            setIsAuthenticated(false);
            setStatus(`Auth error: ${err.message}`);
            console.error('Auth error:', err);
            if (err instanceof Error) setError(err);
        } finally {
            setIsLoading(false);
        }
    }

    // Fetch user data and update state here
    useEffect(() => {
        checkAuth();
    }, [isAuthenticated]);

    useEffect(() => {
        console.log('Status: ', status);
    }, [status]);

    return (
        <AuthContext.Provider value={{
            // user, setUser,
            // userId, setUserId,
            // signInDetails, setSignInDetails,
            session, setSession,
            isAuthenticated, setIsAuthenticated,
            isLoading, setIsLoading,
            checkAuth,
            status, setStatus,
            error
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}