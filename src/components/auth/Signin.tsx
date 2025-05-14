'use client'
import { withAuthenticator } from '@aws-amplify/ui-react';
import { AuthUser } from 'aws-amplify/auth';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Signin = ({ user }: { user?: AuthUser}) => {
    // Add loading state to prevent redirect flash
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('User:', user);
        if (user) {
            redirect('/');
        }
        setLoading(false);
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p>Hello World</p>
        </div>
    )
}

export default withAuthenticator(Signin);