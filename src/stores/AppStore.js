import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/Dispatcher';
import myAxios from '../config';
import { FETCH_PSYCHOLOGISTS, PSYCHOLOGISTS_FETCHED, FETCH_PSYCHOLOGIST, PSYCHOLOGIST_FETCHED, FETCH_APPOINTMENTS, APPOINTMENTS_FETCHED, FETCH_COMMENTS, COMMENTS_FETCHED } from '../constants/ActionTypes';
import { PATIENT, PSYCHOLOGIST } from '../constants/UserTypes';

class AppStore extends EventEmitter {

  handleAction(action) {
    console.log("handleAction AppStore");
    switch (action.type) {
      case FETCH_PSYCHOLOGISTS:
        console.log("FETCH PSYCHOLOGISTS case");
        this.getPsychologists();
        break;
      case FETCH_PSYCHOLOGIST:
        console.log("FETCH PSYCHOLOGIST case");
        this.getPsychologist(action.payload);
        break;
      case FETCH_APPOINTMENTS:
        console.log("FETCH APPOINTMENTS case");
        this.getAppointments(action.payload);
        break;
      case FETCH_COMMENTS:
        this.getComments(action.payload);
        break;
      default:
        console.log("AppStore default");
        break;
    }
  }

  getPsychologists() {
    console.log("getPsychologists AppStore");
    myAxios.get('/psychologists')
      .then(response => response.data)
      .then(data => {
        if (data.success) {
          // Basariliysa emit islemi gerceklestir.
          this.emit(PSYCHOLOGISTS_FETCHED, data.psychologists);
        } else {
          // Hata durumu
        }
      })
      .catch(error => {
        console.error('Psikolog listesi hatasi:', error);
      });
  }

  getPsychologist(user) {
    const { id } = user;
    console.log("USER ID: " + id);
    myAxios.get('/psychologists/' + id)
      .then(response => response.data)
      .then(data => {
        if (data.success) {
          // Basariliysa emit islemi gerceklestir.
          this.emit(PSYCHOLOGIST_FETCHED, data.psychologist);
        } else {
          // Hata durumu
        }
      })
      .catch(error => {
        console.error('Psikolog id hatasi:', error);
      });
  }

  getAppointments(user) {
    const { id, userType } = user;
    console.log("getAppointments appStore: " + id);
    if (userType === PATIENT) {
      myAxios.get('/patient/' + id + '/appointments')
        .then(response => response.data)
        .then(data => {
          if (data.success) {
            // Basariliysa emit islemi gerceklestir.
            this.emit(APPOINTMENTS_FETCHED, data.appointments);
          } else {
            // Hata durumu
          }
        })
        .catch(error => {
          console.error('Hasta Randevulari alma hatasi:', error);
        });
    }
    else if (userType === PSYCHOLOGIST) {
      console.log(userType + " id: " + id);
      myAxios.get('/psychologist/appointments')
        .then(response => response.data)
        .then(data => {
          if (data.success) {
            // Basariliysa emit islemi gerceklestir.
            this.emit(APPOINTMENTS_FETCHED, data.appointments);
          } else {
            // Hata durumu
          }
        })
        .catch(error => {
          console.error('Psikolog Randevulari alma hatasi:', error);
        });
    }
    else {
      console.log("getAppointments userType error!");
    }
  }

  getComments(psychologist) {
    const { id } = psychologist;
    console.log("Psychologist ID: " + id);
    myAxios.get('/psychologist/' + id + '/comments')
      .then(response => response.data)
      .then(data => {
        if (data.success) {
          // Basariliysa emit islemi gerceklestir.
          this.emit(COMMENTS_FETCHED, data.comments);
        } else {
          // Hata durumu
        }
      })
      .catch(error => {
        console.error('Yorumlari alma hatasi:', error);
      });
  }


}

const appStore = new AppStore();
dispatcher.register(appStore.handleAction.bind(appStore));

export default appStore;