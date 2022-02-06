<template>
  <div class="container">
    <header class="jumbotron">

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

      <div v-if="editMode">
        <div class="message">
          <label for="">Title:</label>
          <input type="text" v-model="messageToEdit.title"> <br>
          <label for="">Body:</label>
          <textarea name="messageToEditBody" id="" cols="30" rows="10" v-model="messageToEdit.body"></textarea>
          <br>
          <p>Author: {{ messageToEdit.author }}</p>
          <input type="button" value="Update" @click="updateMessage(messageToEdit._id)">
        </div>
      </div>

      <div v-for="message in allMessages" :key="message._id" class="message">
        <h5 class="title">{{ message.title }}</h5>
        <p>{{ message.body }}</p>
        <br>
        {{ message }}
        <p>Author: {{ message.author }}</p>
        <input type="button" value="edit" @click="editMessage(message._id, message.title, message.body, message.author)">
        <input type="submit" value="Delete" class="message-delete" @click="deleteMessage(message._id)">
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
      messageToEdit: {
        title: null,
        body: null,
        author: null
      },
      editMode: false,
      allMessages: null
    };
  },
  methods: {
    addMessage() {
      //This is not the route. This is specifying the store (message) and then the action (addMessage)
      return this.$store.dispatch('message/addMessage', this.message)
      .then(() => {
        this.message.title = '';
        this.message.body  = '';
        this.getAllMessages();
      });
    },

    deleteMessage(id) {
      return this.$store.dispatch(`message/deleteMessage`, id)
      .then(() => {
        this.getAllMessages();
      })
    },

    editMessage(id, title, body, author) {
      console.log("Editing message with id: ", id);
      this.editMode = !this.editMode;
      this.messageToEdit._id = id;
      this.messageToEdit.title = title;
      this.messageToEdit.body = body;
      this.messageToEdit.author = author;
    },

    updateMessage() {
      return this.$store.dispatch(`message/editMessage`, this.messageToEdit)
      .then(() => {
        this.editMode = !this.editMode;
      })
      .catch(err => console.log("error:", err));
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
  background-color:rgb(235, 230, 230);
}

.message > .title {
  text-align: center;
}

textarea {
  width: 100%;
}
</style>