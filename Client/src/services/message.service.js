import axios from 'axios';

const API_URL = 'http://localhost:8080/api/message/';
const user = JSON.parse(localStorage.getItem('user'));

class MessageService {
    addMessage(msg) {
        return axios.post(API_URL + "add", { 
            title: msg.title, 
            body: msg.body, 
            author: user.id
        })
        .then(res => {
            console.log("res: ", res);
            console.log("user: ", user.username);
        })
        .catch(err => {
            console.log("err: ", err);
        })
    }

    getAllMessages() {
        return axios.get(API_URL + "all")
        .then(res => {
            console.log("message: ", res);
            return res;
        })
        .catch(err => {
            return err;
        })
    }
}

export default new MessageService();