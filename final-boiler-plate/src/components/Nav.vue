<script setup>
import { useUserStore } from "../stores/user";
import { ref, computed, watch } from 'vue';
import { useRouter } from "vue-router";

const emit = defineEmits(["status"]);
const props = defineProps({
  showStats: Boolean,
})
const redirect = useRouter();
const user = ref(useUserStore().user.email.split('@')[0]);
const isActive = ref(false); //responsive related
const isStats = ref(props.showStats);
const slidePage = computed(() => {
  return isStats.value ? 'Task' : 'Stats';
})
const resolveStatsLink = computed(() => {
  return isStats.value ? 'element active' : 'element';
})
const resolveTasksLink = computed(() => {
  return isStats.value ? 'element' : 'element active';
})
const toggleStats = () => {
  isStats.value = true;
  emitStatus();
}
const toggleTasks = () => {
  isStats.value = false;
  emitStatus();
}
const emitStatus = () => {
  emit('status', isStats.value);
}
const slideTo = () => {
  isStats.value ? toggleTasks() : toggleStats();
}
async function signOut() {
  await useUserStore().signOut();
  redirect.push({ path: "/auth/login" });
}
watch(props, (value) => {
  isStats.value = props.showStats;
})

</script>

<template>
  <div class="mainavbar">
    <div class="container">
      <div class="navbar">
        <div class="logobg logosm"></div>
        <div class="user">
          <h3 class="username">{{user}}</h3>
          <h4 class="signout" @click="signOut">Sign Out</h4>
        </div>

        <ul :class="isActive && 'elements activer' || 'elements'">
          <li><router-link @click="toggleTasks" :class="resolveTasksLink" to="/">Tasks</router-link></li>
          <li><router-link @click="toggleStats" :class="resolveStatsLink" to="/">Stats</router-link></li>
        </ul>

        <div class="slide" @click="slideTo">
          {{slidePage}}
        </div>

      </div>
    </div>
  </div>
</template>


<style scoped>

.container {
    width: 100%;
    border-bottom: 1px solid black;
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
}

.navbar {
    width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.navbar ul li {
    list-style: none;
    display: inline-block;
    margin: 0 20px;
    position: relative;
}

.navbar ul li .element {
    text-decoration: none;
    color: black;
    font-size: 36px;
    letter-spacing: 2px;
}

.navbar ul li::before {
    content: "";
    height: 3px;
    width: 0%;
    background: rgb(255, 255, 255);
    position: absolute;
    left: 0;
    bottom: -12px;
    transition: 0.4s ease-out;
}

.signout:hover {
    text-decoration: underline;
    transition: .4s ease-out;
    color: darkred;
    transform: scale(1.1);
}

.active {
  font-weight: 900;
  transition: 0.4s ease-out;
}

.navbar ul li:hover::before {
    width: 100%;
}

.user {
  display: flex;
  flex-direction: column;
  align-items : center;
  margin: 0 auto;
}

.username {
  font-size: 44px;
  letter-spacing: 2px;
}

.signout {
  letter-spacing: 2px;
  font-size: 28px;
  cursor: pointer;
}

.logobg{
  margin: 1rem;
  width: 220px;
  height: 227px;
  background-image: url('../assets/logobgtest1.png');
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  transition: .3s ease-in;
}

.slide {
  max-width:67.5px;
  color: black;
  text-decoration: none;
  font-size: 36px;
  cursor: pointer;
  transition: .3s;
  display: none;
}

ul {
  padding: 0;
}

@media screen and (max-width: 1105px){
  .slide {
    display: inline-block;
  }

  .slide:hover {
    transform: scale(1.1);
  }

  .slide:hover::before {
    width: 100%;
  }

  .username {
    font-size: 28px;
    letter-spacing: 2px;
  }

  .slide::before {
    content: "";
    height: 3px;
    width: 0%;
    background: rgb(255, 255, 255);
    position: absolute;
    left: 0;
    bottom: -12px;
    transition: 0.4s ease-out;
  }

  .navbar ul li .element {
    padding-top: 1rem;
    padding-bottom: 1rem;
    position: absolute;
    text-align: center;
    overflow: hidden;
    z-index: 1;
    top: -100vh;
    width: 300px;
    border: 1px solid brown;
  }

  ul {
    display: none;
  }

  .logosm {
    width: 38px;
    height: 100px;
    background-image: url('../assets/logosmalltest1.png');
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
    transition: .3s ease-in;
}
}

</style>
