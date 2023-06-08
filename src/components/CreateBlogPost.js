import React, { useState } from 'react';
import { BLOG_POST_CREATED } from '../constants/ActionTypes';
import { createBlogPost } from '../actions/PsychologistActions';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';
import psychologistStore from '../stores/PsychologistStore';
const CreateBlogPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const psychologistId = decodedToken.userId;

    useEffect(() => {

        const handleBlogPostCreated = (data) => {
            window.alert(data.message);
            navigate("/psychologists/" + psychologistId);
        }

        psychologistStore.on(BLOG_POST_CREATED, handleBlogPostCreated);

        return () => {
            psychologistStore.off(BLOG_POST_CREATED, handleBlogPostCreated);
        };
    }, [navigate, psychologistId]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handlePostSubmit = (e) => {
        e.preventDefault();
        // Gönderim işlemleri burada gerçekleştirilebilir
        createBlogPost({title, content});
    };

    return (
        <div>
            <h2>Yeni Blog Yazısı</h2>
            <form onSubmit={handlePostSubmit}>
                <div>
                    <label>Yazı başlığı:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    <label>Yazı içeriği:</label>
                    <textarea
                        value={content}
                        onChange={handleContentChange}
                    />
                </div>
                <button type="submit">Paylaş</button>
            </form>
        </div>
    );
};

export default CreateBlogPost;
