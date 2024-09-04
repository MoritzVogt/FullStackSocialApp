import React,{useState} from 'react';

export default function PostInput({ onPost }) {
    const [title,setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim()) {
            onPost(title,content);
            setContent(''); // Textfeld leeren nach dem Posten
        }
    };

    return (
        <div className="inputForm">
        <form onSubmit={handleSubmit} style={{display:"flex",width:"100%"}}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Überschrift'
                className='titleInput'
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Was möchtest du teilen?"
                className='contentInput'
            />
            <button type="submit">Posten</button>
        </form>
        </div>
    );
}