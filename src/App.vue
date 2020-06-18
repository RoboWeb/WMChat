<template>
  <div id="app" class="section">
    <div class="container">
      <div class="columns is-centered is-header">
        <div class="column is-half">
          <h2 class="title is-2">{{ appName }}</h2>
          <h5 class="subtitle is-5">
            <span>Pałered by Vue & Firebase, a co! </span>
            <small>(v.{{ appVersion }})</small>
          </h5>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { NAME, VERSION } from './app.conf';
export default {
  name: 'App',
  data() {
    return {
      appName: NAME,
      appVersion: VERSION
    };
  }
};
</script>

<style lang="scss">
@import './assets/styles/main.scss';
.is-header {
  padding-bottom: calc(1.5rem - 0.75rem);
  -webkit-box-shadow: 0px 11px 5px -10px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 11px 5px -10px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 11px 5px -10px rgba(0, 0, 0, 0.1);
}
</style>
