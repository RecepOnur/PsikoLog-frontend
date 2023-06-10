import { addComment } from "../actions/PatientActions";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { COMMENT_ADDED, PSYCHOLOGIST_FETCHED } from "../constants/ActionTypes";
import { getPsychologist } from "../actions/AppActions";
import appStore from "../stores/AppStore";
import patientStore from "../stores/PatientStore";
import { Container, Form, Button } from 'react-bootstrap';

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
    <Container>
      <h2>Psikolog Yorum Sayfası</h2>
      {psychologist && (
        <div>
          <p>Psikolog Ad: {psychologist.name}</p>
          <p>Psikolog Soyad: {psychologist.surname}</p>
        </div>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="comment">Yorum:</Form.Label>
          <Form.Control
            as="textarea"
            id="comment"
            value={commentText}
            onChange={handleCommentChange}
          />
        </Form.Group>
        <Button type="submit">Yorumu Gönder</Button>
      </Form>
    </Container>
  );
};

export default AddComment;
