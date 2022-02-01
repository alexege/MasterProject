<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{content}}</h3>

      <h2>Message Board</h2>
      <div v-for="message in allMessages" :key="message._id">
        <h5>{{ message.title }}</h5>
        <p>{{ message.body }}</p>
      </div>

      <span v-if="currentUser && currentUser.username">Current: {{ currentUser.username }}</span>
       <br>
      <span v-if="allMessages">All:{{ allMessages }}</span>

      <!-- Message template -->
      <div>
        <label for="Title">Title:</label>
        <input type="text" v-model="message.title">
        <br/>
        <label for="Body">Body:</label>
        <input type="text" v-model="message.body">
        <br/>
        <input type="submit" value="Send" @click="addMessage">
      </div>

    </header>
  </div>
</template>

<script>
// import UserService from '../services/user.service';
// import MessageService from '../services/message.service';

export default {
  name: 'Home',
  data() {
    return {
      content: '',
      currentUser: null,
      message: {
        title: null,
        body: null
      },
      allMessages: null
    };
  },
  methods: {
    addMessage() {
      // return this.$store.dispatch('message/addMessage', this.message)
      return this.$store.dispatch('message/addMessage', this.message)
      // .then(data => { this.allMessages = data; },
      .then(data => {
        this.message.title = '';
        this.message.body = '';
        console.log("data: ", data);
      },
      error => {
        console.log("Error:", error);
      })
      //.then(data => {
      //   this.allMessages = data;
      // })
    },
    getCurrentUser() {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
    },

    getAllMessages() {
      console.log("Getting all messages");
      return this.$store.dispatch('message/getAllMessages')
      // .then(data => {
      //   console.log("AllMesssages: ", data);
      // })
    }
  },
  mounted() {
    this.getCurrentUser();
    this.getAllMessages();
    // MessageService.getAllMessages()
    // .then(res => this.content = res.data),
    // error => {
    //   this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    // }

    // UserService.getPublicContent().then(
    //   response => {
    //     this.content = response.data;
    //   },
    //   error => {
    //     this.content =
    //       (error.response && error.response.data && error.response.data.message) ||
    //       error.message ||
    //       error.toString();
    //   }
    // );
  }
};
</script>
