<template>
  <li
    class="row is-message-wrapper"
    :data-author="author"
    :data-timestamp="timestamp"
    :class="is_mine"
    :id="itemId"
  >
    <figure class="row-item is-media">
      <slot name="avatar">
        <img src="../assets/logo.png" alt="Logo" class="is-chat-logo" />
      </slot>
    </figure>
    <div class="is-message">
      <div class="is-message-meta">
        <p>
          <a
            href="#"
            @click="$emit('call', author)"
            class="is-author"
            v-if="author"
          >
            <strong>@{{ author }}</strong> </a
          >,&nbsp;&nbsp;
          <span class="is-time">
            <small>{{ time }}</small>
          </span>
        </p>
      </div>
      <div class="is-content">
        <slot></slot>
      </div>
    </div>
    <div class="is-actions-wrapper">
      <slot name="actions"></slot>
    </div>
  </li>
</template>

<script>
import moment from 'moment';
import 'moment/locale/pl';
moment.locale('pl');

export default {
  name: 'SingleMessage',
  props: ['author', 'timestamp', 'is_mine', 'itemId'],
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

<style lang="scss"></style>
