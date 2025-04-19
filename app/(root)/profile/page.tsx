'use client'

import Profile from '@components/Profile'
import { useRouter } from '@node_modules/next/navigation'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

const MyProfile = () => {
    const [posts, setPosts] = useState([]);
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        try {
            const fetchpost = async () => {
                // console.log('session: ', session?.user?.id);
                const response = await fetch(`/api/users/${session?.user?.id}/posts`);
                const data = await response.json();

                console.log('response: ', data);
                // console.log('session user: ', session?.user);

                setPosts(data);
            }

            fetchpost();
        } catch (error) {
            console.error('Error fetching profile posts:', error);
        } finally {
            console.log('Fetch profile posts completed');
            setLoading(false);
        }

        // console.log(post);
    }, [])

    useEffect(() => {
        if (!session) {
            router.push('/');
        }
    }, [session, router]);

    const handleEdit = (post: any) => {
        console.log('handle edit');
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post: any) => {
        // logic to delete profile
        console.log('handle delete: ', post);

        const hasConfirmed = confirm('Are you sure you want to delete this prompt?');

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id}`, {
                    method: 'DELETE'
                });

                const filteredPosts = posts.filter((p: any) => p._id !== post._id);

                setPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            loading={false}
        />
    )
}

export default MyProfile