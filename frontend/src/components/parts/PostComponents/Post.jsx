import React from 'react';

function Post({ post, onReact }) {
    console.log('Post data:', post);  // Debugging: Überprüfe die Daten des Posts

    const { reactions = { like: 0, love: 0, laugh: 0 }, userReactions = { like: false, love: false, laugh: false } } = post;

    return (
        <div className="post">
            <h4>{post.username}</h4>
            {post.title && <h3>{post.title}</h3>}
            <p>{post.content}</p>
            <div>
                <span 
                    onClick={() => onReact(post.id, 'like')} 
                    role="img" 
                    aria-label="like"
                    style={{ cursor: 'pointer', opacity: userReactions.like ? 0.5 : 1 }}
                >
                    👍 {reactions.like}
                </span>
                <span 
                    onClick={() => onReact(post.id, 'love')} 
                    role="img" 
                    aria-label="love"
                    style={{ cursor: 'pointer', opacity: userReactions.love ? 0.5 : 1 }}
                >
                    ❤️ {reactions.love}
                </span>
                <span 
                    onClick={() => onReact(post.id, 'laugh')} 
                    role="img" 
                    aria-label="laugh"
                    style={{ cursor: 'pointer', opacity: userReactions.laugh ? 0.5 : 1 }}
                >
                    😂 {reactions.laugh}
                </span>
            </div>
        </div>
    );
}


export default Post;
