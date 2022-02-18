import MessageService from '../services/message.service';
import UserService from '../services/user.service';

export const message = {
    namespaced: true,
    state: () => ({
        count: 0,
        message: {}
    }),
    actions: {
        addMessage({ commit }, message) {
            return MessageService.addMessage(message)
            .then(message => {
                commit('addMessageSuccess', message);
                return Promise.resolve(message);
            },
            error => {
                commit('addMessageFailure', message);
                return Promise.reject(error);
            });
        },

        addComment({ commit }, comment) {
            return MessageService.addComment(comment)
            .then(comment => {
                commit('addCommentSuccess', comment);
                return Promise.resolve(comment);
            },
            error => {
                commit('addCommentFailure', comment);
                return Promise.reject(error);
            });
        },

        deleteMessage({ commit }, message) {
            return MessageService.deleteMessage(message)
            .then(message => {
                commit('deleteMessageSuccess', message);
                return Promise.resolve(message);
            },
            error => {
                commit('deleteMessageFailure', message);
                return Promise.reject(error);
            });
        },

        deleteComment({ commit }, comment) {
            return MessageService.deleteComment(comment)
            .then(comment => {
                commit('deleteCommentSuccess', comment);
                return Promise.resolve(comment);
            },
            error => {
                commit('deleteCommentFailure', comment);
                return Promise.reject(error);
            });
        },

        editMessage({ commit }, message) {
            return MessageService.editMessage(message)
            .then(message => {
                commit('editMessageSuccess', message);
                return Promise.resolve(message);
            },
            error => {
                commit('editMessageFailure', message);
                return Promise.reject(error);
            });
        },

        editComment({ commit }, comment) {
            return MessageService.editComment(comment)
            .then(comment => {
                commit('editCommentSuccess', comment);
                return Promise.resolve(comment);
            },
            error => {
                commit('editCommentFailure', comment);
                return Promise.reject(error);
            });
        },

        getAllMessages({ commit }, message) {
            return MessageService.getAllMessages()
            .then(messages => {
                commit('getAllMessagesSuccess', message);
                return Promise.resolve(messages);
            },
            error => {
                commit('getAllMessagesFailure', message);
                return Promise.reject(error);
            });
        },
        
        getAllComments({ commit }, comments) {
            return MessageService.getAllComments()
            .then(comments => {
                commit('getAllCommentsSuccess', comments);
                return Promise.resolve(comments);
            },
            error => {
                commit('getAllCommmentsFailure', comments);
                return Promise.reject(error);
            });
        },
        
        getAllUsers({ commit }, user) {
            return UserService.getAllUsers()
            .then(users => {
                commit('getAllUsersSuccess', user);
                return Promise.resolve(users);
            },
            error => {
                commit('getAllUsersFailure', user);
                return Promise.reject(error);
            });
        },
    },
    mutations: {
        addMessageSuccess(state, message) {
            console.log("message is: ", message);
            console.log("State is: ", state.count);
            // return state.count++;
            state.message = message;
        },
        addMessageFailure(state, message) {
        },
        addCommentSuccess(state, comment) {
            console.log("comment is: ", comment);
            console.log("State is: ", state.count);
            // return state.count++;
            state.comment = comment;
        },
        addCommentsFailure(state, message) {
        },
        deleteMessageSuccess(state, message) {
        },
        deleteMessageFailure(state, message) {
        },
        deleteCommentSuccess(state, comment) {
        },
        deleteCommentFailure(state, comment) {
        },
        editMessageSuccess(state, message) {
        },
        editMessageFailure(state, message) {
        },
        editCommentSuccess(state, comment) {
        },
        editCommentFailure(state, comment) {
        },
        getAllMessagesSuccess(state, message) {
        },
        getAllMessagesFailure(state, message) {
        },
        getAllCommentsSuccess(state, message) {
        },
        getAllCommentsFailure(state, message) {
        },
        getAllUsersSuccess(state, message) {
        },
        getAllUsersFailure(state, message) {
        }
    }
};