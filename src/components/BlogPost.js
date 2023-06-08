import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogPost } from '../actions/AppActions';
import appStore from '../stores/AppStore';
import { BLOG_POST_FETCHED } from '../constants/ActionTypes';
import { Link } from 'react-router-dom';

const BlogPost = () => {

    const { postId } = useParams();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [psychologist, setPsychologist] = useState('');

    useEffect(() => {

        const handleBlogPostFetched = (blogPost) => {
            setTitle(blogPost.title);
            setContent(blogPost.content);
            setPsychologist({ id: blogPost.psychologist_id, name: blogPost.name, surname: blogPost.surname, email: blogPost.email })
        }

        appStore.on(BLOG_POST_FETCHED, handleBlogPostFetched)

        getBlogPost({ postId });

        return () => {
            appStore.off(BLOG_POST_FETCHED, handleBlogPostFetched);
        }
    }, [postId])

    return (
        <div>
            <Link to={`/psychologists/${psychologist.id}`}>
                <p>Yazar: {psychologist.name} {psychologist.surname}</p>
            </Link>
            <h2>Yazı başlığı: {title}</h2>
            <p>Yazı içeriği: {content}</p>
        </div>
    );
}

export default BlogPost;
