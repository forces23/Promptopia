import React from 'react'
import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <div className='flex justify-center gap-2 pb-2'>
            <a href="https://github.com/forces23" className='inline-flex gap-2'>
                <FaGithub size={24} />
                <span>Created By Bobby Lawson</span>
            </a>
        </div>
    )
}

export default Footer