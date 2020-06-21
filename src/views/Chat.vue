<template>
  <div class="forabg">
    <div class="inner">
      <ul class="topiclist">
        <li class="header">
          <dl class="row-item">
            <dt>
              <h4 class="list-inner">
                <router-link :to="{ name: 'Chat' }">
                  {{ appName }}
                </router-link>
              </h4>
            </dt>
            <dd class="lastpost">
              <span class="version">
                <small>v.{{ appVersion }}</small>
              </span>
            </dd>
          </dl>
        </li>
      </ul>

      <div id="wmChat" class="postbody is-chat">
        <div class="is-messages-block">
          <!-- if some static -->
          <ul class="topiclist forums is-static" v-if="hasStatic">
            <li
              class="row"
              v-if="messages.length"
              title="Na razie nikt nie godo... :("
            >
              <figure class="row-item is-media">
                <img src="../assets/logo.png" alt="Logo" class="is-chat-logo" />
              </figure>

              <p>Na razie nikt nie godo... :(</p>
            </li>
          </ul>

          <!-- messages -->
          <ul
            class="topiclist forums is-messages"
            v-chat-scroll="{ always: false, smooth: true }"
          >
            <message
              :is_main="isMaine(message.name)"
              v-for="message in messages"
              :key="message.id"
              :itemId="'message-' + message.id"
              :author="message.name"
              :timestamp="message.timestamp"
            >
              <template #avatar>
                <img src="../assets/logo.png" alt="Logo" class="is-chat-logo" />
              </template>
              <div v-html="message.message"></div>
              <template #actions>
                <!-- mention -->
                <button
                  v-if="!isMaine(message.name)"
                  class="button  is-light is-primary is-rounded"
                  title="Zawołaj rozmówcę"
                >
                  <icon name="mention" />
                </button>

                <!-- cite -->
                <button
                  v-if="!isMaine(message.name)"
                  class="button  is-light is-primary is-rounded"
                  title="Odpowiedz"
                >
                  <icon name="quote" />
                </button>

                <!-- like -->
                <button
                  v-if="!isMaine(message.name)"
                  class="button  is-light is-primary is-rounded"
                  title="Podoba mi się"
                >
                  <icon name="like" />
                </button>

                <!-- unlike -->
                <button
                  v-if="!isMaine(message.name)"
                  class="button  is-light is-primary is-rounded"
                  title="Niepodoba mi się"
                >
                  <icon name="unlike" />
                </button>

                <!-- edit -->
                <button
                  v-if="isMaine(message.name) || iAmMod()"
                  class="button  is-light is-primary is-rounded"
                  title="Popraw"
                >
                  <icon name="edit" />
                </button>

                <!-- remove -->
                <button
                  v-if="isMaine(message.name) || iAmMod()"
                  class="button  is-light is-danger is-rounded"
                  title="Usuń"
                >
                  <icon name="trash" />
                </button>

                <!-- reveal -->
                <!-- <button class="button is-transparent" title="Akcje">
                  <icon name="dots" />
                </button> -->
              </template>
            </message>
          </ul>
        </div>
        <!-- editor -->
        <div class="is-editor-block">
          <figure class="row-item is-media">
            <img src="../assets/logo.png" alt="Logo" class="is-chat-logo" />
          </figure>
          <CreateMessage :name="name">
            <template v-slot:avatar> </template>
          </CreateMessage>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NAME, VERSION } from '@/app.conf';
import Message from '@/components/Message';
import CreateMessage from '@/components/CreateMessage';
import fb from '@/firebase/init';
import Icon from '@/components/Icon';

export default {
  name: 'Chat',
  props: ['name'],
  components: {
    CreateMessage,
    Message,
    Icon
  },
  data() {
    return {
      appName: NAME,
      appVersion: VERSION,
      hasStatic: false,
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
.lastpost {
  .version {
    float: right;
  }
}
.is-chat {
  width: 100%;
  color: inherit;
  // general
  .is-message {
    strong {
      font-weight: bold;
    }
  }

  // message elements
  .is-media {
    float: left;
    width: 40px;
    padding: 0 0.5rem 0 0;
    margin: 0;

    img {
      max-width: 100%;
      height: auto;
    }
  }
  .is-message-meta {
    p {
      margin: 0;
    }
    .is-author {
      transition: all 0.5s ease-out;
      opacity: 1;
      &:hover {
        opacity: 0.6;
      }
    }
  }
  .is-content {
    font-size: 1.2em;
    padding-top: 3px;
  }

  // messages block
  .is-messages-block {
    position: relative;
    border-bottom: 1px solid;
    border-bottom-color: #e7e7e7;

    .topiclist.forums {
      &.is-static {
        font-size: 1.1rem;
        .row {
          p {
            padding-top: 1rem;
          }
          .is-media {
            margin-right: 2rem;
          }
        }
      }
      &.is-messages {
        max-height: 60vh;
        min-height: 300px;
        overflow: auto;
        width: 100%;
      }

      .row {
        &.is-message-wrapper {
          display: block;
          position: relative;
          padding: 5px;

          .is-actions-wrapper {
            transition: opacity 200ms ease-in;
            position: absolute;
            right: 0;
            top: 0;
            opacity: 0;

            .button {
              border-radius: 0;
              border-right: 0;
              &:first-child {
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
              }
              &:last-child {
                border-right: 1px solid #c6c6c6;
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
              }

              &.is-transparent {
                background: transparent;
                border: 0;
                border-radius: 50%;
                &:hover {
                  color: inherit;
                  background: rgba(185, 51, 41, 0.5);
                }
              }
            }
          }

          &:hover {
            .is-actions-wrapper {
              opacity: 1;
            }
          }
        }

        &.is-main {
          background: rgba(0, 0, 0, 0.1);
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.05) 0%,
            rgba(0, 0, 0, 0) 100%
          );
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ffffff', GradientType=1 );
        }
      }
    }
  }

  // editor block
  .is-editor-block {
    padding: 10px 5px 5px;
    border-top: 1px solid transparent;
    border-top-color: white;
    text-align: center;

    .is-media {
      float: left;
    }
  }
}
</style>
