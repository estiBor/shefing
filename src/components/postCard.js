import React from 'react';
import '../styles/posts.css'

export default function PostCard({title, body}) {

    return(
        <div className='post-card'>
            <div className='title'>
                {title}
            </div>

            <div className='body-container'>
                {body}
            </div>
        </div>
    )
}