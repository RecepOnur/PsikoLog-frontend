import { EventEmitter } from 'events';
import { LOGIN_PATIENT, PATIENT_LOGGEDIN, PATIENT_REGISTERED, REGISTER_PATIENT, PATIENT_REGISTER_ERROR, PATIENT_LOGIN_ERROR } from '../constants/ActionTypes';
import dispatcher from '../dispatcher/Dispatcher';
import axios from '../config';

class PatientStore extends EventEmitter {

  handleAction(action) {
    console.log("PatientStore handleAction");
    switch (action.type) {
      case REGISTER_PATIENT:
        console.log("PatientStore REGISTER_PATIENT case");
        this.registerPatient(action.payload);
        break;
      case LOGIN_PATIENT:
        console.log("PatientStore LOGIN_PATIENT case");
        this.loginPatient(action.payload);
        break;
      default:
        console.log("PatientStore default");
        break;
    }
  }

  registerPatient(user) {
    console.log("PatientStore registerPatient calisti.");

    // Hasta kaydı için gerekli bilgileri al
    const { name, surname, email, password } = user;

    // Hasta kaydı için gerekli HTTP POST isteği yap
    axios.post('/patient/register', { name, surname, email, password }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.data)
      .then(data => {
        console.log("Data:", data);
        if (data.success) {
          // Hasta başarıyla kaydedildiğinde emit işlemi gerçekleştir
          console.log("PATIENT_REGISTERED emit.");
          this.emit(PATIENT_REGISTERED);
        } else {
          // Hata durumunda emit işlemi gerçekleştir
          this.emit(PATIENT_REGISTER_ERROR);
        }
      })
      .catch(error => {
        console.error('Hasta kaydi hatasi:', error);
        this.emit(PATIENT_REGISTER_ERROR);
      });
  }

  loginPatient(user) {

    //Hasta giriş bilgilerini al
    const {email, password} = user;

    // Hasta girişi için gerekli HTTP POST isteği yap
    axios.post('/patient/login', { email, password }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.data)
      .then(data => {
        console.log("Data:", data);
        if (data.success) {
          // Hasta başarıyla giriş yaptığında emit işlemi gerçekleştir
          console.log("PATIENT_LOGIN emit.");
          this.emit(PATIENT_LOGGEDIN, data.token);
        } else {
          // Hata durumunda emit işlemi gerçekleştir
          console.log("ERROR_EVENT emit.");
          this.emit(PATIENT_LOGIN_ERROR);
        }
      })
      .catch(error => {
        console.error('Hasta giris hatasi:', error);
        this.emit(PATIENT_LOGIN_ERROR);
      });
  }

}

const patientStore = new PatientStore();
dispatcher.register(patientStore.handleAction.bind(patientStore));

export default patientStore;