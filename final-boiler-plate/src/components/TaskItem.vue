<script setup>
import {defineProps, computed, ref} from 'vue';

const props = defineProps({
  task: Object,
})

const confirmDelete = ref(false);

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



</script>



<template>
  <div class="main">
    <div :class="task.is_complete && 'container finished' || 'container'">
      <div class="wrapper">
        <div class="banner-image">
          {{task.inserted_at}}
        </div>
        <h1>{{task.title}}</h1>
        <p>{{task.notes}}</p>
        <p>{{task.is_complete && `Finished` || `Pending`}}</p>
      </div>
      <div class="toggle-wrapper">
        <button :class="toggle" @click="$emit('toggleTask', task.id, !task.is_complete)">{{toggleTextButton}}</button>
        <button class="btn" @click="$emit('editTask', task)">Edit</button>
        <button class="btn delete" @click="toggleConfirm" @dblclick="$emit('deleteTask', task.id)">{{textDeleteButton}}</button>
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
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);  
  padding: 38px;  
  filter: drop-shadow(0 30px 10px rgba(0,0,0,0.125));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  text-align: center;
}

.finished {
  opacity: 0.3;
}

.wrapper {
  width: 100%;
  height: 100%;
}

/* .banner-image {
  background-image: url(https://images.unsplash.com/photo-1641326201918-3cafc641038e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80);
  background-position: center;
  background-size: cover;
  height: 300px;
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255, 0.255)
} */

h1{
  font-family: 'Righteous', sans-serif;
  color: rgba(255,255,255,0.98);
  text-transform: uppercase;
  font-size: 2.4rem;
}

p {
  color: #fff;
  font-family: 'Lato', sans-serif;
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
  color: rgba(0, 212, 255, 0.9);
  border: 1px solid rgba(0, 212, 255, 0.6);
  transition: all .3s ease;
  
}

.undone:hover{
  transform: scale(1.125);
  color: rgba(255, 255, 255, 0.9);
  border-color: rgba(255, 255, 255, 0.9);
  transition: all .3s ease;  
}

.done {
  background: rgba(0, 212, 255, 0.9);
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
  background: rgba(255, 30, 0, 0.9);
  color: rgba(255,255,255,0.95);
  filter: drop-shadow(0);
  font-weight: bold;
  transition: all .3s ease; 
}
</style>

