import React, { useState } from 'react';
import Post from '../parts/PostComponents/Post'
import PostInput from '../parts/PostComponents/PostInput'
import '../customCss.css'

function Feed() {
    const [posts, setPosts] = useState([]);

    const currentUser = 'User123'; // Hardcodierter Nutzername

    const handlePost = (title, content) => {
        const newPost = {
            id: posts.length + 1,
            username: currentUser,
            title, // Hier wird die Überschrift gesetzt
            content,
            reactions: { like: 0, love: 0, laugh: 0 },
            userReactions: { like: false, love: false, laugh: false }, // Initialisierte Reaktionen
            timestamp: new Date(),
        };
        setPosts([newPost, ...posts]);
    };

    const handleReact = (postId, reaction) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                const hasReacted = post.userReactions[reaction];

                return { 
                    ...post, 
                    reactions: { 
                        ...post.reactions, 
                        [reaction]: hasReacted ? post.reactions[reaction] - 1 : post.reactions[reaction] + 1 
                    }, 
                    userReactions: { 
                        ...post.userReactions, 
                        [reaction]: !hasReacted 
                    }
                };
            }
            return post;
        }));
    };

    return (
        <div className="feed">
            <h2>Eine Super Tolle Überschrift</h2>
            <div className='postContainer'>
                {posts.map(post => (
                    <Post key={post.id} post={post} onReact={handleReact} />
                ))}
            </div>
            <div><PostInput onPost={handlePost} /></div>
        </div>
    );
}

export default Feed;
