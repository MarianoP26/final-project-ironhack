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
const flag = ref(false);

const sortedTasks = computed(() => {
  let sorted = [...tasks.value].sort((a, b) => Number(a.is_complete) - Number(b.is_complete));
  return sorted;
})

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
  flag.value = true;
}
const updateTask = async (task) => {
  await taskStore.editTask(task);
  fetchTasks();
  taskToEdit.value = ref();
  flag.value = false;
}
const deleteTask = async (id) => {
  await taskStore.deleteTask(id);
  fetchTasks();
}
onMounted(() => {
  fetchTasks();
})
</script>

<template>
  <div id="app">
    <div class="main">
      <Nav/>
      <div class="todo-app">
        <NewTask @addTask="addNewTask" :task="taskToEdit" @updateTask="updateTask" :flag="flag"/>
        <div class="tasks">
          <TaskItem v-for="task, index in sortedTasks" :key="index" :task="task" @toggleTask="toggleTask" @deleteTask="deleteTask" @editTask="editTask"/>
        </div>
        <div class="test">
          <!-- {{sortedTasks}} -->
        </div>
      </div>
      <Footer/>
    </div>
  </div>
</template>



<style scoped>

.tasks {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
}

</style>

