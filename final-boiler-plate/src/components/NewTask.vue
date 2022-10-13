<script setup>
import { ref, computed, defineProps, onUpdated, watch } from "vue";
import TaskItem from './TaskItem.vue';

const emit = defineEmits(["addTask", "updateTask","cancelEdit"]);
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
const isEditing = ref(false);

const mainClass = computed(() => {
  return props.flag ? 'mainy main-edit' : 'mainy'; 
})
const headerClass = computed(() => {
  return props.flag ? 'header header-edit' : 'header'; 
})
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
      resetData();
    } else {
      emit("updateTask", taskData.value);
      resetData();
    }
  }
}
const cancelEdit = () => {
  resetData();
  isEditing.value = false;
  emit('cancelEdit');
}
const resetData = () => {
  taskData.value = {
    title: "",
    notes: "",
    private: false,
  };
}
watch(props, (value) => {
  if (props.task) {
    taskData.value = props.task;
    isEditing.value = false;
  }
})
watch(props, (value) => {
  if (props.flag && !isEditing.value) {
    isEditing.value = true;
    const el = document.getElementById('inputhandler');
    el.scrollIntoView({behavior: 'smooth', block: 'end'});
    setTimeout(() => {
      el.focus();
    },800);
  }
}); 
</script>

<template>
  <div :class="mainClass">
    <div :class="headerClass">
      {{ heading }} <span class="cancel-edit" v-if="flag" @click="cancelEdit">cancel</span>
    </div>
    <form @submit.prevent="validate">
      <input
        id="inputhandler"
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
    <div v-if="flag" class="task">
      <TaskItem :task="props.task" :editMode="true"/>
    </div>
  </div>
</template>

<style scoped>
.mainy {
  display: grid;
  margin: 2rem auto;
  width: 1435px;
  background:rgba(107, 57, 0, 0.26);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 6px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  transition: .3s ease-in;
}

.main-edit {
  border: 1px solid rgb(253, 255, 106);
  transition: .3s ease-in;
}

.header {
  margin-top: 1rem;
  text-align: center;
  font-size: 3rem;
}

.header-edit {
  color:rgb(253, 255, 106);
}

form {
  margin: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.cancel-edit {
  font-family: cursive;
  display: block;
  color: darkred;
  font-size: 16px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.082) ;
  text-align: center;
  margin: 0 auto;
  width: 70px;
  transition: .3s ease-out;
}
.cancel-edit:hover {
  transform: scale(1.1);
  text-decoration: underline;
  transition: .3s ease-out;
}

.taskname {
  flex: 1 1 10ch;
}

.tasknotes {
  flex: 3 1 30ch;
}

.task {
  margin: 0 auto 1rem;
}

input {
  font-family: cursive;
  border: none;
  background: hsl(0, 0%, 93%);
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;
}

.checkbox {
  flex: 0 1 10ch;
}

.submit {
  font-family: cursive;
  flex: 1 1 10ch;
  background: rgb(117, 71, 1);
  color: white;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}

.submit:hover {
  cursor: pointer;
}

@media screen and (max-width: 1460px) {
  .mainy {
    width: 960px;
    transition: .3s ease-in;
  }
}
@media screen and (max-width: 977px) {
  .mainy {
    width: 92vw;
    transition: .3s ease-in;
  }
}
</style>
