<template>
  <div
    class="icon"
    :class="[`icon--${name}`, `icon--${size}`, { 'has-align-fix': fixAlign }]"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="svg.viewbox ? svg.viewbox : '0 0 24 24'"
    >
      <circle
        v-if="svg.circle"
        :cx="svg.circle.cx"
        :cy="svg.circle.cy"
        :r="svg.circle.r"
      />
      <path v-if="svg.path" :d="svg.path" />
      <template v-if="svg.paths">
        <path v-for="(path, index) in svg.paths" :key="'d' + index" :d="path" />
      </template>
    </svg>
  </div>
</template>

<script>
import getIcon from '../helpers/svg-icons.js';
export default {
  props: {
    name: { required: true },
    size: {
      default: 'normal'
    },
    modifier: {
      default: null
    },
    fixAlign: {
      default: true
    }
  },
  data: function() {
    return {
      iName: this.name
    };
  },
  computed: {
    svg() {
      return getIcon(this.iName);
    }
  }
};
</script>

<style lang="scss" scoped>
.icon {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 0.8rem;
  height: 0.8rem;
  margin: 0 0.3rem;
  top: -0.05rem;
  fill: currentColor;

  svg {
    max-height: 100%;
    max-width: 100%;
  }
  &__svg {
    display: inline-block;
    vertical-align: top;
    width: 100%;
    height: 100%;
  }
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
}
// svg sprite
body > svg,
.icon use > svg,
symbol {
  path,
  rect,
  circle,
  g {
    fill: currentColor;
    stroke: none;
  }
  *[d='M0 0h24v24H0z'] {
    display: none;
  }
}
</style>
