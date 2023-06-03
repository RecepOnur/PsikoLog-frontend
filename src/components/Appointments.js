import { getAppointments } from "../actions/AppActions";
import { APPOINTMENTS_FETCHED, APPOINTMENT_DELETED } from "../constants/ActionTypes";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import appStore from "../stores/AppStore";
import { deleteAppointment } from "../actions/PatientActions";
import patientStore from "../stores/PatientStore";
const Appointments = () => {

    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const id = decodedToken.userId;
    const userType = decodedToken.userType;

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {

        getAppointments({id});

        const handleAppointmentsFetched = (data) => {
            setAppointments(data);
        };

        const handleAppointmentDeleted = () => {
            window.alert("Randevu iptal edildi.");
            getAppointments({id});
        }

        appStore.on(APPOINTMENTS_FETCHED, handleAppointmentsFetched);

        if(userType === "patient"){
            patientStore.on(APPOINTMENT_DELETED, handleAppointmentDeleted);
        }
        else if(userType === "psychologist"){
            //
        }
        
        return () => {
            appStore.off(APPOINTMENTS_FETCHED, handleAppointmentsFetched);
            if(userType === "patient"){
                patientStore.off(APPOINTMENT_DELETED, handleAppointmentDeleted);
            }
            else if(userType === "psychologist"){
                //
            }
        };
    }, [id, userType]);

    const handleCancelAppointment = (appointmentId) => {
        deleteAppointment({appointmentId});
    }

    return (
        <div>
            <h1>Randevu Talepleri</h1>
            <ul>
                {appointments.map((appointment) => (
                    <li key={appointment.id}>
                        <p>Durum: {appointment.status !== "pending" ? appointment.status : <button onClick={() => handleCancelAppointment(appointment.id)}>İptal Et</button>}</p>
                        <p>Randevu Tarihi: {appointment.appointment_date}</p>
                        <p>Randevu Saati: {appointment.appointment_time}</p>
                        <p>Ad: {appointment.name}</p>
                        <p>Soyad: {appointment.surname}</p>
                        <p>Email: {appointment.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default Appointments;