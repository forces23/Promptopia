'use client'
import Form from '@components/Form'
import { Session } from '@node_modules/next-auth'
import { useSession } from '@node_modules/next-auth/react'
import { useRouter } from '@node_modules/next/navigation'
import { useState } from 'react'

type Post = {
  prompt: string,
  tag: string,
}

const CreatePrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState<Post>({
    prompt: '',
    tag: '',
  })

  const createPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/prompt/new',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: post.prompt,
            userId: session?.user.id,
            tag: post.tag
          })
        });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create prompt');
      }

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
    >

    </Form>
  )
}

export default CreatePrompt