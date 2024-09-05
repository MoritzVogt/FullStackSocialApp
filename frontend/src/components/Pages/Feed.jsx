import React, { useState } from 'react';
import Post from '../parts/PostComponents/Post';
import PostInput from '../parts/PostComponents/PostInput';
import '../customCss.css';

function Feed() {
    const [posts, setPosts] = useState([]);

    const currentUser = 'User123'; // Hardcodierter Nutzername

    const handlePost = async (title, content) => {
        const newPost = {
            username: currentUser,
            title,
            content,
            reactions: { like: 0, love: 0, laugh: 0 },
            userReactions: { like: false, love: false, laugh: false },
            timestamp: new Date(),
        };

        try {
            // API-Request zum Speichern des Posts in der MongoDB
            const response = await fetch('http://localhost:3001/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
            });

            if (response.ok) {
                const savedPost = await response.json();
                console.log('Saved post:', savedPost); // Überprüfe, ob die _id zurückkommt
                setPosts([savedPost, ...posts]); // Fügt den neuen Post hinzu
            } else {
                console.error('Failed to save the post');
            }
        } catch (error) {
            console.error('Error while saving the post:', error);
        }
    };

    const handleReact = (postId, reaction) => {
        setPosts(posts.map(post => {
            if (post._id === postId) { // Stelle sicher, dass _id verwendet wird
                const hasReacted = post.userReactions[reaction];

                return {
                    ...post,
                    reactions: {
                        ...post.reactions,
                        [reaction]: hasReacted ? post.reactions[reaction] - 1 : post.reactions[reaction] + 1,
                    },
                    userReactions: {
                        ...post.userReactions,
                        [reaction]: !hasReacted,
                    },
                };
            }
            return post;
        }));
    };

    return (
        <div className="feed">
            <h2>Eine Super Tolle Überschrift</h2>
            <div className="postContainer">
                {posts.map(post => (
                    <Post key={post._id} post={post} onReact={handleReact} />
                ))}
            </div>
            <div>
                <PostInput onPost={handlePost} />
            </div>
        </div>
    );
}

export default Feed;
