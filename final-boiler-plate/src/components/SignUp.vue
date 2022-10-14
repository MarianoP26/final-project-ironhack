<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";

const route = "/auth/login";
const buttonText = "Test the Sign In Route";

const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errorMsg = ref(null);

const redirect = useRouter();

async function signUp() {
  if (password.value === confirmPassword.value) {
    try {
      await useUserStore().signUp(email.value, password.value);
      // if (error) throw error;
      redirect.push({ path: "/auth/login" });
    } catch (error) {
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "Passwords do not match";
  setTimeout(() => {
    errorMsg.value = null;
  }, 5000);
}
</script>
<template>
  <div class="main">
    <h1>Sign Up</h1>
    <form @submit.prevent="signUp">
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
          type="password"
          v-model="password"
          id="password"
          required
        />
        <span></span>
        <label class="" for="">Password</label>
      </div>
      <div class="text-field">
        <input
          class=""
          type="password"
          v-model="confirmPassword"
          id="confirmPassword"
          required
        />
        <span></span>
        <label class="" for="">Confirm Password</label>
      </div>
      <button class="btn-sign-up" type="submit">Sign Up</button>
      <p class="signin-link">
        <span class="">Already have an account? </span>
        <PersonalRouter class="signup-opt" :route="route" :buttonText="'Sign In instead'" />
      </p>
    </form>
  </div>
</template>


<style scoped>
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
  color: #d98b26; 
}

.main form {
  padding: 0 40px;
  box-sizing: border-box;
}

form .text-field {
  position: relative;
  border-bottom: 2px solid #ffffff;
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
  color: white;
}

.text-field label {
  position: absolute;
  top: 50%;
  left: 5px;
  color: #ff9100;
  transform: translateY(-50%);
  font-size: 32px;
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
  background: #d98b26;
  transition: .5s;
}

.text-field input:focus ~ label,
.text-field input:valid ~ label {
  top: -5px;
  color: #d98b26;
}

.text-field input:focus ~ span::before,
.text-field input:valid ~ span::before {
  width: 100%;
}

.signup-opt {
  text-decoration: none;
  font-weight: 700;
  color: #ffb350;
}

.signup-opt:hover {
  text-decoration: underline;
}

.btn-sign-up {
  width: 100%;
  height: 50px;
  border: 1px solid;
  background: #2c120048;
  border-radius: 25px;
  font-size: 18px;
  color: #ffffff;
  cursor: pointer;
  outline: none;
}



.btn-sign-up:hover {
  border-color: #d98b26;
  transition: .5s;
}

p {
  font-family: cursive;
  text-align: center;
  margin: 30px 0;
  font-size: 16px;
  color: #666666;
}

p span {
  font-family: cursive;
  text-decoration: none;
  margin: -5px 0 20px 5px;
  color: #ffffff;
}

</style>
