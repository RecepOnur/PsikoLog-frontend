import { FETCH_PSYCHOLOGISTS } from "../constants/ActionTypes";
import dispatcher from "../dispatcher/Dispatcher";

export const getPsychologists = () => {
    dispatcher.dispatch({
        type: FETCH_PSYCHOLOGISTS
    });
}