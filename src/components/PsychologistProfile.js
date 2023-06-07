import React, { useEffect, useState } from 'react';
import { getComments, getPsychologist } from '../actions/AppActions';
import { COMMENTS_FETCHED, PSYCHOLOGIST_FETCHED } from '../constants/ActionTypes';
import appStore from '../stores/AppStore';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function PsychologistProfile(props) {
  const [psychologist, setPsychologist] = useState(null);
  const [comments, setComments] = useState(null);

  const { id } = useParams();
  console.log("ID: " + id);

  useEffect(() => {
    getPsychologist({ id });
    getComments({ id });

    const handlePsychologistFetched = (psychologist) => {
      console.log(psychologist);
      setPsychologist(psychologist);
    };

    const handleCommentsFetched = (comments) => {
      setComments(comments);
    }

    appStore.on(PSYCHOLOGIST_FETCHED, handlePsychologistFetched);
    appStore.on(COMMENTS_FETCHED, handleCommentsFetched);

    return () => {
      appStore.off(PSYCHOLOGIST_FETCHED, handlePsychologistFetched);
      appStore.off(COMMENTS_FETCHED, handleCommentsFetched);
    };
  }, [id]);

  return (
    <div>
      <h2>Psikolog Profil Sayfası</h2>
      {psychologist ? (
        <>
          <p>ID: {id}</p>
          <p>Ad: {psychologist.name}</p>
          <p>Soyad: {psychologist.surname}</p>
          <p>Email: {psychologist.email}</p>
          <Link to={`/createAppointment/${id}`}>
            <button>Randevu Talep Et</button>
          </Link>
          <Link to={`/comment/${id}`}>
            <button>Yorum Yap</button>
          </Link>

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
    </div>
  );

}

export default PsychologistProfile;
