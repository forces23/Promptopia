'use client'
import Form from '@components/Form'
import { Session } from '@node_modules/next-auth'
import { useSession } from '@node_modules/next-auth/react'
import { useRouter, useSearchParams } from '@node_modules/next/navigation'
import { useEffect, useState } from 'react'

type Post = {
    prompt: string,
    tag: string,
}

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState<Post>({
        prompt: '',
        tag: '',
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            console.log('promptId: ',promptId);
            const respone = await fetch(`/api/prompt/${promptId}`);
            const data = await respone.json();

            console.log('getPromptDetails data: ',data);

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        }

        if(promptId) getPromptDetails();

    }, [promptId])

    const updatePrompt = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!promptId) return alert('Prompt ID not found');

        setSubmitting(true);
        console.log('upadate post: ',post);
        try {
            const response = await fetch(`/api/prompt/${promptId}`, 
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        prompt: post.prompt,
                        tag: post.tag
                    })
                });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to edit prompt');
            }

            router.push('/');
            // router.refresh();
        } catch (error: any) {
            console.error('Error:', error);
            alert(error.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        >

        </Form>
    )
}

export default EditPrompt