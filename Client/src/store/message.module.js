import MessageService from '../services/message.service';

const initialState =  {
    msg: 'default value'
};

export const message = {
    namespaced: true,
    state: initialState,
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
            })
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
            //Do something
            // state.initialState.msg = "success";
            console.log("Message:", message);
        },
        addMessageFailure(state, message) {
            // state.initialState.msg = "failure";
            console.log("Message:", message);
        },
        getAllMessagesSuccess(state, message) {
            console.log("Message:", message);
            // Do something
        },
        getAllMessagesFailure(state, message) {
            // Do something
            console.log("Message:", message);
        }
    }
};