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
        <p>
          <a href="#" @click="$emit('reply', author)" v-if="author">
            <strong>@{{ author }}</strong>
          </a>
          &nbsp;&nbsp;<small>{{ time }}</small> <br /><slot></slot>
        </p>
        <nav class="level">
          <slot name="actions"></slot>
        </nav>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'SingleMessage',
  props: ['author', 'time']
};
</script>

<style lang="scss">
.media-content {
  .level {
    padding-top: 3px;
    opacity: 0;
    transition: opacity 0.8s ease-out;
    position: relative;

    .material-design-icon {
      color: blue;
      padding: 3px;
      margin: 0 2px;
      // &:hover {
      //   // zoom: 1.1;
      // }
    }
  }
  &:hover {
    .level {
      opacity: 1;
    }
  }
}
</style>
