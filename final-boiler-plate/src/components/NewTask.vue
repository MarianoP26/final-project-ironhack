<script setup>
import { ref, computed, defineProps, onUpdated } from "vue";

const emit = defineEmits(["addTask", "updateTask"]);
const props = defineProps({
  task: Object,
});
let taskData = ref({
  title: "",
  notes: "",
  private: false,
});

const isError = ref(false);

const heading = computed(() => {
  return props.task === undefined ? "New task" : "Edit task";
});
const submit = computed(() => {
  console.log(props.task);
  if (props.task === undefined) {
    console.log('Crear task');
    return 'Add task';
  }else {
    console.log('Editar task');
    return 'Edit task';
  }
  // return props.task === undefined ? "Add task" : "Edit task";
});



function validate() {
  if (!taskData.value.title) {
    console.log("error");
    isError.value = true;
    setTimeout(() => {
      isError.value = false;
    }, 1500);
  } else {
    if (!props.task) {
      emit("addTask", taskData.value);
      taskData.value = {
        title: "",
        notes: "",
        private: false,
      };
    } else {
      emit("updateTask", taskData.value);
      taskData.value = {
        title: "",
        notes: "",
        private: false,
      };
    }
  }
}

onUpdated(() => {
  if (props.task) {
    taskData.value = props.task;
  } else {
      return;
  }
});
</script>

<template>
  <div class="main">
    <div class="header">
      {{ heading }}
    </div>
    <form @submit.prevent="validate">
      <input
        class="taskname"
        type="text"
        placeholder="Task name"
        v-model="taskData.title"
      />
      <input
        class="tasknotes"
        type="text"
        placeholder="Task notes"
        v-model="taskData.notes"
      />
      <input class="checkbox" type="checkbox" v-model="taskData.private" />
      <input class="submit" type="submit" :value="submit" />
    </form>
  </div>
</template>

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

.taskname {
  flex: 1 1 10ch;
}

.tasknotes {
  flex: 3 1 30ch;
}

input {
  border: none;
  background: hsl(0, 0%, 93%);
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;
}

.checkbox {
  flex: 0 1 10ch;
}

.submit {
  flex: 1 1 10ch;
  background: hotpink;
  color: white;
  box-shadow: 0 0.75rem 0.5rem -0.5rem hsl(0, 50%, 80%);
}

.submit:hover {
  cursor: pointer;
}
</style>
