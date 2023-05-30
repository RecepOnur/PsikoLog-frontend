import dispatcher from "../dispatcher/Dispatcher";
import { LOGIN_PATIENT, REGISTER_PATIENT } from "../constants/ActionTypes";

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