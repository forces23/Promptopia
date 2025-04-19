'use client'

import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'
import SeachPrompts from './SeachPrompts'


const PrompCardList = ({ data, handleTagClick, loading }: any) => {

  return (
    <div className='mt-16 prompt_layout'>
      {loading ? (
        <div className='w-full flex-center font-inter text-xl font-bold'>
          Loading...
        </div>
      ) : (
        data.length !== 0 ? (data.map((post: any) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))) : (
          <div className='w-full flex-center font-inter text-xl font-bold'>
            No posts found
          </div>
        )
      )}
    </div>
  )
}


const feeds = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [tagSearch, setTagSearch] = useState<string>('');
  const [post, setPost] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const fetchpost = async () => {
        setLoading(true);

        const response = await fetch('/api/prompt');
        const data = await response.json();
        setPost(data);
      }
      fetchpost();

    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      console.log('Fetch posts completed');
      setLoading(false);
    }


  }, [])

  const handleTagClick = (tag: string) => {
    setTagSearch(tag);
    // setSearchResults(post.filter((post: any) => post.tag.toLowerCase().includes(tag.toLowerCase())));
  }




  return (
    <section className='feed max-w-7xl'>
      <SeachPrompts
        postData={post}
        tagSearch={tagSearch}
        setSearchResults={setSearchResults}
      />

      <PrompCardList
        data={searchResults.length > 0 ? searchResults : post}
        handleTagClick={handleTagClick}
        loading={loading}
      />
    </section>
  )
}

export default feeds