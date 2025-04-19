'use client'

import Profile from '@components/Profile'
import { useParams, useRouter, useSearchParams } from '@node_modules/next/navigation'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

const OtherUserProfile = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    // get id from url 
    const params = useParams();
    const userId = params.id;
    console.log('userId: ', userId);

    // get name from url
    const searchParams = useSearchParams();
    const userName = searchParams.get('name');

    useEffect(() => {
        console.log(`/api/users/${userId}/posts`);
        try {
            setLoading(true);

            const fetchpost = async () => {
                // console.log('session: ', session?.user?.id);
                const response = await fetch(`/api/users/${userId}/posts`);
                const data = await response.json();

                // console.log('response: ', data); // DEBUG LOG
                // console.log('session user: ', userName); // DEBUG LOG

                setPosts(data);
            }
            fetchpost();

        } catch (error) {
            console.error('Error fetching profile posts:', error);
        } finally {
            console.log('Fetch profile posts completed');
            setLoading(false);
        }

    }, [])

    return (
        <Profile
            name={`${userName}`}
            desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their creativity.`}
            data={posts}
            loading={loading}
        />
    )
}

export default OtherUserProfile;