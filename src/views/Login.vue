<template>
  <div data-fake="form" id="login">
    <div class="panel">
      <div class="inner">
        <div class="content">
          <h2 class="login-title">Zaloguj się</h2>

          <fieldset class="fields1">
            <dl>
              <dt>
                <label for="username">Who You w ogóle are, co?</label>
              </dt>
              <dd>
                <input
                  id="username"
                  type="text"
                  tabindex="1"
                  class="inputbox autowidth"
                  size="25"
                  name="username"
                  placeholder="Twój nick"
                  v-model="name"
                />
                <p v-if="errorText" class="help is-danger">{{ errorText }}</p>
              </dd>
              <dt>
                <label for="password">Podaj mi swoje hasło</label>
              </dt>
              <dd>
                <input
                  type="password"
                  tabindex="2"
                  id="password"
                  name="password"
                  size="25"
                  class="inputbox autowidth"
                  autocomplete="off"
                  placeholder="Twoje tajne hasło"
                  v-model="password"
                />
              </dd>
              <dd>
                <p>
                  Żartuję :) Na razie nie ma znaczenia co tu wpiszesz, bo to
                  tylko testy.
                </p>
              </dd>
            </dl>

            <!--  submit button -->
            <dl>
              <dt>&nbsp;</dt>
              <dd>
                <input
                  tabindex="6"
                  name="login"
                  class="button1"
                  :disabled="name === '' || errorText !== null"
                  type="submit"
                  :value="
                    name === '' || errorText !== null ? ':(' : ':) Zaloguj się'
                  "
                  @click="login"
                />
              </dd>
            </dl>
          </fieldset>
        </div>
      </div>
    </div>

    <!-- Register -->
    <div class="panel">
      <div class="inner">
        <div class="content">
          <h3>Zarejestruj się</h3>
          <p>
            Aby zalogować się, musisz być zarejestrowanym użytkownikiem witryny.
            Rejestracja zajmuje tylko chwilę, a znacznie zwiększa możliwości
            korzystania z witryny. Administrator witryny może zarejestrowanym
            użytkownikom nadać wiele dodatkowych uprawnień. Przed rejestracją
            zapoznaj się z naszym regulaminem, zasadami ochrony danych osobowych
            oraz z odpowiedziami na często zadawane pytania (FAQ), gdzie jest
            wyjaśnionych wiele podstawowych zagadnień dotyczących funkcjonowania
            witryny.
          </p>
          <p>
            <strong
              ><a href="#">Regulamin</a> |
              <a href="#">Zasady ochrony danych osobowych</a></strong
            >
          </p>
          <hr class="dashed" />
          <p>
            <a
              href="https://phpbb33.roboweb.nstrefa.pl/ucp.php?mode=register"
              class="button2"
              target="_blank"
              >Zarejestruj się</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loginForm',

  data() {
    return {
      errorText: null,
      name: '',
      password: ''
    };
  },
  watch: {
    name: function(val) {
      this.errorText = null;
      if (val.length < 3 && val !== '') this.errorText = 'Co taki krótki?';
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
