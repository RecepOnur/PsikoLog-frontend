import { FETCH_PSYCHOLOGISTS, FETCH_PSYCHOLOGIST, FETCH_APPOINTMENTS, FETCH_COMMENTS } from "../constants/ActionTypes";
import dispatcher from "../dispatcher/Dispatcher";

export const getPsychologists = () => {
    dispatcher.dispatch({
        type: FETCH_PSYCHOLOGISTS
    });
}

export const getPsychologist = (user) => {
    dispatcher.dispatch({
        type: FETCH_PSYCHOLOGIST,
        payload: user
    });
}

export const getAppointments = (user) => {
    dispatcher.dispatch({
        type: FETCH_APPOINTMENTS,
        payload: user
    });
}

export const getComments = (psychologist) => {
    dispatcher.dispatch({
        type: FETCH_COMMENTS,
        payload: psychologist
    });
}