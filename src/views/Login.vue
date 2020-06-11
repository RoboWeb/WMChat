<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-half">
        <h2 class="title is-2">
          wmChat
        </h2>
        <h5 class="subtitle is-5">
          <span>Pałered by Vue & Firebase, a co!</span>
        </h5>
      </div>
    </div>

    <div class="columns is-centered">
      <div class="column is-half">
        <form aclass="text-center" @submit.prevent="login">
          <label for="" class="label">Who You w ogóle are, co?</label>
          <div class="field is-grouped">
            <div class="control is-expanded">
              <input
                type="text"
                class="input"
                placeholder="Twój nick"
                v-model="name"
              />
              <p v-if="errorText" class="help is-danger">{{ errorText }}</p>
            </div>
            <div class="control">
              <button
                class="button"
                :disabled="name === '' || errorText !== null"
                :class="
                  name !== '' && errorText === null
                    ? 'is-success'
                    : 'is-warning'
                "
                type="submit"
              >
                {{ name === '' || errorText !== null ? ':(' : ':)' }}
              </button>
            </div>
          </div>
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
  watch: {
    name: function(val) {
      this.errorText = null;
      if (val.length < 4 && val !== '') this.errorText = 'Co taki krótki?';
      else if (val.length > 33)
        this.errorText = 'No teraz to się przechwalasz...';
    }
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
