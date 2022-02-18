<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.username}}</strong> Profile
      </h3>
    </header>
    <img src="../assets/default_profile.png" alt="default_profile" class="default-profile">
    <p>
      <strong>Token:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
    </ul>
    
    <!-- File Upload -->
    <div>
      <input type="file" @change="onFileSelected">
      <button @click="onUpload">Upload</button>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      selectedFile: null
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.file[0];
      console.log("event:", event);
    },
    onUpload() {
      const fd = new FormData();
      fd.append('image', this.selectedFile);
      console.log("Submitting: ", fd);
      this.$store.dispatch('auth/upload', this.user)
      .then((res) => {
        console.log("res:", res);
      });

      // axios.post('http://localhost:8080/api/upload')
      // .then((response) => {
      //   console.log(response);
      // })
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>
<style scoped>
.default-profile {
  width: 100px;
  height: 100px;
  margin: 1em 0;
}
</style>