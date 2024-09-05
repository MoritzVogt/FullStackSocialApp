import React,{useState} from 'react';

export default function PostInput({ onPost }) {
    const [title,setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() === '' || content.trim() === '') {
            console.error('Title and content cannot be empty');
            return;
        }
        onPost(title,content);
        setContent(''); // Textfeld leeren nach dem Posten
        setTitle(''); // Titlefeld leeren nach dem Posten
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
                required
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Was möchtest du teilen?"
                className='contentInput'
                required
            />
            <button type="submit">Posten</button>
        </form>
        </div>
    );
}