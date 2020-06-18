<template>
  <div class="container">
    <div class="columns is-centered is-chat">
      <div
        class="column is-12 is-messages-block"
        v-chat-scroll="{ always: false, smooth: true }"
      >
        <single-message v-if="messages.length === 0">
          Na razie nikt nie godo... :(
        </single-message>

        <single-message
          v-for="message in messages"
          :key="message.id"
          :id="message.id"
          :author="message.name"
          :timestamp="message.timestamp"
          :class="{ 'is-main': isMaine(message.name) }"
        >
          <template v-slot:avatar>
            <img src="../assets/logo.png" alt="Logo" />
          </template>
          <span v-html="message.message"></span>
          <template v-slot:actions>
            <!-- cite -->
            <button
              v-if="!isMaine(message.name)"
              class="button  is-light is-primary is-rounded"
              title="Odpowiedz"
            >
              <reply title="" :size="18" />
            </button>

            <!-- love -->
            <button
              v-if="!isMaine(message.name)"
              class="button  is-light is-primary is-rounded"
              title="Uwielbiam"
            >
              <heart title="" :size="18" />
            </button>

            <!-- like -->
            <button
              v-if="!isMaine(message.name)"
              class="button  is-light is-primary is-rounded"
              title="Podoba mi się"
            >
              <like title="" :size="18" />
            </button>

            <!-- unlike -->
            <button
              v-if="!isMaine(message.name)"
              class="button  is-light is-primary is-rounded"
              title="Niepodoba mi się"
            >
              <unlike title="" :size="18" />
            </button>

            <!-- edit -->
            <button
              v-if="isMaine(message.name) || iAmMod()"
              class="button  is-light is-primary is-rounded"
              title="Popraw"
            >
              <pencil title="" :size="18" />
            </button>

            <!-- remove -->
            <button
              v-if="isMaine(message.name) || iAmMod()"
              class="button  is-light is-danger is-rounded"
              title="Usuń"
            >
              <trash title="" :size="18" />
            </button>
          </template>
        </single-message>
      </div>
    </div>

    <div class="columns is-centered">
      <div class="column is-12 is-form-block">
        <CreateMessage :name="name">
          <template v-slot:avatar>
            <img src="../assets/logo.png" alt="Logo" />
          </template>
        </CreateMessage>
      </div>
    </div>
  </div>
</template>

<script>
import { NAME, VERSION } from '@/app.conf';
import SingleMessage from '@/components/SingleMessage';
import CreateMessage from '@/components/CreateMessage';
import fb from '@/firebase/init';

import Trash from 'vue-material-design-icons/TrashCanOutline.vue';
import Pencil from 'vue-material-design-icons/PencilOutline.vue';
import Reply from 'vue-material-design-icons/CommentQuoteOutline';
import Heart from 'vue-material-design-icons/HeartOutline';
import Unlike from 'vue-material-design-icons/ThumbDownOutline';
import Like from 'vue-material-design-icons/ThumbUpOutline';

export default {
  name: 'Chat',
  props: ['name'],
  components: {
    CreateMessage,
    SingleMessage,
    Trash,
    Pencil,
    Reply,
    Heart,
    Like,
    Unlike
  },
  data() {
    return {
      messages: [],

      hidden: false,
      docTitle: NAME + ' - ' + VERSION,
      scrollTitle: {
        interval: 1000,
        timer: null,
        title: this.docTitle,
        titleElements: []
      }
    };
  },
  watch: {
    hidden: function(params) {
      if (!params) {
        this.scrollTitle.title = this.docTitle;
        this.scrollTitle.titleElements = [];
        clearInterval(this.scrollTitle.timer);
      }
    },
    'scrollTitle.title': function(nVal) {
      document.title = nVal;
    }
  },
  methods: {
    scrollTheTitle: function(newMessageAuthor) {
      clearInterval(this.scrollTitle.timer);
      this.scrollTitle.titleElements = [
        'Nowa',
        'wiadomość',
        `od @${newMessageAuthor}!`,
        `${this.docTitle} | `
      ];
      this.scrollTitle.title = this.scrollTitle.titleElements.join(' ');
      this.scrollTitle.timer = setInterval(
        this.computeScrolledTitle,
        this.scrollTitle.interval
      );
    },
    computeScrolledTitle: function() {
      let shifted = this.scrollTitle.titleElements.shift();
      this.scrollTitle.titleElements.push(shifted);
      this.scrollTitle.title = this.scrollTitle.titleElements.join(' ');
    },
    isMaine: function(mName) {
      return mName === this.name;
    },
    iAmMod: function() {
      return ['P.Yonk', 'Robo', 'Ithi', 'Foux', 'Faraon'].includes(this.name);
    },
    removeMessage: function() {}
  },
  beforeDestroy() {
    clearInterval(this.scrollTitle.timer);
  },
  created() {
    let ref = fb.collection('messages').orderBy('timestamp');
    this.docTitle = document.title;

    window.addEventListener('blur', () => {
      this.hidden = true;
    });
    window.addEventListener('focus', () => {
      this.hidden = false;
    });

    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          let doc = change.doc;

          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            message: doc.data().message,
            timestamp: doc.data().timestamp
          });

          if (this.hidden) {
            this.scrollTheTitle(doc.data().name);
          }
        }
      });
    });
  }
};
</script>

<style lang="scss">
.is-chat {
  margin-top: calc(1.5rem - 0.75rem);
  border-top: 1px solid rgba(219, 219, 219, 0.5);

  .is-messages-block {
    max-height: 60vh;
    overflow: auto;
    .media-left {
      padding-top: 0.2rem;
    }
    .media {
      margin-top: 0;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }
    .ismaine {
      .name {
        color: #131a22 !important;
      }
      .message {
        color: #131a22;
      }
    }
  }
}
</style>
