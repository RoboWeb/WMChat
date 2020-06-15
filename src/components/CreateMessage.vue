<template>
  <article class="media">
    <!-- avatars here -->
    <div class="media-left">
      <figure class="image is-32x32">
        <slot name="avatar"></slot>
      </figure>
    </div>

    <div class="media-content">
      <div class="content">
        <form @submit.prevent="createMessage">
          <div class="field">
            <span class="control">
              <textarea
                class="textarea"
                :class="{ 'is-danger': errorText }"
                name="message"
                placeholder="No, wpiszże co..."
                v-model="newMessage"
              ></textarea>
            </span>

            <p class="help is-danger" v-if="errorText">{{ errorText }}</p>
          </div>
          <div class="field">
            <div class="control">
              <button
                class="button is-submit-button"
                :class="{ 'is-primary': newMessage !== null }"
                type="submit"
                name="action"
              >
                <send text="" :size="18" />
                Leć ptaszyno...
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </article>
</template>

<script>
import fb from '@/firebase/init';
import Send from 'vue-material-design-icons/SendOutline.vue';
export default {
  name: 'CreateMessage',
  props: ['name'],
  components: { Send },
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

<style lang="scss" scoped>
.is-submit-button {
  .material-design-icon {
    padding-top: 0.2em;
    margin-right: 0.4em;
  }
}
</style>
