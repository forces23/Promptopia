'use client'
import React, { useState } from 'react';
import Search from './Search';

const Feed = () => {
    return (
        <div className=" justify-center flex flex-col items-center ">
            <Search />
            <div>
                feed
            </div>
        </div>
    )
}

export default Feed