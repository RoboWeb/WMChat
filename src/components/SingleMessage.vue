<template>
  <article class="media">
    <!-- avatars here -->
    <div class="media-left">
      <figure class="image is-32x32">
        <slot name="avatar"></slot>
      </figure>
    </div>

    <!-- name + date + main content + standard actions -->
    <div class="media-content">
      <div class="content">
        <p class="is-time" :data-timestamp="timestamp">
          <small>{{ time }}</small>
        </p>
        <p>
          <a href="#" @click="$emit('call', author)" v-if="author">
            <strong>@{{ author }}</strong> </a
          >:&nbsp;&nbsp;
          <slot></slot>
        </p>
        <nav class="level buttons has-addons is-right">
          &nbsp;&nbsp;
          <slot name="actions"></slot>
        </nav>
      </div>
    </div>
  </article>
</template>

<script>
import moment from 'moment';
import 'moment/locale/pl';
moment.locale('pl');

export default {
  name: 'SingleMessage',
  props: ['author', 'timestamp'],
  data() {
    return {
      time: 'Chwilę temu',
      timer: null,
      currentInterval: 10
    };
  },
  methods: {
    getFormatedTime: function() {
      const format = 'ddd, D MMM YYYY, HH:mm'; // pon, 13 mar 2022, 12:45
      return moment(this.timestamp).format(format);
    },
    displayTime: function() {
      let tmstmp = this.timestamp;
      let now = moment();
      let diffTime = now - tmstmp;

      // 12 godzin
      if (diffTime < 12 * 60 * 60 * 1000) {
        this.time = moment(tmstmp).fromNow();

        if (diffTime > 60 * 1000 && this.currentInterval === 10) {
          this.currentInterval = 60;
          this.increseInterval();
        } else if (diffTime > 10 * 60 * 1000 && this.currentInterval === 60) {
          this.currentInterval = 10 * 60;
          this.increseInterval();
        } else if (
          diffTime > 30 * 60 * 1000 &&
          this.currentInterval === 10 * 60
        ) {
          this.currentInterval = 30 * 60;
          this.increseInterval();
        }
      } else {
        this.time = this.getFormatedTime();
        this.cancelAutoUpdate();
      }
    },
    increseInterval: function() {
      clearInterval(this.timer);
      this.timer = setInterval(this.displayTime, this.currentInterval * 1000);
    },
    cancelAutoUpdate: function() {
      clearInterval(this.timer);
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  created: function() {
    // moment.locale('pl');
    this.displayTime();
    this.timer = setInterval(this.displayTime, this.currentInterval * 1000);
  }
};
</script>

<style lang="scss">
.media-content {
  .content {
    position: relative;

    .is-time {
      line-height: 1;
      font-size: 0.8em;
      padding-bottom: 0.2rem;
    }

    .level {
      padding-top: 3px;
      position: absolute;
      text-align: right;
      display: block;
      top: -0.2rem;
      right: 3px;
      opacity: 0;
      transition: opacity 0.4s ease-out;

      .button {
        font-size: 0.7rem;
        padding: calc(0.5em - 2px);

        .material-design-icon {
          margin: 0 2px;
        }
      }
    }
  }

  &:hover {
    .content {
      .level {
        opacity: 1;
      }
    }
  }
}
</style>
