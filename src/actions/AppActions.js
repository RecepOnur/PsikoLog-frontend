import { FETCH_PSYCHOLOGISTS, FETCH_PSYCHOLOGIST, FETCH_APPOINTMENTS, FETCH_COMMENTS, FETCH_BLOG_POST, FETCH_BLOG_POSTS } from "../constants/ActionTypes";
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

export const getBlogPost = (blogPost) => {
    dispatcher.dispatch({
        type: FETCH_BLOG_POST,
        payload: blogPost
    });
}

export const getBlogPosts = (psychologistId) => {
    dispatcher.dispatch({
        type: FETCH_BLOG_POSTS,
        payload: psychologistId
    });
}