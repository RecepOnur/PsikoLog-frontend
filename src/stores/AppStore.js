import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/Dispatcher';
import axios from '../config';
import {FETCH_PSYCHOLOGISTS, PSYCHOLOGISTS_FETCHED, } from '../constants/ActionTypes';

class AppStore extends EventEmitter {

  handleAction(action) {
    console.log("handleAction AppStore");
    switch (action.type) {
      case FETCH_PSYCHOLOGISTS:
        console.log("FETCH PSYCHOLOGIST case");
        this.getPsychologists();
        break;
      default:
        console.log("AppStore default");
        break;
    }
  }

  getPsychologists() {
    console.log("getPsychologist AppStore");
    axios.get('/psychologists', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
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
}

const appStore = new AppStore();
dispatcher.register(appStore.handleAction.bind(appStore));

export default appStore;