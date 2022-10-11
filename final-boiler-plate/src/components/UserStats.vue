<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from "../stores/user";

const props = defineProps({
  tasks: Object,
})

const emit = defineEmits(["showTasks"]);

const user = ref(useUserStore().user.email.split('@')[0]);
const maxPendingTimeTaskItem = ref();
const minCompletedTimeTaskItem = ref(); //todo
const maxCompletedTimeTaskItem = ref(); //todo

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
  return props.tasks.filter((task) => task.is_private).length;
})
const avgTimeCompletion = computed(() => {
  let shallowTasks = [...props.tasks].sort((a, b) => Number(a.is_complete) - Number(b.is_complete));
  let completedTasks = [...shallowTasks].filter((task) => task.is_complete).reverse();
  let timer = [];
  for (let i = 0; i < completedTasks.length; i++) {
    let dateCompleted = new Date(completedTasks[i].completed_at).getTime();
    let dateCreated = new Date(completedTasks[i].inserted_at).getTime();
    timer.push(dateCompleted - dateCreated);
  }
  let totalTime = 0;
  for (let i = 0; i < timer.length; i++){
    totalTime += timer[i];
  }
  let avgTime = totalTime / timer.length;
  return toTime(avgTime);
})
const maxTimeCompletion = computed(() => {
  let shallowTasks = [...props.tasks].sort((a, b) => Number(a.is_complete) - Number(b.is_complete));
  let completedTasks = [...shallowTasks].filter((task) => task.is_complete).reverse();

    let timer = [];
    let taskItem = {};
    let current = 0;
    let currentMax = 0;

    completedTasks.forEach((task) => {
      let completedAt = new Date(task.completed_at);
      let createdAt = new Date(task.inserted_at);
      current = completedAt - createdAt;
      timer.push(current);
      if (current > currentMax) {
        currentMax = current;
        taskItem = task;
      }
    })
  maxCompletedTimeTaskItem.value = taskItem;
  return toTime(Math.max(...timer));
})
const minTimeCompletion = computed(() => {
  let shallowTasks = [...props.tasks].sort((a, b) => Number(a.is_complete) - Number(b.is_complete));
  let completedTasks = [...shallowTasks].filter((task) => task.is_complete).reverse();

  let timer = [];
  let taskItem = {};
  let current = 0;
  let currentMin = 0;

  completedTasks.forEach((task) => {
    let completedAt = new Date(task.completed_at);
    let createdAt = new Date(task.inserted_at);
    current = completedAt - createdAt;
    timer.push(current);
    if (current < currentMin) {
        currentMin = current;
        taskItem = task;
    }
    else if (currentMin === 0){
        currentMin = current;
        taskItem = task;
    }
  })
  minCompletedTimeTaskItem.value = taskItem;
  return toTime(Math.min(...timer));
})
const maxTimePending = computed(() => {
  let pendingTasks = [...props.tasks].filter((task) => !task.is_complete);
  let maxPendingTimeTask = pendingTasks[pendingTasks.length - 1];
  maxPendingTimeTaskItem.value = maxPendingTimeTask;
  return timestampToRenderString(maxPendingTimeTask.inserted_at);
})

const toTime = (timestamp) => { // Just a translator from Milliseconds to Days Hours Minutes
  let seconds = timestamp / 1000;
  const days = Math.floor(seconds / 86400);
  seconds -= days * 86400;

  const hours = Math.floor(seconds / 3600) % 24;
  seconds -= hours * 3600;

  const minutes = Math.floor(seconds / 60) % 60;
  seconds -= minutes * 60;

  let result = '';
  if (days > 0) {
    result += (days === 1) ? `${days} day, ` : `${days} days, `;
  }
  if (hours > 0) {
    result += (hours === 1) ? `${hours} hour, ` : `${hours} hours, `;
  }
  result += (minutes === 0 || hours === 1 ) ? `${minutes} minutes` : `${minutes} minutes`;

  return result;
}
const timestampToRenderString = (timestamp) => { // Compares passed timestamp to current date to calculate time passed, returns ddhhmm
  let now = Date.now();
  let then = new Date(timestamp);
  let diffInSeconds = Math.abs(now - then) / 1000;
  const days = Math.floor(diffInSeconds / 86400);
  diffInSeconds -= days * 86400;

  const hours = Math.floor(diffInSeconds / 3600) % 24;
  diffInSeconds -= hours * 3600;

  const minutes = Math.floor(diffInSeconds / 60) % 60;
  diffInSeconds -= minutes * 60;

  let result = '';
  if (days > 0) {
    result += (days === 1) ? `${days} day, ` : `${days} days, `;
  }
  if (hours > 0) {
    result += (hours === 1) ? `${hours} hour, ` : `${hours} hours, `;
  }
  result += (minutes === 0 || hours === 1 ) ? `${minutes} minutes` : `${minutes} minutes`;

  return result;
}

const redirect = (code, task) => {
  emit("showTasks", code, task);
}

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
                <h3 @click="redirect('ALL_TASKS')">Total tasks: {{tasks.length}}</h3>
                <h4 @click="redirect('COMPLETED_TASKS')">Completed tasks: {{completedTasks}}</h4>
                <h4 @click="redirect('PENDING_TASKS')">Pending tasks: {{pendingTasks}}</h4>
              </div>
              <div class="two">
                <h4 @click="redirect('PUBLIC_TASKS')">Public tasks: {{publicTasks}}</h4>
                <h4 @click="redirect('PRIVATE_TASKS')">Private tasks: {{privateTasks}}</h4>
              </div>
            </div>
          </div>
          <div class="box">
            <div class="box-header">
              <h2>Time related stats</h2>
            </div>
            <div class="box-body">
              <h3>Average completion time: {{avgTimeCompletion}}</h3>
              <h4 @click="redirect('MIN_TIME_TASK', minCompletedTimeTaskItem)">Minimum completion time: {{minTimeCompletion}}</h4>
              <h4 @click="redirect('MAX_TIME_TASK', maxCompletedTimeTaskItem)">Maximum completion time: {{maxTimeCompletion}}</h4>
              <h4 @click="redirect('MAX_PENDING_TIME_TASK', maxPendingTimeTaskItem)">Maximum task pending time: {{maxTimePending}}</h4>
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
  cursor: pointer;
}
h4 {
  border: 1px solid black;
  padding: 0.5rem;
  font-size: 28px;
  cursor: pointer;
}

</style>