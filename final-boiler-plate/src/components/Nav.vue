<script setup>
import { useUserStore } from "../stores/user";
import { ref, computed, onUpdated } from 'vue';

const emit = defineEmits(["status"]);
const props = defineProps({
  showStats: Boolean,
})

const user = ref(useUserStore().user.email.split('@')[0]);
const isActive = ref(false); //responsive related
const isStats = ref(props.showStats);

const signOutMsg = computed(() => { //todo
  return isStats.value ? '' : '';
});
const resolveStatsLink = computed(() => {
  return isStats.value ? 'btn-nav current' : 'btn-nav';
})
const resolveTasksLink = computed(() => {
  return isStats.value ? 'btn-nav' : 'btn-nav current';
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

onUpdated(() => {
  isStats.value = props.showStats;
})

</script>

<template>
  <nav class="main">
    <div class="navbar">
      <div class="title-container">
        <h2>{{user}}!</h2>
      </div> 
      <div :class="isActive && 'items active' || 'items'">
        <div class="tasks">
          <router-link @click="toggleTasks" :class="resolveTasksLink" to="/">Tasks</router-link>
        </div>
        <div class="stats">
          <router-link @click="toggleStats" :class="resolveStatsLink" to="/">Stats</router-link>
        </div>
        <div class="logout">
          <span>
            {{signOutMsg}}
            <router-link class="btn-signout" to="/" @click="signOut">Sign Out</router-link>
          </span>
        </div>
      </div>
      <div :class="isActive && 'toggler rotate' || 'toggler'" @click="isActive = !isActive">
        |||
      </div>
    </div>
  </nav>
</template>


<style scoped>

.main {
  background-image: url('../assets/navback.png');
  background-size: cover;
  position: relative;
}

.navbar {
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0;
  padding: 1rem;
  height: 5rem;
  z-index: 100;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}
.items {
  display: flex;
}
.tasks,.stats,.logout {
  letter-spacing: 2px;
  transition: .3s;
  margin: 0 25px;
}
.title-container {
  margin-left: 20px;
  z-index: 100;
  cursor: pointer;
}

.title-container h2 {
  align-self: center;
  color: #eceff1;
  font-size: 1.6rem;
  font-weight: bold;
  margin-right: 1rem;
  letter-spacing: 2px;
  transition: .5s;
}

.toggler {
  color: #d1faf4;
  margin-right: 20px;
  font-size: 35px;
  transform: rotate(90deg);
  cursor: pointer;
  transition: .3s;
  display: none;
}

.rotate {
  transform: rotate(180deg);
}

.logout {
  font-size: 1.4rem;
}

@media screen and (max-width: 800px){
  .toggler {
    display: inline-block;
  }
  .items {
    padding-top: 1rem;
    padding-bottom: 1rem;
    position: absolute;
    display: flex;
    flex-direction: column;
    text-align: center;
    overflow: hidden;
    align-items: center;
    align-content: space-evenly;
    gap: 3rem;
    z-index: 1;
    top: -100vh;
    width: 300px;
    background-image: url('../assets/toggler.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 10%;
    border: 1px solid brown;
  }

  .btn-header, .btn-stats {
    color: darkgoldenrod;
  }

  .tasks,.stats,.logout {

  }

  .logout span {
    
  }

  .active {
    top: 4.9rem;
    right: 0;
  }
}

.btn-nav{
  /* background-color: #455a64; */
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 0 0.5px rgba(49,49,93,.03),
    0 2px 5px 0 rgba(49,49,93,.1),
    0 1px 2px 0 rgba(0, 0, 0, .08);
  color: rgb(248, 64, 64);
  cursor: pointer;
  text-decoration: none;
  padding: 0.5rem;
  margin: 0 0.5rem;
  font-size: 1.5rem;
  font-weight: 900;
  transition: .5s;
}
.btn-nav:hover {
  box-shadow: 0 0 0 4px #333, 0 0 0 6px #83ff3b;
}

.current {
  box-shadow: 0 0 0 4px #333, 0 0 0 6px #83ff3b;
  color:#83ff3b;
}

.btn-signout {
  text-decoration: none;
  font-size: 16px;
  font-weight: 700;
  color: darkred;
  font-size: 1.4rem;
  text-decoration: underline;
}

</style>
