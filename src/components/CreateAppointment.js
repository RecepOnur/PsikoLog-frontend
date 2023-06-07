import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { createAppointment } from '../actions/PatientActions';
import { APPOINTMENT_CREATED, PSYCHOLOGIST_FETCHED } from '../constants/ActionTypes';
import { useEffect } from 'react';
import patientStore from '../stores/PatientStore';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import appStore from '../stores/AppStore';
import { getPsychologist } from '../actions/AppActions';

const CreateAppointment = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const patientId = decodedToken.userId;
    const { id } = useParams();
    const psychologistId = id;

    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');

    const [psychologist, setPsychologist] = useState(null);
    
    useEffect(() => {

        getPsychologist({ id });
        console.log("useEffect: " + psychologistId);

        const handlePsychologistFetched = (data) => {
            setPsychologist(data);
        }

        const handleAppointmentCreated = (data) => {
            window.alert(data.message);
            navigate("/psychologists/" + psychologistId);
        };

        appStore.on(PSYCHOLOGIST_FETCHED, handlePsychologistFetched);
        patientStore.on(APPOINTMENT_CREATED, handleAppointmentCreated);

        return () => {
            appStore.off(PSYCHOLOGIST_FETCHED, handlePsychologistFetched);
            patientStore.off(APPOINTMENT_CREATED, handleAppointmentCreated);
        };
    }, [id, navigate, psychologistId]);

    const handleDateChange = (e) => {
        setAppointmentDate(e.target.value);
    };

    const handleTimeChange = (e) => {
        setAppointmentTime(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("PsychologistId: " + psychologistId);
        console.log(JSON.stringify({ patientId, psychologistId, appointmentDate, appointmentTime }));
        
        // Randevu talebi gönderme işlemleri burada yapılacak
        // Örneğin, bir API isteği yapabilir veya başka bir işlem gerçekleştirebilirsiniz
        createAppointment({ patientId, psychologistId, appointmentDate, appointmentTime });
    };

    return (
        <div>
            <h1>Psikologdan Randevu Al</h1>
            {psychologist ? (<form onSubmit={handleSubmit}>
                <div>
                    <label>Psikolog Adı: {psychologist.name}</label>
                </div>
                <div>
                    <label>Psikolog Soyadı: {psychologist.surname}</label>
                </div>
                <div>
                    <label>Psikolog E-Posta: {psychologist.email}</label>
                </div>
                <div>
                    <label>Randevu Tarihi:</label>
                    <input
                        type="date"
                        name="appointmentDate"
                        value={appointmentDate}
                        onChange={handleDateChange}
                        required
                    />
                </div>
                <div>
                    <label>Randevu Saati:</label>
                    <input
                        type="time"
                        name="appointmentTime"
                        value={appointmentTime}
                        onChange={handleTimeChange}
                        required
                    />
                </div>
                <button type="submit">Randevu Talebi Et</button>
            </form>) : (<p>Yükleniyor...</p>)}
        </div>
    );
};

export default CreateAppointment;
