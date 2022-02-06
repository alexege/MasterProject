import MessageService from '../services/message.service';

export const message = {
    namespaced: true,
    state: () => ({
        count: 0
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
    },
    mutations: {
        addMessageSuccess(state, message) {
            console.log("message is: ", message);
            console.log("State is: ", state.count);
            return state.count++;
        },
        addMessageFailure(state, message) {
        },
        deleteMessageSuccess(state, message) {
        },
        deleteMessageFailure(state, message) {
        },
        editMessageSuccess(state, message) {
        },
        editMessageFailure(state, message) {
        },
        getAllMessagesSuccess(state, message) {
        },
        getAllMessagesFailure(state, message) {
        }
    }
};