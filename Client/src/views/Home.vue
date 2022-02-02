<template>
  <div class="container">
    <header class="jumbotron">

      <span v-if="currentUser && currentUser.username">Current: {{ currentUser.username }}</span><br>
      <span v-if="currentUser && currentUser.username">Roles: {{ currentUser.roles }}</span>

      <h2 class="title">Message Board</h2>

      <!-- Message template -->
      <div class="message">
        <label for="Title">Title:</label>
        <input type="text" v-model="message.title">
        <br/>
        <label for="Body">Body:</label>
        <textarea v-model="message.body" />
        <br/>
        <input type="submit" value="Submit" class="message-submit" @click="addMessage">
      </div>

      <div v-for="message in allMessages" :key="message._id" class="message">
        <h5 class="title">{{ message.title }}</h5>
        <p>{{ message.body }}</p>
        <p>{{ message.author }}</p> <br>
        <br>
        {{ message }}
      </div>

    </header>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
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
      return this.$store.dispatch('message/addMessage', this.message)
      .then(() => {
        this.message.title = '';
        this.message.body  = '';
        this.getAllMessages();
      });
    },

    getCurrentUser() {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
    },

    getAllMessages() {
      return this.$store.dispatch('message/getAllMessages')
      .then(res => {
        this.allMessages = res.data.messages;
      })
    }
  },

  mounted() {
    this.getCurrentUser();
    this.getAllMessages();

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
  },
  computed: {
    isTrue (){
      return 1 + 1 == 3;
    }
  }
};
</script>
<style scoped>

.title {
  text-align: center;
  padding: 1em;
}

.message {
  border: 1px solid black;
  padding: 1em;
  margin: .5em;
}

.message > .title {
  text-align: center;
}

.message-submit {

}

textarea {
  width: 100%;
}
</style>