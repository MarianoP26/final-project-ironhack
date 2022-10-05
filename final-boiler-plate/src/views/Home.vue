<script setup>
import Nav from '../components/Nav.vue';
import Footer from '../components/Footer.vue';
import NewTask from '../components/NewTask.vue';
import TaskItem from '../components/TaskItem.vue';
import { useTaskStore } from "../stores/task.js";
import { ref, computed, watch, onMounted } from 'vue';

const taskStore = useTaskStore();
const tasks = ref([]);

const fetchTasks = async () => {
  tasks.value = await taskStore.fetchTasks();
}

const addNewTask = async (task) => {
  await taskStore.addTask(task);
}

const toggleTask = async (id, bool) => {
  await taskStore.toggleCompleteTask(id, bool);
}

const editTask = async (id, task) => {
  await taskStore.editTask(id, task);
}

const deleteTask = async (id) => {
  await taskStore.deleteTask(id);
}

onMounted(() => {
  fetchTasks();
})

watch(taskStore, () => {
  fetchTasks();
})
</script>

<template>
  <div id="app">
    <div class="main">
      <Nav/>
      <div class="todo-app">
        <NewTask @addTask="addNewTask"/>
        <TaskItem v-for="task, index in tasks" :key="index" :task="task" @toggleTask="toggleTask" @deleteTask="deleteTask"/>
      </div>
      <Footer/>
    </div>
  </div>
</template>



<style scoped>

.todo-app {

}

</style>

