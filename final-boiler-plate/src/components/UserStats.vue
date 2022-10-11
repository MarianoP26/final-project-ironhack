<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from "../stores/user";

const props = defineProps({
  tasks: Object,
})

const user = ref(useUserStore().user.email.split('@')[0]);

const completedTasks = computed(() => {
  return props.tasks.filter((task) => task.is_complete).length;
})
const pendingTasks = computed(() => {
  return props.tasks.filter((task) => !task.is_complete).length;
})
const publicTasks = computed(() => {
  return props.tasks.filter((task) => !task.is_private).length;
})
const privateTasks = computed(() => {
  return props.tasks.filter((task) => task.is_complete).length;
})
const avgTimeCompletion = computed(() => {
  return props.tasks.filter((task) => task.is_complete).length;
})
const minTimeCompletion = computed(() => {
  return props.tasks.filter((task) => task.is_complete).length;
})
const maxTimeCompletion = computed(() => {
  return props.tasks.filter((task) => task.is_complete).length;
})

</script>


<template>
  <div class="main">
    <div class="container">
      <div class="content">
        <div class="heading">
          <h2>{{user}} Stats</h2>
        </div>
        <div class="body">
          <div class="box">
            <div class="box-header">
              <h2>Task related stats</h2>
            </div>
            <div class="box-body">
              <div class="one">
                <h3>Total tasks: {{tasks.length}}</h3>
                <h4>Completed tasks: {{completedTasks}}</h4>
                <h4>Pending tasks: {{pendingTasks}}</h4>
              </div>
              <div class="two">
                <h4>Public tasks: {{publicTasks}}</h4>
                <h4>Private tasks: {{privateTasks}}</h4>
              </div>
            </div>
          </div>
          <div class="box">
            <div class="box-header">
              <h2>Time related stats</h2>
            </div>
            <div class="box-body">
              <h3>Average completion time: {{avgTimeCompletion}}</h3>
              <h4>Minimum completion time: {{minTimeCompletion}}</h4>
              <h4>Maximum completion time: {{maxTimeCompletion}}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

.heading {
  border-bottom: 1px solid black;
  width: auto;
  margin: 1rem auto;
  max-width: 75vw;
}

h2{
  text-align: center;
  letter-spacing: 2px;
  font-size: 36px;
}

.body {
  margin: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  align-content: center;
  text-align: center;
  justify-content: space-around;
}

.box {
  display: flex;
  flex-direction: column;
}

.box-body {
  padding: 1rem 4rem;
  border: 1px solid black;
}

h3 {
  border: 1px solid black;
  padding: 0.5rem;
  font-size: 28px;
}
h4 {
  border: 1px solid black;
  padding: 0.5rem;
  font-size: 28px;
}

</style>