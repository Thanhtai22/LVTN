import React, { memo, useState } from 'react'
import anonAvartar from '../assets/anon-avatar.png'
import icons from '../ultils/icons'
import HeartButton from './HeartButton'
import { useSelector } from 'react-redux';
import { saveFavoritePost, deleteFavoritePostsByPostId } from '../services/favoritePost';
import { useDispatch } from 'react-redux'
import { blobToBase64 } from '../ultils/Common/toBase64'

const { GoDotFill, FaPhoneAlt, SiZalo } = icons
const UserInfor = ({ userData, onLikeToggle, userId }) => {
    const { posts } = useSelector(state => state.post);
    const { currentData } = useSelector(state => state.user)

    const handleLikeToggle = async (postId, updatedLiked) => {
        onLikeToggle(postId, updatedLiked); // Update the like status in the UI
        if (updatedLiked) {
            saveFavoritePost({
                userId: userId,
                postId: postId
            })
        } else {
            deleteFavoritePostsByPostId(postId);
        }

    };

    return (
        <div className='w-full bg-yellow-500 rounded-md flex flex-col items-center p-4 gap-4'>
            <img src={anonAvartar} alt='avatar' className='w-16 h-16 object-contain rounded-full' />
            <h3 className='font-medium- text-xl'>{userData?.name}</h3>
            <span className='flex items-center g-2'>
                <GoDotFill color='green' />
                <span>Đang hoạt động</span>
            </span>
            <a className='bg-[#13BB7B] py-2 flex items-center justify-center gap-2 w-full rounded-md text-white font-bold text-lg' href='/'>
                <FaPhoneAlt />{userData?.phone}

            </a>
            <a
                className='bg-white py-2 flex items-center justify-center gap-1 w-full rounded-md text-black font-bold text-lg'
                href={`https://zalo.me/${userData?.zalo}`

                }

            >
                <SiZalo size='30' color='blue' />

            </a>

            <div className="post-list">
                {posts && posts.map(post => (
                    <div key={post.id} className="post">
                        <HeartButton
                            postId={post.id}
                            isLiked={post.isLiked}
                            onLikeToggle={handleLikeToggle}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(UserInfor)