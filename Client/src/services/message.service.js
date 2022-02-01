import axios from 'axios';

const API_URL = 'http://localhost:8080/api/message/';
const user = JSON.parse(localStorage.getItem('user'));

class MessageService {
    addMessage(msg) {
        return axios.post("http://localhost:8080/api/message/add", { 
            title: msg.title, 
            body: msg.body, 
            author: user.id
        })
        .then(res => {
            console.log("res: ", res);
        })
        .catch(err => {
            console.log("err: ", err);
        })
        // console.log("addMessage - message.service.js");
        // return axios.post(API_URL + 'add', {
        //     title: "test",
        //     body: "test body"
        // })
        // .then(res => {
        //     console.log("res:", res);
        // })
        // .catch(err => {
        //     console.log("error while adding message: ", err);
        // })
    }

    getAllMessages() {

        //re-implement API_URL string
        return axios.get("http://localhost:8080/api/message/all")
        .then(res => console.log("res:", res))
        .catch(err => console.log("err:", err))
    }
}

export default new MessageService();