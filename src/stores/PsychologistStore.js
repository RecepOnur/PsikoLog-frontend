import { EventEmitter } from 'events';
import { LOGIN_PSYCHOLOGIST, PSYCHOLOGIST_LOGGEDIN, PSYCHOLOGIST_REGISTERED, REGISTER_PSYCHOLOGIST, PSYCHOLOGIST_REGISTER_ERROR, PSYCHOLOGIST_LOGIN_ERROR, APPROVE_APPOINTMENT, APPOINTMENT_APPROVED, DECLINE_APPOINTMENT, APPOINTMENT_DECLINED, CREATE_BLOG_POST, BLOG_POST_CREATED } from '../constants/ActionTypes';
import dispatcher from '../dispatcher/Dispatcher';
import myAxios from '../config';

class PsychologistStore extends EventEmitter {

  handleAction(action) {
    switch (action.type) {
      case REGISTER_PSYCHOLOGIST:
        this.registerPsychologist(action.payload);
        break;
      case LOGIN_PSYCHOLOGIST:
        this.loginPsychologist(action.payload);
        break;
      case APPROVE_APPOINTMENT:
        this.approveAppointment(action.payload);
        break;
      case DECLINE_APPOINTMENT:
        this.declineAppointment(action.payload);
        break;
      case CREATE_BLOG_POST:
        this.createBlogPost(action.payload);
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
    myAxios.post('/psychologist/register', { name, surname, email, password })
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
    const { email, password } = user;

    // Psikolog girişi için gerekli HTTP POST isteği yap
    myAxios.post('/psychologist/login', { email, password })
      .then(response => response.data)
      .then(data => {
        console.log("Data:", data);
        if (data.success) {
          // Psikolog başarıyla giriş yaptığında emit işlemi gerçekleştir
          this.emit(PSYCHOLOGIST_LOGGEDIN, data.token);
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

  approveAppointment(appointmentId) {
    myAxios.patch('/psychologist/appointments/' + appointmentId + '/approve')
      .then(response => response.data)
      .then(data => {
        if (data.success) {
          // Randevu basariyla onaylandi.
          this.emit(APPOINTMENT_APPROVED);
        } else {
          // Hata
        }
      })
      .catch(error => {
        console.error('Psikolog randevu onaylama hatasi:', error);
      });
  }

  declineAppointment(appointmentId) {
    myAxios.patch('/psychologist/appointments/' + appointmentId + '/decline')
      .then(response => response.data)
      .then(data => {
        if (data.success) {
          // Randevu basariyla onaylandi.
          this.emit(APPOINTMENT_DECLINED);
        } else {
          // Hata
        }
      })
      .catch(error => {
        console.error('Psikolog randevu reddetme hatasi:', error);
      });
  }

  createBlogPost(post) {

    const { title, content } = post;

    // Blog yazisi eklemek için gerekli HTTP POST isteği yap
    myAxios.post('/createBlogPost', { title, content })
      .then(response => response.data)
      .then(data => {
        console.log("Data:", data);
        if (data.success) {
          // Blog yazısı eklendiğinde emit işlemi gerçekleştir
          this.emit(BLOG_POST_CREATED, data);
        } else {
          // Hata
        }
      })
      .catch(error => {
        console.error('Blog yazisi olusturma hatasi:', error);
      });
  }

}

const psychologistStore = new PsychologistStore();
dispatcher.register(psychologistStore.handleAction.bind(psychologistStore));

export default psychologistStore;