import axios from 'axios';

const API_URL = 'http://localhost:8080/api/message/';


class MessageService {
    
    addMessage(msg) {

        const user = JSON.parse(localStorage.getItem('user'));

        console.log("Adding id as author: ", user.id);
        return axios.post(API_URL + "add", { 
            title: msg.title, 
            body: msg.body, 
            author: user.id
        })
        .then(res => {
            console.log("res: ", res);
            console.log("user: ", user.username);
            return res.data;
        })
        .catch(err => {
            console.log("err: ", err);
        })
    }

    deleteMessage(id) {
        console.log("deleteMessage: ", id);
        return axios.delete(API_URL + `delete/${id}`, { data: id })
        .then(res => {
            console.log("res: ", res);
            return res;
        })
        .catch(err => {
            console.log("err: ", err);
        })
    }

    editMessage(msg) {
        console.log("test edit:", msg);
        return axios.post(API_URL + `edit/${msg._id}`, {
            title: msg.title,
            body: msg.body
        })
        .then(res => {
            console.log("res: ", res);
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