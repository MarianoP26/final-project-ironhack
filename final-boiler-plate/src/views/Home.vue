<script setup>
import Nav from '../components/Nav.vue';
import Footer from '../components/Footer.vue';
import NewTask from '../components/NewTask.vue';
import TaskItem from '../components/TaskItem.vue';
import FilterPanel from '../components/FilterPanel.vue';
import { useTaskStore } from "../stores/task.js";
import { ref, computed, onMounted } from 'vue';

const taskStore = useTaskStore();
const tasks = ref([]);
const taskToEdit = ref();
const flag = ref(false);  //edit flag
const isFilterActive = ref(false);

const defaultSortedTasks = computed(() => {
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

const applyFilters = (filters) => {
  console.log(filters);
  let result = tasks.value;
  if (filters.completed !== 0) {   //Toggles  between only completed / only no completed
    filters.completed === 1 ? result = result.filter((task) => task.is_complete) : result = result.filter((task) => !task.is_complete);
  }

  if (filters.time !== 0) {    // Toggles between time desc / time asc
    filters.time === 1 ? result.reverse() : console.log('ascending');
  }
  
  console.log(result);
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
            <TaskItem v-for="task, index in defaultSortedTasks" :key="index" :task="task" @toggleTask="toggleTask" @deleteTask="deleteTask" @editTask="editTask"/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  </div>
</template>



<style scoped>

.container {

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



</style>

