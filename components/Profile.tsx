import React, { useState } from 'react'
import PromptCard from './PromptCard';

interface ProfileProps {
  name: string;
  desc: string;
  data: any[];
  handleEdit?: (post: any) => void;
  handleDelete?: (post: any) => void;
  loading: boolean;
}

const Profile = ({ name, desc, data, handleEdit, handleDelete, loading }: ProfileProps) => {

  return (
    <section className='w-full mx-auto max-w-7xl'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>
      <div className='mt-16 prompt_layout'>
        {loading ? (
          <div className='w-full flex-center font-inter text-xl font-bold'>
            Loading...
          </div>
        ) : (
          data.length !== 0 ? data.map((post: any) => (
            (
              <PromptCard
                key={post._id}
                post={post}
                {...(handleEdit && { handleEdit: () => handleEdit(post) })}
                {...(handleDelete && { handleDelete: () => handleDelete(post) })}
              />
            ))) : (
            <div className='w-full flex-center font-inter text-xl font-bold'>
              No posts found
            </div>
          )

        )}
      </div>
    </section>
  )
}

export default Profile