<template>
  <div class="main">
    <div class="header">
      New task
    </div>
    <form @submit.prevent="validate">
      <input class="taskname" type="text" placeholder="Task name" v-model="taskData.name">
      <input class="tasknotes" type="text" placeholder="Task notes" v-model="taskData.notes">
      <input class="checkbox" type="checkbox" v-model="taskData.private">
      <input class="submit" type="submit" value="Add task">
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(["addTask"]);

const taskData = ref({
  name: '',
  notes: '',
  private: false,
});

const isError = ref(false);

function validate () {
  if (taskData.value.name) {
    console.log('success');
    emit("addTask", taskData.value);
    taskData.value = {
      name: '',
      notes: '',
      private: false,
    }
  }
  else {
    console.log('error');
    isError.value = true;
    setTimeout(() => {
      isError.value = false;
    },1500);
  }
}

</script>

<style scoped>

.main {
  display: grid;
}

.header {
  text-align: center;
  font-size: 3rem;
}

form {
  margin: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.taskname{
  flex: 1 1 10ch;
}

.tasknotes {
  flex: 3 1 30ch;
}

input {
  border:none;
  background: hsl(0, 0%, 93%);
  border-radius: .25rem;
  padding: .75rem 1rem;
}

.checkbox {
  flex: 0 1 10ch;
}

.submit {
  flex: 1 1 10ch;
  background: hotpink;
  color: white;
  box-shadow: 0 .75rem .5rem -.5rem hsl(0, 50%, 80%);
}

.submit:hover {
  cursor: pointer;
}

</style>
