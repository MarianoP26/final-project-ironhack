<script setup>
import Nav from '../components/Nav.vue';
import Footer from '../components/Footer.vue';
import NewTask from '../components/NewTask.vue';
import TaskItem from '../components/TaskItem.vue';
import { useTaskStore } from "../stores/task.js";
import { ref, computed, watch, onMounted } from 'vue';

const taskStore = useTaskStore();
const tasks = ref([]);
const taskToEdit = ref();

const fetchTasks = async () => {
  tasks.value = await taskStore.fetchTasks();
}
const addNewTask = async (task) => {
  await taskStore.addTask(task);
  fetchTasks();
}
const toggleTask = async (id, bool) => {
  await taskStore.toggleCompleteTask(id, bool);
  fetchTasks();
}
const editTask = (task) => {
  taskToEdit.value = task;
}
const updateTask = async (task) => {
  console.log('editing');
  await taskStore.editTask(task);
  fetchTasks();
}
const deleteTask = async (id) => {
  await taskStore.deleteTask(id);
  fetchTasks();
}
onMounted(() => {
  fetchTasks();
})
// watch(taskStore.tasks, () => {
//   fetchTasks();
// })
</script>

<template>
  <div id="app">
    <div class="main">
      <Nav/>
      <div class="todo-app">
        <NewTask @addTask="addNewTask" :task="taskToEdit" @updateTask="updateTask"/>
        <TaskItem v-for="task, index in tasks" :key="index" :task="task" @toggleTask="toggleTask" @deleteTask="deleteTask" @editTask="editTask"/>
      </div>
      <Footer/>
    </div>
  </div>
</template>



<style scoped>

.todo-app {

}

</style>

