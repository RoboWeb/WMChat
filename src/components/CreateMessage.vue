<template>
  <div class="container" style="margin-bottom: 30px">
    <form @submit.prevent="createMessage">
      <div class="form-group">
        <input
          type="text"
          name="message"
          class="form-control"
          placeholder="No, wpiszże co ..."
          v-model="newMessage"
        />
        <p class="text-danger" v-if="errorText">{{ errorText }}</p>
      </div>
      <button
        class="btn"
        :class="{ 'btn-primary': newMessage !== null }"
        type="submit"
        name="action"
        v-if="newMessage"
      >
        Leć ptaszyno...
      </button>
    </form>
  </div>
</template>

<script>
import fb from '@/firebase/init';
export default {
  name: 'CreateMessage',
  props: ['name'],
  data() {
    return {
      newMessage: null,
      errorText: null
    };
  },
  methods: {
    createMessage() {
      if (this.newMessage) {
        fb.collection('messages')
          .add({
            message: this.newMessage,
            name: this.name,
            timestamp: Date.now()
          })
          .catch(err => {
            console.log(err);
          });
        this.newMessage = null;
        this.errorText = null;
      } else {
        this.errorText = 'No ale wpiszże co najsampierf, taa?';
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
