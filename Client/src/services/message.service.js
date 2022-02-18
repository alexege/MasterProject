import axios from 'axios';

const API_URL = 'http://localhost:8080/api/message/';


class MessageService {
    
    addMessage(msg) {
        const user = JSON.parse(localStorage.getItem('user'));

        return axios.post(API_URL + "addMessage", { 
            title: msg.title, 
            body: msg.body, 
            author: user.id
        })
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        })
    }

    addComment(data) {
        const user = JSON.parse(localStorage.getItem('user'));

        return axios.post(API_URL + "addComment", {
            messageId: data.messageId,
            body: data.body,
            author: user.id
        })
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        })
    }

    deleteMessage(id) {
        return axios.delete(API_URL + `deleteMessage/${id}`, { data: id })
        .then(res => {
            return res;
        })
        .catch(err => {
            return err;
        })
    }
   
    deleteComment(id) {
        return axios.delete(API_URL + `deleteComment/${id}`, { data: id })
        .then(res => {
            return res;
        })
        .catch(err => {
            return err;
        })
    }

    editMessage(msg) {
        return axios.post(API_URL + `edit/${msg._id}`, {
            title: msg.title,
            body: msg.body
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            return err;
        })
    }

    editComment(comment) {
        return axios.post(API_URL + `editComment/${comment._id}`, {
            body: comment.body
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            return err;
        })
    }

    getAllMessages() {
        return axios.get(API_URL + "allMessages")
        .then(res => {
            return res;
        })
        .catch(err => {
            return err;
        })
    }

    getAllComments() {
        return axios.get(API_URL + "allComments")
        .then(res => {
            return res;
        })
        .catch(err => {
            return err;
        })
    }
}

export default new MessageService();