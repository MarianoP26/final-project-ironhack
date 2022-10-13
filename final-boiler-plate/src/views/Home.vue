<script setup>
import Nav from '../components/Nav.vue';
import Footer from '../components/Footer.vue';
import NewTask from '../components/NewTask.vue';
import TaskItem from '../components/TaskItem.vue';
import FilterPanel from '../components/FilterPanel.vue';
import UserStats from '../components/UserStats.vue';
import { useTaskStore } from "../stores/task.js";
import { ref, onMounted, computed } from 'vue';

//Filters consts
const FILTER_OFF = 0;
const FILTER_ON = 1;
//Code consts
const ALL_TASKS = 'ALL_TASKS';
const COMPLETED_TASKS = 'COMPLETED_TASKS';
const PENDING_TASKS = 'PENDING_TASKS';
const PUBLIC_TASKS = 'PUBLIC_TASKS';
const PRIVATE_TASKS = 'PRIVATE_TASKS';
const MIN_TIME_TASK = 'MIN_TIME_TASK';
const MAX_TIME_TASK = 'MAX_TIME_TASK';
const MAX_PENDING_TIME_TASK = 'MAX_PENDING_TIME_TASK';

//Home setup
const taskStore = useTaskStore();
const tasks = ref([]);
const filteredTasksList = ref([]);
const taskToEdit = ref();
const flag = ref(false);  //edit flag
const isFilterActive = ref(false);
const showStats = ref(false);
const showFilters = ref(false);

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
const cancelEdit = () => {
  taskToEdit.value = {};
  flag.value = false;
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

  if (filters.search) {
    result = result.filter((task) => task.title.includes(filters.search));
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


  (filters.completed || filters.private || filters.time || filters.alpha || filters.search) ? isFilterActive.value = true : isFilterActive.value = false;
  
  if (filters.completed === FILTER_OFF) result.sort((a, b) => Number(a.is_complete) - Number(b.is_complete));
  filteredTasksList.value = result;
}
const showTasks = (code, task) => {
  showStats.value = false;
  let result = [...tasks.value].sort((a, b) => Number(a.is_complete) - Number(b.is_complete));
  if (code === ALL_TASKS) filteredTasksList.value = [...tasks.value].sort((a, b) => Number(a.is_complete) - Number(b.is_complete));
  else if (code === COMPLETED_TASKS) filteredTasksList.value = result.filter((task) => task.is_complete);
  else if (code === PENDING_TASKS) filteredTasksList.value = result.filter((task) => !task.is_complete);
  else if (code === PUBLIC_TASKS) filteredTasksList.value = result.filter((task) => !task.is_private);
  else if (code === PRIVATE_TASKS) filteredTasksList.value = result.filter((task) => task.is_private);
  else if (code === MIN_TIME_TASK) filteredTasksList.value = [task];
  else if (code === MAX_TIME_TASK) filteredTasksList.value = [task];
  else if (code === MAX_PENDING_TIME_TASK) filteredTasksList.value = [task];
  else console.log('This should be never logged');
}
const applyStatus = (isTask) => {
  showStats.value = isTask;
} 
const toggleFilters = () => {
  showFilters.value = !showFilters.value;
} 
const filterButtonText = computed(() => {
  return showFilters.value ? 'Hide Filters' : 'Show Filters';
})
onMounted(() => {
  fetchTasks();
})

</script>

<template>
  <div id="app">
    <div class="main">
      <Nav @status="applyStatus" :showStats="showStats"/>
      <div v-if="showStats" class="stats">
        <UserStats :tasks="tasks" @showTasks="showTasks"/>
      </div>
      <div v-else class="todo-app">
        <NewTask @addTask="addNewTask" :task="taskToEdit" @updateTask="updateTask" @cancelEdit="cancelEdit" :flag="flag"/>
        <div class="container">
          <div class="tasks" id="tasklist" v-if="tasks.length > 0">
            <div class="task-list-header">
              <button @click="toggleFilters" class="btn-filters">{{filterButtonText}}</button>
              <Transition name="slide-fade">
                <FilterPanel v-if="showFilters" @sendFilters="applyFilters"/>
              </Transition>
            </div>
            <TransitionGroup name="slide-fade">
              <TaskItem v-for="task, index in filteredTasksList" :key="index" :task="task" @toggleTask="toggleTask" @deleteTask="deleteTask" @editTask="editTask"/>
            </TransitionGroup>
          </div>
          <div class="no-tasks" v-else>
            <h3>There are no tasks as of this moment</h3>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  </div>
</template>

<style scoped>

.main {
  background-image: url('../assets/backtile1.jpg');
}

.tasks {
  margin-top:0.3rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
}

.no-tasks h3 {
  text-align: center;
}

.task-list-header {
  width: 100vw;
  text-align: center;
}

.btn-filters {
  font-family: 'Gabriola';
	box-shadow:inset 0px 1px 0px 0px #a6827e;
	background-color:#7d5d3ba8;
	border-radius:3px;
	border:1px solid #54381e;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-size:28px;
	padding:6px 24px;
	text-decoration:none;
	text-shadow:0px 1px 0px #4d3534;
}
.btn-filters:hover {
	background:linear-gradient(to bottom, #634b30 5%, #7d5d3b 100%);
	background-color:#634b30a8;
}
.btn-filters:active {
	position:relative;
	top:1px;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
} 

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-5px);
  opacity: 0;
}


</style>

