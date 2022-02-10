<template>
  <div>
    <div class="background" @click.self="close">
      <div class="content">
        <h4>Edit Message</h4>
        <label for="">Title:</label><br />
        <input type="text" v-model="messageToEdit.title" /> <br />
        <label for="">Body:</label><br />
        <textarea
          name="messageToEditBody"
          id=""
          cols="30"
          rows="10"
          v-model="messageToEdit.body"
        ></textarea
        ><br />
        <input
          type="button"
          value="Update"
          @click="updateMessage(messageToEdit)"
        />
        <button type="button" class="btn-close" @click="close">x</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Modal',
  props: ['messageToEdit'],
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit('close');
    },

    updateMessage(message) {
      this.$emit('update-message', message);
    }
  }
};
</script>
<style scoped>
.btn-close {
  position: absolute;
  top: 10px;
  right: 10px;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
}

.content {
  position: relative;
  min-width: 800px;
  min-height: 400px;
  border: 2px solid black;
  border-radius: 10px;
  padding: 1em;
  background-color: rgba(255, 255, 255, 0.75);
  text-align: center;
}
</style>
