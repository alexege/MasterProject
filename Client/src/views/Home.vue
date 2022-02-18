<template>
  <div class="container">
    <confirm-dialog ref="confirmDialog"></confirm-dialog>

    <edit-modal v-show="isModalVisible" @close="closeModal" :messageToEdit="messageToEdit" @update-message="updateMessage" />
    <div :class="{ 'blur-effect': isModalVisible }">
      <header>
        <h2 class="title">Public Forum</h2>
      </header>

      <!-- Message Input -->
      <div class="message message-add">
        <h5 class="title">Add a post</h5>
        <label for="Title">Title:</label>
        <input type="text" v-model="message.title" />
        <br />
        <label for="Body">Body:</label>
        <textarea v-model="message.body" />
        <br />
        <input type="submit" value="Submit" class="message-submit" @click="addMessage" />
      </div>

      <!-- Message -->
      <div class="message-container" v-for="message in allMessages" :key="message._id">
      <div class="message">

        <h5 class="title">{{ message.title }}</h5>
        
          <div class="author-details">
            <img src="../assets/default_profile.png" alt="default-profile-picture" class="profile-picture">
            <!-- Author -->
            <div v-if="allUsers">
              <p v-for="user in allUsers" :key="user._id">
                <span v-if="user._id == message.author">{{ user.username }}</span>
              </p>
            </div>
          </div>

        <div class="message-options" v-if="message && currentUser && currentUser.id == message.author">
          <div style="display: inline-block;">
          <span>{{ new Date(message.createdAt).toLocaleString() }}</span>
        </div>
          <a href="" @click.prevent="editMessage(message)"><font-awesome-icon icon="pencil-alt" /></a>
          <span @click.prevent="deleteMessage(message._id)"><font-awesome-icon icon="trash" /></span>
        </div>
        <p class="message-body">{{ message.body }}</p>

      </div>

        <!-- Comment Container -->
        <div comments-wrapper>
        <div v-for="comment in allComments" :key="comment._id" >
          <div v-if="message.comments.includes(comment._id)" class="comment-container">
            <div>
            <p v-for="user in allUsers" :key="user._id">
              <span v-if="user._id == comment.author" class="comment-user-info">[{{ user.username }}] : {{new Date(comment.createdAt).toLocaleTimeString()}} : <span style="color: white;">{{ comment.body }}</span></span>
                
                <!-- Edit Comment Body -->
                <div v-if="comment._id == commentToEdit._id && isEditingComment" class="comment-edit">
                  <textarea name="" id="" cols="30" rows="3" v-model="comment.body"></textarea>
                  <button @click.prevent="updateComment(comment)" >Save</button>
                  <button @click.prevent="cancel" >Cancel</button>
                </div>
                <div v-else>
                  {{ comment.body }}
                </div>
            </p>
            <div class="comment-options">
              <a href="" @click.prevent="updateComment(comment)" class="edit-btn" v-if="isEditingComment"><font-awesome-icon icon="check" /></a>
              <a href="" @click.prevent="editComment(comment)" class="edit-btn" v-else><font-awesome-icon icon="pencil-alt" /></a>
              <a href="" @click.prevent="deleteComment(comment._id)" class="delete-btn">
                <font-awesome-icon icon="trash" />
              </a>
            </div>
            </div>
          </div>
        </div>

        <!-- Add Comment -->
        <div class="comment-add-wrapper">
          <h5 for="comment-add">Add new comment </h5>
          <div class="comment-add-input-container">
            <input type="text" v-model="comment.body" @keyup.enter="addComment(message._id)" class="comment-add-input">
            <button @click="addComment(message._id)" class="comment-add-btn">Add</button>
          </div>
        </div>

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
      commentToEdit: {
        _id: null,
        body: null,
      },
      allMessages: null,
      allComments: null,
      allUsers: null,

      isModalVisible: false,

      isShow: true,

      isEditingComment: false,
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
      const data = {
        messageId: messageId,
        body: this.comment.body
      }

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

    deleteComment(comment) {

        this.$refs.confirmDialog.show({
        title: 'Delete Comment',
        message: 'Are you sure you want to delete this comment? It cannot be undone.',
        okButton: 'Delete',
        }).then((res, err) => {
          if (err) {
            res.status(500).send({ message: err });
          }
          if (res) {
              return this.$store.dispatch(`message/deleteComment`, comment).then(() => {
                this.getAllComments();
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
    
    editComment(comment) {
      this.isEditingComment = !this.isEditingComment;
      this.commentToEdit._id = comment._id;
      this.commentToEdit.body = comment.body;
    },

    updateMessage(id) {
      return this.$store.dispatch(`message/editMessage`, id).then(() => {
        this.isModalVisible = false;
        this.getAllMessages();
      });
    },

    updateComment(commentId) {
      this.isEditingComment = !this.isEditingComment;
      return this.$store.dispatch(`message/editComment`, commentId).then(() => {
        this.getAllComments();
      });
    },

    cancel() {
      this.isEditingComment = false;
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

.accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
}

.active, .accordion:hover {
  background-color: #ccc;
}

.panel {
  padding: 0 18px;
  background-color: white;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}

.blur-effect {
  -webkit-filter: blur(5px);
  /* -webkit-filter: blur(5px) grayscale(90%); */
}

.title {
  text-align: center;
  padding: 0.75em 1em;
}

.message {
  position: relative;
  border: 2px solid white;
  margin: 0.5em;
  padding: 0.5em;
  /* background-color: 	#2C2F33; */
  background-color: 	#1DB954;
  color: black;
  font-weight: 500;
  border: 2px solid black;
}

.message:hover {
  border: 2px solid orange;
}

.message > .title {
  text-align: center;
}

.message > .message-body {
  text-align: center;
}

.message > .message-options {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0.5em;
  /* cursor: pointer; */
}

.message > .author-details > .profile-picture {
   width: 75px; 
   height: 75px;
}

.message > .author-details {
  position: absolute;
  top: 0;
  left: 0;
  /* border: 1px solid black; */
  display: inline-block;
}

.message > .message-options > a,
span {
  margin: 0.25em;
  cursor: pointer;
}

.message-add {
  /* position: fixed; */
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 999999;
  bottom: 0;
  min-width: 1080px;
  margin: 0 auto;
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

.comment-add {

}

.comment-add-wrapper {
  text-align: center;
  background-color: black;
  border-radius: 5px;
  margin: 5px;
  padding: .25em;
  position: relative;
  transition: all .2s ease-in-out;
  width: 95%;
  margin-left: 2em;
}

.comment-add-input {
  display: inline-block;
  width: 80%;
  margin: 1em;
}

.comment-add-btn {
  color: #1DB954;
  background-color: black;
  border: 1px solid #1DB954;
  /* border-radius: 5px; */
  /* padding: 0.25em 1em; */
}

.comment-add-btn:hover {
  color: black;
  background-color: #1DB954;
}

.comment-add-input-container input,
.comment-add-input-container button {
  display: inline-block;
  margin: 0.25em 0.25em;
}

.comment-edit {
  text-align: center;
}

.comment-edit button {
  color: #1DB954;
  background-color: black;
  border: 2px solid #1DB954;
  margin: .25em;
}

.comment-edit button:hover {
  color: black;
  background-color: #1DB954;
  border: 2px solid black;
  margin: .25em;
}

.comment-container {
  border: 1px solid black;
  /* background-color: #23272A; */
  background-color: black;
  border-radius: 5px;
  margin: 5px;
  padding: .25em;
  position: relative;
  transition: all .2s ease-in-out;
  width: 95%;
  margin-left: 2em;
}

.comment-container:hover {
  border: 2px solid orange;
  transform: scale(1.1);
}

.comment-user-info {
  color: #1DB954;
}

.delete-btn {
  position: absolute;
  right: 10px;
  top: 20px;
}

.edit-btn {
  position: absolute;
  right: 40px;
  top: 20px;
}

textarea {
  width: 100%;
}
</style>
