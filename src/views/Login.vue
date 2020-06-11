<template>
  <div class="container">
    <h2 class="card-title text-center text-primary">
      Wery Talk App
    </h2>
    <h5 class="text-secondary text-center">
      <span>Pałered by Vue & Firebase, a co!</span>
    </h5>
    <div class="card login">
      <div class="card-body">
        <h5 class="card-title text-center">
          Who You w ogóle are, co?
        </h5>
        <form class="text-center" @submit.prevent="login">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Twój nick"
              v-model="name"
            />
            <p v-if="errorText" class="text-danger">{{ errorText }}</p>
          </div>
          <button
            :disabled="name === ''"
            class="btn"
            :class="name !== '' ? 'btn-success' : 'btn-warning'"
            type="submit"
          >
            {{ name === '' ? ':(' : 'k`cem czata! :)'.bold() }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loginForm',
  data() {
    return {
      name: '',
      errorText: null
    };
  },
  methods: {
    login() {
      if (this.name) {
        this.$router.push({
          name: 'Chat',
          params: { name: this.name }
        });
      } else {
        this.errorText = "Najpierw nick, potem click... znaczy Enter, c'nie?";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 20px;
}
.login {
  display: block;
  max-width: 450px;
  margin: 50px auto 0;
}
</style>
