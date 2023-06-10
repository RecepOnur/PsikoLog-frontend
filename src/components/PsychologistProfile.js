import React, { useEffect, useState } from 'react';
import { getBlogPosts, getComments, getPsychologist } from '../actions/AppActions';
import { BLOG_POSTS_FETCHED, COMMENTS_FETCHED, PSYCHOLOGIST_FETCHED } from '../constants/ActionTypes';
import appStore from '../stores/AppStore';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { PSYCHOLOGIST } from '../constants/UserTypes';
import { Container, Button } from 'react-bootstrap';

function PsychologistProfile(props) {
  const [psychologist, setPsychologist] = useState(null);
  const [comments, setComments] = useState(null);
  const [blogPosts, setBlogPosts] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);

  console.log(JSON.stringify(blogPosts));

  const { id } = useParams();
  console.log("ID: " + id);
  const psychologistId = parseInt(id, 10);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      setUserId(decodedToken.userId);
      setUserType(decodedToken.userType);
    }
  }, [])

  useEffect(() => {
    getPsychologist({ id });
    getComments({ id });
    getBlogPosts({ id });

    const handlePsychologistFetched = (psychologist) => {
      console.log(psychologist);
      setPsychologist(psychologist);
    };

    const handleCommentsFetched = (comments) => {
      setComments(comments);
    }

    const handleBlogPostsFetched = (blogPosts) => {
      console.log("handleBlogPostsFetched");
      setBlogPosts(blogPosts);
    }

    appStore.on(PSYCHOLOGIST_FETCHED, handlePsychologistFetched);
    appStore.on(COMMENTS_FETCHED, handleCommentsFetched);
    appStore.on(BLOG_POSTS_FETCHED, handleBlogPostsFetched)

    return () => {
      appStore.off(PSYCHOLOGIST_FETCHED, handlePsychologistFetched);
      appStore.off(COMMENTS_FETCHED, handleCommentsFetched);
      appStore.off(BLOG_POSTS_FETCHED, handleBlogPostsFetched)
    };
  }, [id]);

  return (
    <Container>
      <h2>Psikolog Profil Sayfası</h2>
      {psychologist ? (
        <>
          <p>ID: {id}</p>
          <p>Ad: {psychologist.name}</p>
          <p>Soyad: {psychologist.surname}</p>
          <p>Email: {psychologist.email}</p>
          {userId ? (
            userId === psychologistId && userType === PSYCHOLOGIST ? (
              <div>
                <Link to={`/psychologist/createBlogPost`}>
                  <Button variant="primary">Yeni Blog Yazısı Yaz</Button>
                </Link>
              </div>
            ) : (
              <div>
                <Link to={`/createAppointment/${id}`}>
                  <Button variant="primary">Randevu Talep Et</Button>
                </Link>
                <Link to={`/sendMessage/${id}`}>
                  <Button variant="primary">Mesaj Gönder</Button>
                </Link>
                <Link to={`/comment/${id}`}>
                  <Button variant="primary">Yorum Yap</Button>
                </Link>
              </div>
            )
          ) : (
            <div>
              <p>Randevu almak için giriş yapmalısınız.</p>
            </div>
          )}
  
          <h3>Blog Yazıları:</h3>
          {blogPosts ? (
            blogPosts.map((blogPost) => (
              <div key={blogPost.id}>
                <Link to={`/blogPost/${blogPost.id}`}>
                  <h4>{blogPost.title}</h4>
                </Link>
              </div>
            ))
          ) : (
            <p>Blog yazısı bulunamadı.</p>
          )}
  
          <h3>Yorumlar:</h3>
          {comments ? (
            comments.map((comment) => (
              <div key={comment.commentId}>
                <p>Ad: {comment.name}</p>
                <p>Soyad: {comment.surname}</p>
                <p>Yorum: {comment.comment_text}</p>
              </div>
            ))
          ) : (
            <p>Yorum bulunamadı.</p>
          )}
        </>
      ) : (
        <p>Yükleniyor...</p>
      )}
    </Container>
  );

}

export default PsychologistProfile;
