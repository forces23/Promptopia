'use client'
import Form from '@/src/components/Form';
import { useAuth } from '@/src/utils/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import type { Schema } from '@/amplify/data/resource';
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>();

type Post = {
    prompt: string;
    tag: string;
}

const CreatePrompt = () => {
    const { session } = useAuth();
    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState<Post>({
        prompt: '',
        tag: '',
    });

    useEffect(() => {
        if (!session?.userSub) {
            router.push('/');
        }
    }, [session, router]);

    if (!session?.userSub) {
        return <div> Redirecting ... </div>
    }

    const createPrompt = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log('Creating prompt...');


        setSubmitting(true);
        try {
            const response = await client.models.Prompts.create({
                creator: session?.userSub,
                prompt: post.prompt,
                tag: post.tag
            })


            if (response.errors) {
                throw new Error(response.errors.toString() || 'Failed to create prompt');
            }

            console.log('response: ', response);


            router.push('/');
            router.refresh();
        } catch (error: any) {
            console.error('Error:', error);
            alert(error.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    );
}

export default CreatePrompt