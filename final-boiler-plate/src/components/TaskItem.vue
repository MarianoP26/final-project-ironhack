<script setup>
import {defineProps, computed, ref} from 'vue';

const props = defineProps({
  task: Object,
  editMode: Boolean,
})

const confirmDelete = ref(false);

const IMGROUTE = ref('images/padlock.png');
const IMGROUTE2 = ref('images/tick.png');

const toggleConfirm = () => {
  if (!confirmDelete.value) confirmDelete.value = true;
  setTimeout(()=>{
    confirmDelete.value = false;
  }, 500)
}

const toggle = computed(() => {
  return props.task.is_complete ? `btn undone` : `btn done`;
})
const toggleTextButton = computed(() => {
  return props.task.is_complete ? `Undone` : `Done`;
})
const textDeleteButton = computed(() => {
  return confirmDelete.value ? `Confirm?` : `Delete`;
})
const timeCreated = computed(() => {
  let inserted_at = new Date(props.task.inserted_at);
  return toTimeCompare(inserted_at);
})
const timeTookToDate = computed(() => {
  let completed_at = new Date(props.task.completed_at);
  let inserted_at = new Date(props.task.inserted_at);
  let timePassed = completed_at - inserted_at;
  return toTime(timePassed);
})
const completedToDate = computed(() => {
  let completed_at = new Date(props.task.completed_at);
  return toTimeCompare(completed_at);
})
const toTimeCompare = (timestamp) => { // Compares passed timestamp to current date to calculate time passed, returns ddhhmm
  let now = Date.now();
  let then = new Date(timestamp);
  let diffInSeconds = Math.abs(now - then) / 1000;
  const days = Math.floor(diffInSeconds / 86400);
  diffInSeconds -= days * 86400;

  const hours = Math.floor(diffInSeconds / 3600) % 24;
  diffInSeconds -= hours * 3600;

  const minutes = Math.floor(diffInSeconds / 60) % 60;
  diffInSeconds -= minutes * 60;

  let result = '';
  if (days > 0) {
    result += (days === 1) ? `${days} day, ` : `${days} days, `;
  }
  if (hours > 0) {
    result += (hours === 1) ? `${hours} hour, ` : `${hours} hours, `;
  }
  result += (minutes === 0 || hours === 1 ) ? `${minutes} minutes` : `${minutes} minutes`;

  if(result === '0 minutes') result = 'less than a minute';
  return result;
}
const toTime = (timestamp) => { // Just a translator from Milliseconds to Days Hours Minutes
  let seconds = timestamp / 1000;
  const days = Math.floor(seconds / 86400);
  seconds -= days * 86400;

  const hours = Math.floor(seconds / 3600) % 24;
  seconds -= hours * 3600;

  const minutes = Math.floor(seconds / 60) % 60;
  seconds -= minutes * 60;

  let result = '';
  if (days > 0) {
    result += (days === 1) ? `${days} day, ` : `${days} days, `;
  }
  if (hours > 0) {
    result += (hours === 1) ? `${hours} hour, ` : `${hours} hours, `;
  }
  result += (minutes === 0 || hours === 1 ) ? `${minutes} minutes` : `${minutes} minutes`;

  return result;
}
</script>

<template>
  <div class="maintaskitem">
    <div :class="task.is_complete && !editMode && 'container finished' || !task.is_complete && editMode && 'container container-shrink' || 'container'">
      <div class="wrapper">
        <div class="banner-image">
          <span>Created {{timeCreated}} ago</span>
          <span v-if="task.is_complete">Completed {{completedToDate}} ago</span>
          <span v-if="task.is_complete">Time took {{timeTookToDate}}</span>
        </div>
        <h1>{{task.title}} <span v-if="task.is_private"><img :src="IMGROUTE"></span><span v-if="task.is_complete"><img :src="IMGROUTE2" alt=""></span></h1>
        <p>{{task.notes}}</p>
      </div>
      <div class="toggle-wrapper" v-if="!editMode">
        <button :class="toggle" @click="$emit('toggleTask', task.id, !task.is_complete)">{{toggleTextButton}}</button>
        <button v-if="!task.is_complete" class="btn" @click="$emit('editTask', task)">Edit</button>
        <button v-if="!task.is_complete" class="btn delete" @click="toggleConfirm" @dblclick="$emit('deleteTask', task.id)">{{textDeleteButton}}</button>
      </div>
    </div>
  </div>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap');

.container {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.25);
  filter: drop-shadow(0 30px 10px rgba(0,0,0,0.125));
  border: 1px solid rgba(255, 255, 255, 0.125);  
  border-radius: 12px;
  font-family: cursive;
  padding: 38px;  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  text-align: center;
  width: 330px;
  height: 298px;
}

.container-shrink {
  width: 300px;
  height: 200px;
}

@media only screen and (max-width:660) { 
	.container {
    width: 400px;
    color:red;
  }
}
.banner-image {
  display: flex;
  flex-direction: column;
}

.finished {
  background-color: rgba(0, 168, 50, 0.25);
}

.wrapper {
  width: 100%;
  height: 100%;
}

h1{
  color: rgba(255,255,255,0.98);
  text-transform: uppercase;
  font-size: 2.4rem;
}

p {
  color: #fff;
  text-align: center;
  font-size: 0.8rem;
  line-height: 150%;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.button-wrapper{
  margin-top: 18px;
}

.btn {
  border: none;
  background: rgb(209, 211, 69);
  padding: 12px 24px;
  border-radius: 24px;
  font-size: 12px;
  font-size: 0.8rem;  
  letter-spacing: 2px;  
  cursor: pointer;
}

.btn + .btn {
  margin-left: 10px;
}

.undone {
  background: transparent;
  color: rgba(146, 96, 63, 0.9);
  border: 1px solid rgba(146, 96, 63, 0.9);
  transition: all .3s ease;
  
}

.undone:hover{
  transform: scale(1.125);
  color: rgba(255, 255, 255, 0.9);
  border-color: rgba(255, 255, 255, 0.9);
  transition: all .3s ease;  
}

.done {
  background: rgba(146, 96, 63, 0.9);
  color: rgba(255,255,255,0.95);
  filter: drop-shadow(0);
  font-weight: bold;
  transition: all .3s ease; 
}

.done:hover{
  transform: scale(1.125);  
  border-color: rgba(255, 255, 255, 0.9);
  filter: drop-shadow(0 10px 5px rgba(0,0,0,0.125));
  transition: all .3s ease;    
}

.delete {
  background: rgba(156, 35, 18, 0.9);
  color: rgba(255,255,255,0.95);
  filter: drop-shadow(0);
  font-weight: bold;
  transition: all .3s ease; 
}
</style>

