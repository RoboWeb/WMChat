<template>
  <div class="container chat">
    <h2 class="card-title text-center text-primary">
      Wery Talk App
    </h2>
    <h5 class="text-secondary text-center">
      Pałered by Vue & Firebase, a co!
    </h5>
    <div class="card">
      <div class="card-body text-left">
        <p v-if="messages.length === 0" class="text-secondary nomessages">
          Na razie nikt nie godo... :(
        </p>
        <div class="messages" v-chat-scroll="{ always: false, smooth: true }">
          <div
            v-for="message in messages"
            :key="message.id"
            :id="message.id"
            :class="{ ismaine: message.name == name }"
          >
            <span class="text-info name">[{{ message.name }}]: </span>
            <span class="message" v-html="message.message"></span>
            <span class="text-secondary time">{{ message.timestamp }}</span>
          </div>
        </div>
      </div>
      <div class="card-action">
        <CreateMessage :name="name" />
      </div>
    </div>
  </div>
</template>

<script>
import CreateMessage from '@/components/CreateMessage';
import fb from '@/firebase/init';
import moment from 'moment/dist/moment.js';

export default {
  name: 'Chat',
  props: ['name'],
  components: {
    CreateMessage
  },
  data() {
    return {
      messages: []
    };
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
          let mTime = moment(doc.data().timestamp).format('HH:mm:ss');

          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            message: doc.data().message,
            timestamp: `[${mDate}][${mTime}]`
          });
        }
      });
    });
  }
};
</script>

<style lang="scss">
.chat {
  h2 {
    font-size: 2.6em;
    margin-bottom: 0px;
  }
  h5 {
    margin-top: 0px;
    margin-bottom: 40px;
  }
  span {
    font-size: 1.2em;
  }
  .time {
    display: block;
    font-size: 0.7em;
  }

  .card .messages {
    max-height: 300px;
    overflow: auto;
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
