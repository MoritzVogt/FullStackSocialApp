// Post.js
import React from 'react';

function Post({ post, onReact }) {
    return (
        <div className="post">
            <h4>{post.username}</h4>
            {/* Überschrift anzeigen */}
            {post.title && <h3>{post.title}</h3>}
            <p>{post.content}</p>
            <div>
                <span 
                    onClick={() => onReact(post.id, 'like')} 
                    role="img" 
                    aria-label="like"
                    style={{ cursor: 'pointer', opacity: post.userReactions.like ? 0.5 : 1 }}
                >
                    👍 {post.reactions.like}
                </span>
                <span 
                    onClick={() => onReact(post.id, 'love')} 
                    role="img" 
                    aria-label="love"
                    style={{ cursor: 'pointer', opacity: post.userReactions.love ? 0.5 : 1 }}
                >
                    ❤️ {post.reactions.love}
                </span>
                <span 
                    onClick={() => onReact(post.id, 'laugh')} 
                    role="img" 
                    aria-label="laugh"
                    style={{ cursor: 'pointer', opacity: post.userReactions.laugh ? 0.5 : 1 }}
                >
                    😂 {post.reactions.laugh}
                </span>
            </div>
        </div>
    );
}

export default Post;
