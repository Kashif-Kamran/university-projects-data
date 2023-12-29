import React from 'react';
import profileImg from "../static/images/ProfileImg.jpg"

const Avatar = () =>
{
    // this component takes avatar and name
    return (
        <div className='flex justify-around items-center h-24 py-2 px-20 mt-2 mb-4'>
            <img className='h-full rounded-full' src={profileImg} alt="Image Not Found" />
        </div>
    );
}

export default Avatar;
