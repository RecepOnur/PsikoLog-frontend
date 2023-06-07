import dispatcher from "../dispatcher/Dispatcher";
import { LOGIN_PATIENT, REGISTER_PATIENT, CREATE_APPOINTMENT, DELETE_APPOINTMENT, ADD_COMMENT } from "../constants/ActionTypes";

export const registerPatient = (user) => {
  console.log("PatientActions registerPatient");
  dispatcher.dispatch({
    type: REGISTER_PATIENT,
    payload: user
  });
};

export const loginPatient = (user) => {
  dispatcher.dispatch({
    type: LOGIN_PATIENT,
    payload: user
  });
};

export const createAppointment = (form) => {
  dispatcher.dispatch({
    type: CREATE_APPOINTMENT,
    payload: form
  });
};

export const deleteAppointment = (appointment) => {
  dispatcher.dispatch({
    type: DELETE_APPOINTMENT,
    payload: appointment
  });
};

export const addComment = (comment) => {
  dispatcher.dispatch({
    type: ADD_COMMENT,
    payload: comment
  });
};

