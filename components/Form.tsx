'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { Toaster, toast } from 'sonner';

type Post = {
  prompt: string;
  tag: string;
};

interface FormProps {
  type: string;
  post: Post;
  setPost: React.Dispatch<React.SetStateAction<Post>>;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>; // Remove session parameter
}

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit
}: FormProps) => {
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e); // Now only passes the event
  };
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <Toaster richColors position='top-center' closeButton={false} />

      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world, and let your imagination run wild width any AI-powered platform
      </p>

      <form
        onSubmit={submitHandler}
        className='mt-10 w-full flex flex-col gap-7 glassmorphism'
      >
        <label htmlFor="">
          <span className='font-satoshi font-semibold text-base text-gray-700'> Your AI Prompt</span>
        </label>
        <textarea
          name="prompt"
          id="prompt"
          value={post.prompt}
          onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          placeholder='Write your prompt here...'
          required
          className='form_textarea'
        />

        <label htmlFor="">
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Tag {` `}
            <span className='font-normal'>
              (#product, #webdevelopment, #ai)
            </span>
          </span>
        </label>
        <input
          name="tag"
          id="tag"
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
          placeholder='tag'
          required
          className='form_input'
          onKeyDown={(e) => { if (['#', ' '].includes(e.key)) e.preventDefault(); }}
          onPaste={(e) => {
            const pastedText = e.clipboardData.getData('text');
            if (/[# ]/.test(pastedText)) {
              e.preventDefault();
              toast.error('Invalid paste. Cannot contain spaces or hash symbol(#). Please use a valid tag format.');
            }
          }}
        />

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href={`/`} className='text-gray-500 text-sm'>
            Cancel
          </Link>
          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-orange-600 rounded-full text-white'
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form