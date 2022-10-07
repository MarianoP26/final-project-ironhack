<script setup>
import Nav from '../components/Nav.vue';
import Footer from '../components/Footer.vue';
import NewTask from '../components/NewTask.vue';
import TaskItem from '../components/TaskItem.vue';
import FilterPanel from '../components/FilterPanel.vue';
import { useTaskStore } from "../stores/task.js";
import { ref, computed, onMounted, watch } from 'vue';

//Filters consts
const FILTER_OFF = 0;
const FILTER_ON = 1;

const taskStore = useTaskStore();
const tasks = ref([]);
const filteredTasksList = ref([]);
const taskToEdit = ref();
const flag = ref(false);  //edit flag
const isFilterActive = ref(false);

const fetchTasks = async () => {
  tasks.value = await taskStore.fetchTasks();
  filteredTasksList.value = [...tasks.value].sort((a, b) => Number(a.is_complete) - Number(b.is_complete));
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

const applyFilters = (filters) => {
  let result = [...tasks.value].sort((a, b) => Number(a.is_complete) - Number(b.is_complete));
  if (filters.completed !== FILTER_OFF) {   //Toggles between only completed / only no completed
    filters.completed === FILTER_ON ? result = result.filter((task) => task.is_complete) : result = result.filter((task) => !task.is_complete);
  }

   if (filters.private !== FILTER_OFF) {   //Toggles between only private / only public
    filters.private === FILTER_ON ? result = result.filter((task) => task.is_private) : result = result.filter((task) => !task.is_private);
  }

  if (filters.time !== FILTER_OFF) {    // Toggles between time desc / time asc
    filters.time === FILTER_ON ? result.reverse() : console.log('ascending');
  }

  if (filters.alpha !== FILTER_OFF) {     // Toggles between A-Z / Z-A
    filters.alpha === FILTER_ON ? result.sort((a, b) => a.title.localeCompare(b.title)) : result.sort((a, b) => a.title.localeCompare(b.title)).reverse();
  }
  (filters.completed || filters.private || filters.time || filters.alpha) ? isFilterActive.value = true : isFilterActive.value = false;
  
  if (filters.completed === FILTER_OFF) result.sort((a, b) => Number(a.is_complete) - Number(b.is_complete));
  filteredTasksList.value = result;
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
        <div class="container">
          <div class="tasks">
            <div class="task-list-header">
              <FilterPanel @sendFilters="applyFilters"/>
            </div>
            <TaskItem v-for="task, index in filteredTasksList" :key="index" :task="task" @toggleTask="toggleTask" @deleteTask="deleteTask" @editTask="editTask"/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  </div>
</template>



<style scoped>

.tasks {
  margin-top:0.3rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
}



</style>

