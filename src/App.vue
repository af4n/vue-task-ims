<template>
  <div id="app">
    <Navbar/>
    <article>
      <div class="container" :class="{'sign-up-active' : signUp}">
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-left">
              <h1>Добро пожаловать!</h1>
              <p>У Вас уже есть аккаунт? <br>
                Авторизуйтесь и приступайте к торговли!</p>
              <button class="invert" id="signIn" @click="signUp = !signUp">Авторизация</button>
            </div>
            <div class="overlay-right">
              <h1>Вы ещё не зарегистрированы?</h1>
              <p>Заполните небольшую форму
                для создания торгового аккаунта!</p>
              <button class="invert" id="signUp" @click="signUp = !signUp">Создать аккаунт</button>
            </div>
          </div>
        </div>

        <form id="sign-up" class="sign-up" @submit.prevent="handlerForSignUp">
          <h1>Регистрация клиента</h1>
          <p>Заполните небольшую форму <br>
            для создания аккаунта</p>
          <input type="text"
                 placeholder="Введите имя"
                 v-model.trim="name"
                 :class="{invalid: ($v.name.$dirty && !$v.name.required)}"

          />
          <small class="invalid"
                 v-if="$v.name.$dirty && !$v.name.required"
          >
            Введите имя
          </small>

          <input type="email"
                 placeholder="E-mail"
                 v-model.trim="email"
                 :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
          />
          <small class="invalid"
                 v-if="$v.email.$dirty && !$v.email.required"
          >
            Введите email
          </small>
          <small
              class="invalid"
              v-else-if="$v.email.$dirty && !$v.email.email"
          >Введите корректный Email</small>

          <vue-tel-input v-model.trim="phone"
                         :class="{invalid: $v.phone.$dirty && !$v.phone.required}"
          ></vue-tel-input>
          <small
              class="invalid"
              v-if="$v.phone.$dirty && !$v.phone.required"
          >Введите телефон</small>

          <div class="form-check">
            <input type="checkbox" class="checkbox" id="sign-up-checkbox" v-model="agree">
            <label class="sign-up-checkbox" for="sign-up-checkbox">Заполняя форму регистрации, я принимаю <br> <u>условия
              обработки персональных данных</u> </label>
          </div>
          <button type="submit">Зарегистрироваться</button>
        </form>

        <form id="sign-in" class="sign-in" @submit.prevent="handlerForSignIn">
          <h1>Авторизация</h1>
          <p>(используйте логин и пароль для входа)</p>
          <input type="email"
                 placeholder="Логин (Ваш E-mail)"
                 v-model.trim="login"
                 :class="{invalid: ($v.login.$dirty && !$v.login.required) || ($v.login.$dirty && !$v.login.email)}"
          />
          <small class="invalid"
                 v-if="$v.login.$dirty && !$v.login.required"
          >
            Введите email
          </small>
          <small
              class="invalid"
              v-else-if="$v.login.$dirty && !$v.login.email"
          >Введите корректный Email</small>

          <input type="password"
                 placeholder="Пароль"
                 v-model.trim="password"
                 :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
          />
          <small class="helper-text invalid"
                 v-if="$v.password.$dirty && !$v.password.required"
          >Введите пароль</small>
          <small class="helper-text invalid"
                 v-else-if="$v.password.$dirty && !$v.password.minLength"
          >Пароль должен быть не меньше {{$v.password.$params.minLength.min}} символов. Сейчас он
            {{password.length}}</small>
          <div class="form-check">
            <input type="checkbox" class="checkbox" id="sign-in-checkbox">
            <label class="sign-in-checkbox" for="sign-in-checkbox">Запомнить данные для входа</label>
          </div>
          <button type="submit">Войти</button>
          <p>Забыли логин или пароль?</p>
        </form>

      </div>
    </article>
  </div>
</template>

<script>
  import Navbar from './components/Navbar'
  import {VueTelInput} from 'vue-tel-input'
  import {required, email, minLength, numeric} from 'vuelidate/lib/validators'

  export default {
    name: 'App',
    components: {Navbar, VueTelInput},
    data: () => {
      return {
        signUp: true,
        name: '',
        email: '',
        phone: '',
        agree: false,
        login: '',
        password: ''
      }
    },
    validations: {
      name: {required},
      email: {required, email},
      phone: {required, numeric},
      agree: {checked: v => v},
      login: {required, email},
      password: {required, minLength: minLength(6)}
    },
    methods: {
      handlerForSignUp() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        const formData = {
          name: this.name,
          email: this.email,
          phone: this.phone
        }
        console.log('formData:', formData)
      },
      handlerForSignIn() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        const formData = {
          login: this.login,
          password: this.password,
        }
        console.log('formData:', formData)
      }
    }
  }
</script>

