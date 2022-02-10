<template>
  <div class="container">
    <confirm-dialog ref="confirmDialog"></confirm-dialog>

    <edit-modal
      v-show="isModalVisible"
      @close="closeModal"
      :messageToEdit="messageToEdit"
      @update-message="updateMessage"
    />
    <div :class="{ 'blur-effect': isModalVisible }">
      <header class="jumbotron">
        <h2 class="title">Public Forum</h2>
      </header>

      <div class="message">
        <label for="Title">Title:</label>
        <input type="text" v-model="message.title" />
        <br />
        <label for="Body">Body:</label>
        <textarea v-model="message.body" />
        <br />
        <input
          type="submit"
          value="Submit"
          class="message-submit"
          @click="addMessage"
        />
      </div>

      <!-- Message -->
      <div class="message-container" v-for="message in allMessages" :key="message._id">
      <div  class="message">
        <div class="message-options" v-if="message && currentUser && currentUser.id == message.author">
          <a href="" @click.prevent="editMessage(message)"><font-awesome-icon icon="pencil-alt" /></a>
          <span @click.prevent="deleteMessage(message._id)"><font-awesome-icon icon="trash" /></span>
        </div>
        <h5 class="title">{{ message.title }}</h5>
        <p class="message-body">{{ message.body }}</p>
        <div>
          <span>{{ new Date(message.createdAt).toLocaleString() }}</span> <br>
          <span>Comments: {{ message.comments.length }}</span>
          <div v-if="allUsers">
            <p v-for="user in allUsers" :key="user._id">
              <span v-if="user._id == message.author">{{ user.username }}</span>
            </p>
          </div>
        </div>
      </div>
        <div v-for="comment in allComments" :key="comment._id" >
          <div v-if="message.comments.includes(comment._id)" class="comment-container">
            <div>
            <p v-for="user in allUsers" :key="user._id">
              <span v-if="user._id == comment.author">[{{ user.username }}] : {{ comment.body }}</span>
            </p>
            <a href="" class="delete-btn">
              <font-awesome-icon icon="trash" />
            </a>
            </div>
            <!-- <p>{{ comment.body }}</p> -->
          </div>
        </div>
        <div>
          Comment
          <input type="text" v-model="comment.body">
          <button @click="addComment(message._id)">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditModal from '../components/editModal';
import ConfirmDialog from '../components/confirmDialog';

export default {
  name: 'Home',
  components: { EditModal, ConfirmDialog },
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
      comment: {
        body: null
      },
      allMessages: null,
      allComments: null,
      allUsers: null,

      isModalVisible: false
    };
  },
  methods: {
    addMessage() {
      //This is not the route. This is specifying the store (message) and then the action (addMessage)
      return this.$store
        .dispatch('message/addMessage', this.message)
        .then(() => {
          this.message.title = '';
          this.message.body = '';
          this.getAllMessages();
        });
    },

    addComment(messageId) {
      console.log("Adding a comment");
      const data = {
        messageId: messageId,
        body: this.comment.body
      }

      console.log("Message to add comment to: ", messageId);
      console.log("Comment body is: ", this.comment);
      return this.$store.dispatch('message/addComment', data)
        .then(() => {
          this.comment.body = '';
          this.getAllMessages();
          this.getAllComments();
        })
    },

    deleteMessage(msg) {

        this.$refs.confirmDialog.show({
        title: 'Delete Message',
        message: 'Are you sure you want to delete this message? It cannot be undone.',
        okButton: 'Delete',
        }).then((res, err) => {
          if (err) {
            res.status(500).send({ message: err });
          }
          if (res) {
              return this.$store.dispatch(`message/deleteMessage`, msg).then(() => {
                this.getAllMessages();
              });
          }
        })
    },

    doDelete() {
      this.$refs.confirmDialog.show({
      title: 'Delete Page',
      message: 'Are you sure you want to delete this page? It cannot be undone.',
      okButton: 'Delete Forever',
      }).then((res, err) => {
        if (err) {
          res.status(500).send({ message: err });
        }
          if (res) {
              alert('You have successfully delete this page.')
          }
      })
    },

    editMessage(message) {
      this.isModalVisible = true;
      this.messageToEdit._id = message._id;
      this.messageToEdit.title = message.title;
      this.messageToEdit.body = message.body;
      this.messageToEdit.author = message.author;
    },

    updateMessage(id) {
      return this.$store.dispatch(`message/editMessage`, id).then(() => {
        this.isModalVisible = false;
        this.getAllMessages();
      });
    },

    getCurrentUser() {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
    },

    getAllMessages() {
      return this.$store.dispatch('message/getAllMessages').then(res => {
        this.allMessages = res.data.messages;
      });
    },

    getAllComments() {
      return this.$store.dispatch('message/getAllComments').then(res => {
        this.allComments = res.data.comments;
      });
    },

    getAllUsers() {
      return this.$store.dispatch('message/getAllUsers').then(res => {
        this.allUsers = res.data.users;
      });
    },

    //Modal Logic
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  },

  computed: {
    currMessage() {
      return this.$store.state.message.message;
    }
  },

  mounted() {
    this.getCurrentUser();
    this.getAllMessages();
    this.getAllComments();
    this.getAllUsers();
  }
};
</script>
<style scoped>
.blur-effect {
  -webkit-filter: blur(5px) grayscale(90%);
}

.title {
  text-align: center;
  padding: 1em;
}

.message {
  position: relative;
  border: 1px solid black;
  margin: 0.5em;
  padding: 0.5em;
  background-color: rgb(235, 230, 230);
  border-radius: 10px;
}

.message:hover {
  background-color: rgba(235, 230, 230, 0.5);
}

.message > .title {
  text-align: center;
}

.message > .message-options {
  position: absolute;
  margin: 0.5em;
  /* cursor: pointer; */
  top: 0;
  right: 0;
}

.message > .message-options > a,
span {
  margin: 0.25em;
  cursor: pointer;
}

.message-delete {
  position: absolute;
  margin: 0.5em;
  padding: 0.25em;
  cursor: pointer;
  top: 0;
  right: 0;
}

.message-delete:hover {
  color: white;
}

.comment-container {
  border: 1px solid black;
  border-radius: 10px;
  margin: 5px;
  padding: .25em;
  position: relative;
}

.delete-btn {
  position: absolute;
  right: 10px;
  top: 20px;
}

textarea {
  width: 100%;
}
</style>
