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
            <strong>@{{ author }}</strong> </a
          >:&nbsp;&nbsp;
          <slot></slot>
        </p>
        <nav class="level">
          <small>{{ time }}</small>
          &nbsp;&nbsp;
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
    position: relative;
    text-align: right;

    small {
      font-size: 0.6em;
      float: left;
    }

    .material-design-icon {
      color: blue;
      padding: 3px;
      margin: 0 2px;
      opacity: 0;
      transition: opacity 0.8s ease-out;
    }
  }
  &:hover {
    .material-design-icon {
      opacity: 1;
    }
  }
}
</style>
