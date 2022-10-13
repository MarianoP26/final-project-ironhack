<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

const route = "/auth/sign-up";
const buttonText = "Sign Up instead";

const email = ref("");
const password = ref("");

const errorMsg = ref("");

const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const hidePassword = ref(true);

const redirect = useRouter();

const signIn = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await useUserStore().signIn(email.value, password.value);
    // redirects user to the homeView
    redirect.push({ path: "/" });
  } catch (error) {
    // displays error message
    errorMsg.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>

<template>
  <div class="main">
    <div class="logo"></div>
    <h1>Sign In</h1>
    <p v-if="errorMsg" class="">
      {{ errorMsg }}
    </p>
    <form @submit.prevent="signIn">
      <div class="text-field">
        <input
          class=""
          type="email"
          v-model="email"
          id="email"
          required
        />
        <span></span>
        <label class="" for="">Email</label>
      </div>
      <div class="text-field">
        <input
          class=""
          :type="passwordFieldType"
          onpaste="return false"
          v-model="password"
          id="password"
          required
        />
        <span></span>
        <label class="" for="">Password</label>
      </div>
      <button class="btn-sign-in" type="submit">Sign In</button>
      <p class="forgot-pass-link">
        <span class="">Forgot password? </span>
        <PersonalRouter class="signup-opt" :route="'/404'" :buttonText="'Restore password'" />
      </p>
      <p class="signup-link">
        <span class="">Don’t have an account? </span>
        <PersonalRouter class="signup-opt" :route="route" :buttonText="buttonText" />
      </p>
    </form>
  </div>
</template>


<style scoped>

.logo {
  position: absolute;
  background-image: url('../assets/logohorizontal.png');
  background-repeat: no-repeat;
  width: 200px;
  height: 100%;
  top: 20%;
  left: 50%;
  transform: translate(-35%, -50%);
}

.main {
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
 width: 400px;
 background: rgba(54, 33, 0, 0.521);
 border-radius: 10px;
}

.main h1{
  text-align: center;
  padding: 0 0 20px 0;
  border-bottom: 1px solid silver; 
  color: #2691d9;
}

.main form {
  padding: 0 40px;
  box-sizing: border-box;
}

form .text-field {
  position: relative;
  border-bottom: 2px solid #adadad;
  margin: 30px 0;
}

.text-field input {
  width: 100%;
  padding: 0 5px;
  height: 40px;
  font-size: 16px;
  border: none;
  background: none;
  outline: none;
}

.text-field label {
  position: absolute;
  top: 50%;
  left: 5px;
  color: #adadad;
  transform: translateY(-50%);
  font-size: 16px;
  pointer-events: none;
  transition: .5s;
}

.text-field span::before{
  content: '';
  position: absolute;
  top: 40px;
  left:0;
  width: 0%;
  height: 2px;
  background: #2691d9;
  transition: .5s;
}

.text-field input:focus ~ label,
.text-field input:valid ~ label {
  top: -5px;
  color: #2691d9;
}

.text-field input:focus ~ span::before,
.text-field input:valid ~ span::before {
  width: 100%;
}

p {
  font-family: cursive;
  text-align: center;
  margin: 30px 0;
  font-size: 16px;
  color: #666666;
}

p span {
  text-decoration: none;
  margin: -5px 0 20px 5px;
  color: #a6a6a6;
}

.signup-opt {
  text-decoration: none;
  font-weight: 700;
  color: #2691d9;
}
.signup-opt:hover {
  text-decoration: underline;
}

.btn-sign-in {
  width: 100%;
  height: 50px;
  border: 1px solid;
  background: #2c120048;
  border-radius: 25px;
  font-size: 28px;
  color: #ffffff;
  outline: none;
  cursor: pointer;
}

.btn-sign-in:hover {
  border-color: #2691d9;
  transition: .5s;
}

.form {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
}
.input {
  color: rgb(0, 0, 0);
  margin-bottom: 1rem;
}
.button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
