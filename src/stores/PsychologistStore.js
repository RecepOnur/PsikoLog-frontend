import { EventEmitter } from 'events';
import { LOGIN_PSYCHOLOGIST, PSYCHOLOGIST_LOGGEDIN, PSYCHOLOGIST_REGISTERED, REGISTER_PSYCHOLOGIST, PSYCHOLOGIST_REGISTER_ERROR, PSYCHOLOGIST_LOGIN_ERROR } from '../constants/ActionTypes';
import dispatcher from '../dispatcher/Dispatcher';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000'

class PsychologistStore extends EventEmitter {
  constructor() {
    super();
  }

  handleAction(action) {
    switch (action.type) {
      case REGISTER_PSYCHOLOGIST:
        this.registerPsychologist(action.payload);
        break;
      case LOGIN_PSYCHOLOGIST:
        this.loginPsychologist(action.payload);
        break;
      default:
        console.log("PsychologistStore default");
        break;
    }
  }

  registerPsychologist(user) {

    // Psikolog kaydı için gerekli bilgileri al
    const { name, surname, email, password } = user;

    // Psikolog kaydı için gerekli HTTP POST isteği yap
    axios.post('/psychologist/register', { name, surname, email, password }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.data)
      .then(data => {
        console.log("Data:", data);
        if (data.success) {
          // Psikolog başarıyla kaydedildiğinde emit işlemi gerçekleştir
          this.emit(PSYCHOLOGIST_REGISTERED);
        } else {
          // Hata durumunda emit işlemi gerçekleştir
          this.emit(PSYCHOLOGIST_REGISTER_ERROR);
        }
      })
      .catch(error => {
        console.error('Psikolog kaydi hatasi:', error);
        this.emit(PSYCHOLOGIST_REGISTER_ERROR);
      });
  }

  loginPsychologist(user) {

    //Psikolog giriş bilgilerini al
    const {email, password} = user;

    // Psikolog girişi için gerekli HTTP POST isteği yap
    axios.post('/psychologist/login', { email, password }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.data)
      .then(data => {
        console.log("Data:", data);
        if (data.success) {
          // Psikolog başarıyla giriş yaptığında emit işlemi gerçekleştir
          this.emit(PSYCHOLOGIST_LOGGEDIN);
        } else {
          // Hata durumunda emit işlemi gerçekleştir
          this.emit(PSYCHOLOGIST_LOGIN_ERROR);
        }
      })
      .catch(error => {
        console.error('Psikolog giris hatasi:', error);
        this.emit(PSYCHOLOGIST_LOGIN_ERROR);
      });
  }

}

const psychologistStore = new PsychologistStore();
dispatcher.register(psychologistStore.handleAction.bind(psychologistStore));

export default psychologistStore;