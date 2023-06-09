import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/Dispatcher';
import myAxios from '../config';
import { SEND_MESSAGE, FETCH_CHAT_HISTORY, FETCH_PARTICIPANTS, MESSAGE_SENT, CHAT_HISTORY_FETCHED, PARTICIPANTS_FETCHED } from '../constants/ActionTypes';

class MessageStore extends EventEmitter {

    handleAction(action) {
        switch (action.type) {
            case SEND_MESSAGE:
                this.sendMessage(action.payload);
                break;
            case FETCH_CHAT_HISTORY:
                this.getChatHistory(action.payload);
                break;
            case FETCH_PARTICIPANTS:
                this.getParticipants();
                break;
            default:
                console.log("AppStore default");
                break;
        }
    }

    sendMessage(message){
        const { to, text } = message;
        console.log("Store sendMessage: " + to + " " + text);
        myAxios.post('/sendMessage/', { to, text })
            .then(response => response.data)
            .then(data => {
                if (data.success) {
                    // Basariliysa emit islemi gerceklestir.
                    this.emit(MESSAGE_SENT, data.message);
                } else {
                    // Hata durumu
                }
            })
            .catch(error => {
                console.error('Mesaj gonderme hatasi:', error);
            });
    }
    
    getChatHistory(userId) {
        const { id } = userId;
        myAxios.get('/chats/' + id)
            .then(response => response.data)
            .then(data => {
                if (data.success) {
                    // Basariliysa emit islemi gerceklestir.
                    this.emit(CHAT_HISTORY_FETCHED, data.messages);
                } else {
                    // Hata durumu
                }
            })
            .catch(error => {
                console.error('Sohbet gecmisi hatasi:', error);
            });
    }

    getParticipants() {
        console.log("getParticipants");
        myAxios.get('/participants/')
            .then(response => response.data)
            .then(data => {
                if (data.success) {
                    // Basariliysa emit islemi gerceklestir.
                    this.emit(PARTICIPANTS_FETCHED, data.participants);
                } else {
                    // Hata durumu
                }
            })
            .catch(error => {
                console.error('Mesajlasilan kisi listesi hatasi:', error);
            });
    }

}

const messageStore = new MessageStore();
dispatcher.register(messageStore.handleAction.bind(messageStore));

export default messageStore;