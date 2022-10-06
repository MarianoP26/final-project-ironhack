<script setup>
import { ref, computed, defineProps, onUpdated } from "vue";

const emit = defineEmits(["addTask", "updateTask"]);
const props = defineProps({
  task: Object,
  flag: Boolean,
});
let taskData = ref({
  title: "",
  notes: "",
  private: false,
});

const isError = ref(false);

const heading = computed(() => {
  return !props.flag ? 'New Task' : 'Edit Task';
});
const submit = computed(() => {
  return !props.flag ? 'Add Task' : 'Edit Task';
});

function validate() {
  if (!taskData.value.title) {
    console.log("error");
    isError.value = true;
    setTimeout(() => {
      isError.value = false;
    }, 1500);
  } else {
    if (!props.flag) {
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
  if (props.flag) {
    taskData.value = props.task;
    console.log(props.flag);
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
  /* box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset; */
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
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}

.submit:hover {
  cursor: pointer;
}
</style>
