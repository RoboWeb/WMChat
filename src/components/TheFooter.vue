<template>
  <div id="page-footer" class="page-width" role="contentinfo">
    <div class="copyright">
      <p>
        To jest&nbsp;
        <strong>
          <a href="https://github.com/RoboWeb/wmChat" target="_blank">
            {{ appName }}
          </a>
        </strong>
        &nbsp; v.{{ appVersion }}<br />
        Websocket chat dla&nbsp;
        <a href="http://weryfikatorium.pl/forum" target="_blank"
          >Weryfikatorium</a
        >.
      </p>
      <p class="footer-row">
        <span class="footer-copyright">
          Technologię dostarcza:
          <a href="https://vuejs.org" target="_blank">VUE.js</a> The Progressive
          JavaScript Framework <br />
          oraz
          <a href="https://firebase.google.com" target="_blank">Firebase</a>
          Google's mobile platform
        </span>
      </p>
      <p class="footer-row">
        <span class="footer-copyright"
          >Style autor:
          <a href="https://www.artodia.com/" target="_blank">Arty</a> - phpBB
          3.3 autor: MrGaby</span
        >
      </p>
      <p class="footer-row">
        <span class="footer-copyright">
          Polski pakiet językowy dostarcza
          <a href="http://www.phpbb.pl/" title="Polska społeczność phpBB">
            phpBB.pl
          </a>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { NAME, VERSION } from '../app.conf';
export default {
  name: 'TheFooter',
  data() {
    return {
      appName: NAME,
      appVersion: VERSION
    };
  }
};
</script>

<style lang="sass" scoped></style>
