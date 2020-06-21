<template>
  <div class="is-editor">
    <div class="is-content">
      <!-- <form @submit.prevent="createMessage"> -->
      <div class="field">
        <span class="control">
          <textarea
            @keyup.enter.exact="e => submitByEnter && createMessage(e)"
            class="textarea"
            :class="{ 'is-danger': errorText }"
            name="message"
            placeholder="No, wpiszże co..."
            v-model="newMessage"
            :rows="rows"
          ></textarea>
        </span>

        <p class="help is-danger" v-if="errorText">{{ errorText }}</p>
      </div>
      <div class="field">
        <div class="control has-text-right">
          <button
            class="button is-submit-button"
            :class="{ 'is-primary': newMessage !== null }"
            type="submit"
            name="action"
            @click="createMessage"
          >
            Leć ptaszyno...
          </button>
        </div>
      </div>
      <!-- </form> -->
    </div>
  </div>
</template>

<script>
import fb from '@/firebase/init';

export default {
  name: 'CreateMessage',
  props: ['name'],
  data() {
    return {
      rows: 5,
      newMessage: null,
      errorText: null,
      submitByEnter: true
    };
  },
  methods: {
    pureMessage() {
      this.newMessage = this.$sanitize(this.newMessage).replace(
        /\n/g,
        '<br />'
      );
    },
    createMessage() {
      if (this.newMessage) {
        this.pureMessage();

        fb.collection('messages')
          .add({
            message: this.newMessage,
            name: this.name,
            timestamp: Date.now()
          })
          .catch(err => {
            this.errorText = err;
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

<style lang="scss" scoped>
.is-submit-button {
  .material-design-icon {
    padding-top: 0.2em;
    margin-right: 0.4em;
  }
}
</style>
