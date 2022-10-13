<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/user.js";
import { ref } from "vue";

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

onMounted(async () => {
  const appReady = ref(null);
  try {
    await userStore.fetchUser();
    if (!user.value) {
      appReady.value = true;
      router.push({ path: "/auth/login" });
    } else {
      router.push({ path: "/" });
    }
  } catch (e) {
    console.log(e);
  }
});
</script>

<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Gabriola', cursive;
  min-width: 100vw;
  min-height: 100vh;
}

#app {
  background-image: url('./assets/theme.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-width: 100vw;
  min-height: 100vh;
}

</style>
