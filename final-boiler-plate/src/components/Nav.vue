<template>
  <div class="main">
    <div class="navbar">
      <router-link class="btn-header" to="/">My Tasks</router-link>
      <div class="title-container">
        <span>Welcome back <strong>Mariano</strong>!</span>
        <span class="title">Yet Another Task Manager</span>
      </div> 
      <span>
        Not you?
        <router-link class="btn-signout" to="/">Sign Out</router-link>
      </span>
    </div>
  </div>
</template>

<script setup>
//constant to save a variable that will hold the use router method

// constant to save a variable that will get the user from store with a computed function imported from vue

// constant that calls user email from the useUSerStore

// constant that saves the user email and cleans out the @client from the user

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
</script>

<style scoped>

.navbar {
  box-sizing: border-box;
  background-color: #607d8b;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 0;
  padding: 1 rem;
  height:  5rem;
}

.title-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-bottom: 10px;
}

.title {
  align-self: center;
  color: #eceff1;
  font-size: 1.6rem;
  font-weight: bold;
  margin-right: 1rem;
}

.btn-header {
  background-color: #455a64;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 0 0.5px rgba(49,49,93,.03),
    0 2px 5px 0 rgba(49,49,93,.1),
    0 1px 2px 0 rgba(0, 0, 0, .08);
  color: #b0bec5;
  cursor: pointer;
  text-decoration: none;
  padding: 0.5rem;
  margin: 0 0.5rem;
  font-size: 1.5rem;
}

.btn-signout {
  text-decoration: none;
  font-size: 16px;
  font-weight: 700;
  color: darkred;
}

</style>
