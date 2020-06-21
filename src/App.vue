<template>
  <div>
    <div id="wrap" class="page-width">
      <a id="start_here" class="top-anchor"></a>
      <div id="page-body" class="page-body" role="main">
        <div class="navbar">
          <ul
            id="nav-breadcrumbs"
            class="nav-breadcrumbs linklist navlinks"
            role="menubar"
          >
            <li
              class="breadcrumbs"
              itemscope=""
              itemtype="http://schema.org/BreadcrumbList"
              style="max-width: 803px;"
            >
              <span
                class="crumb"
                itemtype="http://schema.org/ListItem"
                itemprop="itemListElement"
                itemscope=""
                ><a
                  href="/"
                  itemtype="https://schema.org/Thing"
                  itemscope=""
                  itemprop="item"
                  accesskey="h"
                  data-navbar-reference="index"
                  title="Wykaz forów"
                  ><i class="icon fa-home fa-fw"></i
                  ><span itemprop="name">Wykaz forów</span></a
                ><meta itemprop="position" content="1"
              /></span>
            </li>
          </ul>
        </div>
        <router-view />
      </div>
    </div>
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
            <a href="https://vuejs.org" target="_blank">VUE.js</a> The
            Progressive JavaScript Framework <br />
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
</style>
