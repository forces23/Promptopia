import React, { useState } from 'react';

const Search = () => {
    const [searchText, setSearchText] = useState<string>('');

    return (
        <input
            type="text"
            placeholder="Search for a tag or username"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-white text-black block w-full max-w-lg rounded-md border border-gray-200 py-2.5 font-satoshi pl-5 pr-5 shadow-lg shadow-white/30 font-medium mb-8"
        />
    )
}

export default Search