<style lang="scss">
  @import '~bootstrap/dist/css/bootstrap.css';
  @import '~vue-tel-input/dist/vue-tel-input.css';
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Roboto:700');

  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }

  #app {
    font-family: Open Sans;
    font-size: 1rem;
    color: #222;
    background-color: #fff;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h1 {
    font-size: 36px;
    font-style: normal;
    font-weight: bold;
    line-height: 49px;
    text-align: center;
    letter-spacing: 0.01em;
    color: #FFFFFF;
  }

  p {
    margin: 15px 0 30px 0;
    font-size: 22px;
  }

  a {
    color: #222;
    text-decoration: none;
    margin: 15px 0;
    font-size: 1rem;
  }

  button {
    width: 366px;
    min-height: 65px;
    background: linear-gradient(88.02deg, #378973 0%, #57BEA0 51.56%, #75EFCA 100%);
    border-radius: 5px;
    border: none;
    color: #fff;
    font-size: 16px;
    font-style: normal;
    font-weight: bold;
    line-height: 16px;
    text-align: center;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    transition: transform .1s ease-in;

    &:active {
      transform: scale(.9);
    }

    &:focus {
      outline: none;
    }
  }

  button.invert {
    background: #4AA98E;
    border: 2px solid #FFFFFF;
    box-sizing: border-box;
  }

  form {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: calc(50% - 0px);
    height: 100vh;
    text-align: center;
    background-color: #fff;
    transition: all .5s ease-in-out;

    div {
      font-size: 1rem;
    }

    input {
      width: 365px;
      height: 60px;
      background: #EDF1F1;
      border: 1px solid rgba(247, 247, 247, 0.05);
      box-sizing: border-box;
      border-radius: 5px;
      padding: 19px 25px;
      margin-bottom: 14px;

      &:focus {
        outline: none;
        background-color: #E3E3E3;
      }
    }
  }

  small.invalid {
    color: #dc3545;
    margin-top: -10px;
    margin-bottom: 15px;
  }

  .container {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 15px 30px rgba(0, 0, 0, .2),
    0 10px 10px rgba(0, 0, 0, .2);
    background: linear-gradient(to bottom, #efefef, #ccc);

    .overlay-container {
      position: absolute;
      top: 0;
      left: 50%;
      width: 50%;
      height: 100%;
      overflow: hidden;
      transition: transform .5s ease-in-out;
      z-index: 100;
      background-image: url('./assets/images/bg-right.png');
      background-repeat: no-repeat;
      background-size: cover;
      padding-left: 200px;
    }

    .overlay {
      position: relative;
      left: -100%;
      height: 100%;
      width: 200%;
      color: #fff;
      transform: translateX(0);
      transition: transform .5s ease-in-out;
    }

    @mixin overlays($property) {
      position: absolute;
      top: 0;
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 70px 40px;
      width: calc(50% - 80px);
      height: calc(100% - 140px);
      text-align: center;
      transform: translateX($property);
      transition: transform .5s ease-in-out;
    }

    .overlay-left {
      @include overlays(-20%);

      h1 {
        margin-top: 288px;
      }
    }

    .overlay-right {
      @include overlays(0);
      right: 200px;

      h1 {
        margin-top: 288px;
      }
    }
  }

  .sign-in {
    left: 0;
    z-index: 2;
    padding-left: 150px;
    h1 {
      margin-top: 200px;
      color: #378973;
    }

    p {
      color: #606060;
    }

    .form-check {
      width: 365px;
      padding-left: 0;
      margin-bottom: 30px;
      text-align: left;
      margin-left: 40px;

      .checkbox {
        position: absolute;
        z-index: -1;
        opacity: 0;
        margin: 10px 0 0 0;
      }

      .checkbox + label {
        position: relative;
        padding: 0 0 0 25px;
        cursor: pointer;
        font-size: 13px;
        line-height: 18px;
        color: #8A8C8C;
        text-align: left;
      }

      .checkbox + label:before {
        content: '';
        position: absolute;
        top: 2px;
        left: 0;
        width: 15px;
        height: 15px;
        border: 1px solid #8A8C8C;
        box-sizing: border-box;
        border-radius: 3px;
        transition: .2s;
        background: #fff;
        color: rgba(138, 140, 140, 1);
      }

      .checkbox + label:after {
        content: '';
        position: absolute;
        top: 6px;
        left: 2px;
        width: 15px;
        height: 15px;
      }

      .checkbox:checked + label:after {
        background-image: url("./assets/images/check.png");
        background-repeat: no-repeat;
      }
    }

    p:last-child {
      font-size: 16px;
      line-height: 18px;
      text-decoration-line: underline;
      color: #8A8C8C;
      cursor: pointer;
    }

    .sign-up-checkbox {
      margin-bottom: 30px;
    }
  }

  .sign-up {
    left: 0;
    z-index: 1;
    opacity: 0;
    padding-right: 150px;

    h1 {
      margin-top: 200px;
      color: #378973;
    }

    p {
      color: #606060;
    }

    .vue-tel-input {
      width: 365px;
      min-height: 60px;
      background: #EDF1F1;
      border: 1px solid rgba(247, 247, 247, 0.05);
      box-sizing: border-box;
      border-radius: 5px;
      padding: 0;
      margin-bottom: 14px;

      &:focus {
        outline: none;
        background-color: #E3E3E3;
      }

      .vti__input {
        margin-bottom: 0;
      }
    }

    .form-check {
      width: 365px;
      padding-left: 0;
      margin-bottom: 30px;
      .checkbox {
        position: absolute;
        z-index: -1;
        opacity: 0;
        margin: 10px 0 0 0;
      }

      .checkbox + label {
        position: relative;
        padding: 0 0 0 25px;
        cursor: pointer;
        font-size: 13px;
        line-height: 18px;
        color: #8A8C8C;
        text-align: left;
      }

      .checkbox + label:before {
        content: '';
        position: absolute;
        top: 2px;
        left: 0;
        width: 15px;
        height: 15px;
        border: 1px solid #8A8C8C;
        box-sizing: border-box;
        border-radius: 3px;
        transition: .2s;
        background: #fff;
        color: rgba(138, 140, 140, 1);
      }

      .checkbox + label:after {
        content: '';
        position: absolute;
        top: 6px;
        left: 2px;
        width: 15px;
        height: 15px;
      }

      .checkbox:checked + label:after {
        background-image: url("./assets/images/check.png");
        background-repeat: no-repeat;
      }
    }
  }

  .sign-up-active {
    .sign-in {
      transform: translateX(100%);
    }

    .sign-up {
      transform: translateX(100%);
      opacity: 1;
      z-index: 5;
      animation: show .5s;
    }

    .overlay-container {
      transform: translateX(-100%);
      background-image: url('./assets/images/bg-left.png');
      background-repeat: no-repeat;
      background-size: cover;
    }

    .overlay {
      transform: translateX(50%);
    }

    .overlay-left {
      transform: translateX(0);
    }

    .overlay-right {
      transform: translateX(20%);
    }
  }

  @keyframes show {
    0% {
      opacity: 0;
      z-index: 1;
    }
    49% {
      opacity: 0;
      z-index: 1;
    }
    50% {
      opacity: 1;
      z-index: 10;
    }
  }

  @keyframes showYtLink {
    0% {
      bottom: -200px;
    }
    100% {
      bottom: 20px;
    }
  }

  @media screen and (max-width: 1024px) {
    form {
      width: 50%;
    }
    .container {
      .overlay-container {
        padding-left: 0;

      }

      .overlay-left {
        left: 50px
      }

      .overlay-right {
        right: 50px
      }

      .sign-up {
        padding-right: 0;
      }

      .sign-in {
        padding-left: 0;
      }
    }
  }

  @media screen and (max-width: 768px) {
    h1 {
      font-size: 30px;
    }
    button {
      width: 300px;
    }
    form {
      input {
        width: 300px;
      }
    }
    .container {
      .overlay-left, .overlay-right {
        padding: 0;
      }
    }
    .sign-up {
      .vue-tel-input {
        width: 300px;
      }
    }
    .sign-in {
      .form-check {
        margin-left: 0;
        padding-left: 40px;
      }
    }
  }

  @media screen and (max-width: 576px) {
    form {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50%;
      input {
        width: 200px;
        max-height: 40px;
        margin-bottom: 5px;
      }
    }

    button {
      width: 200px;
      min-height: 40px;
      font-size: 14px;
    }

    small.invalid {
      margin-bottom: 5px;
    }

    .sign-up {
      .vue-tel-input {
        width: 200px;
        min-height: 40px;
        margin-bottom: 5px;
      }
      h1 {
        font-size: 24px;
        line-height: 32px;
      }
      p {
        font-size: 16px;
        margin: 5px 0 10px 0;
      }
      .form-check {
        margin-bottom: 5px;
      }
    }

    .sign-in {
      h1 {
        font-size: 24px;
        line-height: 32px;
      }
      p {
        font-size: 16px;
        margin: 5px 0 10px 0;
      }
      .form-check {
        margin-bottom: 5px;
      }
    }

    .container {
      .overlay-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 50%;
      }
      .overlay-left {
        h1 {
          margin-top: 100px;
          font-size: 24px;
          line-height: 32px;
        }
        p {
          font-size: 18px;
          margin: 5px 0 10px 0;
        }
      }
      .overlay-right{
        h1 {
          margin-top: 100px;
          font-size: 24px;
          line-height: 32px;
        }
        p {
          font-size: 18px;
          margin: 5px 0 10px 0;
        }
      }
    }

    .sign-up-active {
      .overlay-container {
        transform: translateX(0);
      }
      .sign-up {
        transform: translateY(100%);
        h1 {
          margin-top: 15px;
        }
      }
      .sign-in {
        transform: translateX(0);
      }
    }

    .sign-in {
      transform: translateY(100%);
      h1 {
        margin-top: 15px;
      }
    }


  }
</style>
