import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPsychologist } from '../actions/AppActions';
import appStore from '../stores/AppStore';
import { PSYCHOLOGIST_FETCHED } from '../constants/ActionTypes';
import { sendMessage } from '../actions/MessageActions';
import messageStore from '../stores/MessageStore';
import { MESSAGE_SENT } from '../constants/ActionTypes';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

function SendMessage() {
    const [message, setMessage] = useState('');
    const [psychologist, setPsychologist] = useState(null);
    const { psychologistId } = useParams();
    
    const navigate = useNavigate();

    useEffect(() => {
        getPsychologist({ id: psychologistId });

        const handlePsychologistFetched = (psychologist) => {
            setPsychologist(psychologist);
        }

        const handleMessageSent = (message) => {
            window.alert(message);
            navigate('/psychologists/' + psychologistId);
        }

        appStore.on(PSYCHOLOGIST_FETCHED, handlePsychologistFetched);
        messageStore.on(MESSAGE_SENT, handleMessageSent);

        return () => {
            appStore.off(PSYCHOLOGIST_FETCHED, handlePsychologistFetched);
            messageStore.off(MESSAGE_SENT, handleMessageSent);
        }
    }, [psychologistId, navigate])

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Mesaj gönderme işlemleri burada gerçekleştirilebilir
        sendMessage({ to: psychologist.id, text: message});
    };

   return (
  <Container>
    {psychologist ? (
      <div>
        <h2>Mesaj Gönder</h2>
        <Form>
          <Form.Group>
            <Form.Label>Psikolog Adı:</Form.Label>
            <Form.Control type="text" value={psychologist.name} disabled />
          </Form.Group>
          <Form.Group>
            <Form.Label>Psikolog Soyadı:</Form.Label>
            <Form.Control type="text" value={psychologist.surname} disabled />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mesaj:</Form.Label>
            <Form.Control type="text" value={message} onChange={handleMessageChange} />
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit}>Gönder</Button>
        </Form>
      </div>
    ) : (
      <p>Yükleniyor...</p>
    )}
  </Container>
);
    }

export default SendMessage;
