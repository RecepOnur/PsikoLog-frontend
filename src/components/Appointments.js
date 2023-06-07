import { getAppointments } from "../actions/AppActions";
import { APPOINTMENTS_FETCHED, APPOINTMENT_APPROVED, APPOINTMENT_DECLINED, APPOINTMENT_DELETED } from "../constants/ActionTypes";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import appStore from "../stores/AppStore";
import { deleteAppointment } from "../actions/PatientActions";
import patientStore from "../stores/PatientStore";
import { approveAppointment, declineAppointment } from "../actions/PsychologistActions";
import psychologistStore from "../stores/PsychologistStore";
import { PATIENT, PSYCHOLOGIST } from "../constants/UserTypes";
const Appointments = () => {

    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const id = decodedToken.userId;
    const userType = decodedToken.userType;

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {

        getAppointments({ id, userType });

        const handleAppointmentsFetched = (data) => {
            setAppointments(data);
        };

        const handleAppointmentDeleted = () => {
            window.alert("Randevu iptal edildi.");
            getAppointments({ id, userType });
        }

        const handleAppointmentApproved = () => {
            window.alert("Randevu onaylandi.");
            getAppointments({ id, userType });
        }

        const handleAppointmentDeclined = () => {
            window.alert("Randevu reddedildi.");
            getAppointments({ id, userType });
        }

        appStore.on(APPOINTMENTS_FETCHED, handleAppointmentsFetched);

        if (userType === PATIENT) {
            patientStore.on(APPOINTMENT_DELETED, handleAppointmentDeleted);
        }
        else if (userType === PSYCHOLOGIST) {
            psychologistStore.on(APPOINTMENT_APPROVED, handleAppointmentApproved);
            psychologistStore.on(APPOINTMENT_DECLINED, handleAppointmentDeclined);
        }

        return () => {
            appStore.off(APPOINTMENTS_FETCHED, handleAppointmentsFetched);
            if (userType === PATIENT) {
                patientStore.off(APPOINTMENT_DELETED, handleAppointmentDeleted);
            }
            else if (userType === PSYCHOLOGIST) {
                psychologistStore.off(APPOINTMENT_APPROVED, handleAppointmentApproved);
                psychologistStore.off(APPOINTMENT_DECLINED, handleAppointmentDeclined);
            }
        };
    }, [id, userType]);

    const handleCancelAppointment = (appointmentId) => {
        deleteAppointment({ appointmentId });
    }

    const handleApproveAppointment = (appointmentId) => {
        approveAppointment(appointmentId);
    }

    const handleDeclineAppointment = (appointmentId) => {
        declineAppointment(appointmentId);
    }

    return (
        <div>
            <h1>Randevu Talepleri</h1>
            <ul>
                {userType === PATIENT && appointments.map((appointment) => (
                    <li key={appointment.id}>
                        <p>Durum: {appointment.status !== "pending" ? appointment.status : <button onClick={() => handleCancelAppointment(appointment.id)}>İptal Et</button>}</p>
                        <p>Randevu Tarihi: {appointment.appointment_date}</p>
                        <p>Randevu Saati: {appointment.appointment_time}</p>
                        <p>Ad: {appointment.name}</p>
                        <p>Soyad: {appointment.surname}</p>
                        <p>Email: {appointment.email}</p>
                    </li>
                ))}
                {userType === PSYCHOLOGIST && appointments.map((appointment) => (
                    <li key={appointment.id}>
                        <p>Durum: {appointment.status !== "pending" ? appointment.status :
                            <div>
                                <button onClick={() => handleApproveAppointment(appointment.id)}>Onayla</button>
                                <button onClick={() => handleDeclineAppointment(appointment.id)}>Reddet</button>
                            </div>
                        }</p>
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