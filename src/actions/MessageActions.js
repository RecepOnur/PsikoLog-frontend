import { FETCH_CHAT_HISTORY, FETCH_PARTICIPANTS, SEND_MESSAGE } from "../constants/ActionTypes";
import dispatcher from "../dispatcher/Dispatcher";

export const sendMessage = (message) => {
    dispatcher.dispatch({
        type: SEND_MESSAGE,
        payload: message
    });
}

export const getChatHistory = (participant) => {
    dispatcher.dispatch({
        type: FETCH_CHAT_HISTORY,
        payload: participant
    });
}

export const getParticipants = () => {
    console.log("getParticipants");
    dispatcher.dispatch({
        type: FETCH_PARTICIPANTS
    });
}