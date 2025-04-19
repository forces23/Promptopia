import React, { useEffect, useState } from 'react'

interface SearchProps {
    postData: [];
    tagSearch: string;
    setSearchResults: React.Dispatch<React.SetStateAction<any[]>>
}

const SeachPrompts = ({ postData, setSearchResults, tagSearch }: SearchProps) => {
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        if (tagSearch) {
            setSearchText(tagSearch);
        }
    },[tagSearch]);
 
    useEffect(() => {   
        setSearchResults(postData.filter(
            (post: any) => post.tag.toLowerCase().includes(searchText.toLowerCase()) ||
                post.creator.username.toLowerCase().includes(searchText.toLowerCase()) ||
                post.prompt.toLowerCase().includes(searchText.toLowerCase())
        ));
    }, [searchText]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    return (
        <form className='relative w-full flex-center mx-auto max-w-xl'>
            <input type="text"
                placeholder='Search for a tag or a username'
                value={searchText}
                required
                className='search_input peer'
                onChange={(e) => handleSearchChange(e)}
            />
        </form>
    )
}

export default SeachPrompts