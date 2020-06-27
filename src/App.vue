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
    <the-footer />
  </div>
</template>

<script>
import TheFooter from './components/TheFooter';
export default {
  name: 'App',
  components: { TheFooter }
};
</script>

<style lang="scss">
@import './assets/styles/main.scss';
</style>
