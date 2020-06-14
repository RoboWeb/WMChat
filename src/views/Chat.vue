<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-half">
        <h2 class="title is-2">
          wmChat
        </h2>
        <h5 class="subtitle is-5">
          <span>Pałered by Vue & Firebase, a co!</span>
        </h5>
      </div>
    </div>

    <div class="columns is-centered is-chat">
      <div
        class="column is-10 is-messages-block"
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
          :time="message.timestamp"
          :class="{ 'is-main': isMaine(message.name) }"
        >
          <template v-slot:avatar>
            <!-- <img src="../assets/logo.png" alt="Logo" /> -->
          </template>
          {{ message.message }}
          <template v-slot:actions>
            <reply title="Odpowiedz" :size="18" v-if="!isMaine(message.name)" />
            <heart title="Uwielbiam" :size="18" v-if="!isMaine(message.name)" />
            <like
              title="Podoba mi się"
              :size="18"
              v-if="!isMaine(message.name)"
            />
            <unlike
              title="Niepodoba mi się"
              :size="18"
              v-if="!isMaine(message.name)"
            />
            <pencil
              title="Popraw"
              :size="18"
              v-if="isMaine(message.name) || iAmMod()"
            />
            <trash
              title="Usuń"
              :size="18"
              v-if="isMaine(message.name) || iAmMod()"
            />
          </template>
        </single-message>
      </div>

      <div class="column is-users-list-block" v-if="false">
        users
      </div>
    </div>

    <div class="columns is-centered">
      <div class="column is-10 is-form-block">
        <div class="card">
          <div class="card-action">
            <CreateMessage :name="name" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SingleMessage from '@/components/SingleMessage';
import CreateMessage from '@/components/CreateMessage';
import fb from '@/firebase/init';
import moment from 'moment/dist/moment.js';
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
      messages: []
    };
  },
  methods: {
    isMaine: function(mName) {
      console.log({ mName: mName, name: this.name });
      return mName === this.name;
    },
    iAmMod: function() {
      return this.name === 'P.Yonk';
    }
  },
  created() {
    let ref = fb.collection('messages').orderBy('timestamp');
    const dFormat = 'YYYY.MM.DD';
    const tFormat = 'HH:mm:ss';

    ref.onSnapshot(snapshot => {
      console.log({ snapshotSize: snapshot.size });
      snapshot.docChanges().forEach(change => {
        console.log('SnapshotWasChanged', change.type);
        if (change.type === 'added') {
          let doc = change.doc;
          let mDate = moment(doc.data().timestamp).format(dFormat);
          let mTime = moment(doc.data().timestamp).format(tFormat);

          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            message: doc.data().message,
            timestamp: `${mDate}  ${mTime}`
          });
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
  .time {
    display: block;
    font-size: 0.7em;
  }

  .is-messages-block {
    max-height: 60vh;
    overflow: auto;
    .media {
      margin-top: 0;
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
