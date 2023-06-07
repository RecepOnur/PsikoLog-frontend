import { addComment } from "../actions/PatientActions";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { COMMENT_ADDED, PSYCHOLOGIST_FETCHED } from "../constants/ActionTypes";
import { getPsychologist } from "../actions/AppActions";
import appStore from "../stores/AppStore";
import patientStore from "../stores/PatientStore";

const AddComment = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const psychologistId = id;

  const [commentText, setCommentText] = useState('');
  const [psychologist, setPsychologist] = useState(null);

  useEffect(() => {
    getPsychologist({ id });
    console.log("useEffect: " + psychologistId);

    const handlePsychologistFetched = (data) => {
      setPsychologist(data);
    };

    const handleCommentAdded = (data) => {
      window.alert(data.message);
      navigate("/psychologists/" + psychologistId);
    };

    appStore.on(PSYCHOLOGIST_FETCHED, handlePsychologistFetched);
    patientStore.on(COMMENT_ADDED, handleCommentAdded);

    return () => {
      appStore.off(PSYCHOLOGIST_FETCHED, handlePsychologistFetched);
      patientStore.off(COMMENT_ADDED, handleCommentAdded);
    };
  }, [id, navigate, psychologistId]);

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Yorumu gönderme işlemini burada gerçekleştirebilirsiniz
    console.log("addComment: " + commentText);
    addComment({id, commentText});
  };


  return (
    <div>
      <h2>Psikolog Yorum Sayfası</h2>
      {psychologist && (
        <div>
          <p>Psikolog Ad: {psychologist.name}</p>
          <p>Psikolog Soyad: {psychologist.surname}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="comment">Yorum:</label>
          <textarea
            id="comment"
            value={commentText}
            onChange={handleCommentChange}
          ></textarea>
        </div>
        <button type="submit">Yorumu Gönder</button>
      </form>
    </div>
  );
};

export default AddComment;
