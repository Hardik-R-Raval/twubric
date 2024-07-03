import React from 'react'

function FollowerCard({ follower, removeFollower }) {
    return (
        <div className='border-2 text-center rounded-lg p-4 mb-4 shadow-sm hover:shadow-lg'>
            <img src={follower.image} alt={follower.username} className='rounded-full mx-auto mb-4' />
            <h2 className='text-xl font-bold'>{follower.username}</h2>
            <p className='text-gray-500'>{follower.fullname}</p>
            <div className='mt-2 '>
                <p className="font-semibold">Total Score: <span className="font-normal">{follower.twubric.total}</span></p>
                <p className="font-semibold">Friends: <span className="font-normal">{follower.twubric.friends}</span></p>
                <p className="font-semibold">Influence: <span className="font-normal">{follower.twubric.influence}</span></p>
                <p className="font-semibold">Chirpiness: <span className="font-normal">{follower.twubric.chirpiness}</span></p>
                <p className="font-semibold">Join Date: <span className="font-normal">{new Date(follower.join_date * 1000).toLocaleDateString()}</span></p>
            </div>
            <button onClick={() => removeFollower(follower.uid)} className='mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'>Remove</button>
        </div>
    )
}

export default FollowerCard