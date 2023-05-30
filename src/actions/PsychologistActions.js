import { LOGIN_PSYCHOLOGIST, REGISTER_PSYCHOLOGIST } from "../constants/ActionTypes";
import dispatcher from "../dispatcher/Dispatcher";

export const registerPsychologist = (user) => {
  dispatcher.dispatch({
    type: REGISTER_PSYCHOLOGIST,
    payload: user
  });
};

export const loginPsychologist = (user) => {
  dispatcher.dispatch({
    type: LOGIN_PSYCHOLOGIST,
    payload: user
  });
};