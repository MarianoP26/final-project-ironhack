<script setup>
import { ref, computed } from 'vue';
import Button from './utils/Button.vue';

const FILTER_OFF = 0;
const FILTER_ON = 1;
const FILTER_ON_MAX = 2;

//Completion filters
const ALL_COMPLETE_PATH = "images/all.png";
const COMPLETED_PATH = "images/completed.png";
const NO_COMPLETED_PATH = "images/no_completed.png";
//Private filters
const ALL_PRIVATE_PATH = "images/public.png";
const PRIVATE_PATH = "images/private.png";
const PUBLIC_PATH = "images/public.png";
//Time filters
const TIME_DESC_PATH = "images/timedesc.png";
const TIME_ASC_PATH = "images/timeasc.png";
//Alpha filters
const ALPHA_DESC_PATH = "images/alphadesc.png";
const ALPHA_ASC_PATH = "images/alphaasc.png";

const filterStates = ref({
  completed: 0,  // 1 - Only completed | 2 - Only Pending | 0 Off
  private: 0,    // 1 - Only private | 2 - Only public | 0 Off
  time: 0,       // 1 - Descending | 2 - Ascending | 0 Off
  alpha: 0,      // 1 - Descending | 2 - Ascending | 0 Off
  search: '',
})

const emit = defineEmits(["sendFilters"]);

const completedFilterState = computed(() => {
  if (filterStates.value.completed === FILTER_OFF) return ALL_COMPLETE_PATH;
  return filterStates.value.completed === FILTER_ON ? COMPLETED_PATH : NO_COMPLETED_PATH;
})
const privateFilterState = computed(() => {
  if (filterStates.value.private === FILTER_OFF) return ALL_PRIVATE_PATH;
  return filterStates.value.private === FILTER_ON ? PRIVATE_PATH : PUBLIC_PATH;
})
const timeFilterState = computed(() => {
  if (filterStates.value.time === FILTER_OFF) return TIME_DESC_PATH;
  return filterStates.value.time === FILTER_ON ? TIME_DESC_PATH : TIME_ASC_PATH;
})
const alphaFilterState = computed(() => {
  if (filterStates.value.alpha === FILTER_OFF) return ALPHA_DESC_PATH;
  return filterStates.value.alpha === FILTER_ON ? ALPHA_DESC_PATH : ALPHA_ASC_PATH;
})

const nextCompleted = (filterState) => {
  if (filterState === FILTER_ON_MAX) {
    filterStates.value.completed = FILTER_OFF;
    emitFilters();
    return;
  }
  else{
    filterStates.value.completed++;
    emitFilters();
    return;
  }
}
const nextPrivate = (filterState) => {
  if (filterState === FILTER_ON_MAX) {
    filterStates.value.private = FILTER_OFF;
    emitFilters();
    return;
  }
  else{
    filterStates.value.private++;
    emitFilters();
    return;
  }
}
const nextTime = (filterState) => {
  if (filterState === FILTER_ON_MAX) {
    filterStates.value.time = FILTER_OFF;
    emitFilters();
    return;
  }
  else{
    filterStates.value.time++;
    emitFilters();
    return;
  }
}
const nextAlpha = (filterState) => {
  if (filterState === FILTER_ON_MAX) {
    filterStates.value.alpha = FILTER_OFF;
    emitFilters();
    return;
  }
  else{
    filterStates.value.alpha++;
    emitFilters();
    return;
  }
}
const emitFilters = () => {
  emit("sendFilters", filterStates.value);
}
const resetFilterSettings = () => {
  filterStates.value = {
  completed: 0, 
  private: 0,    
  time: 0,       
  alpha: 0,
  }
  emitFilters();
}
</script>

<template>
  <div class="main">
    <div class="container">
      <div class="searchbar">
        <input type="text" placeholder="Search by title..." v-model="filterStates.search" @keyup="emitFilters">
      </div>
      <div class="filters">
        <button class="btn-reset" @click="resetFilterSettings">Reset</button>
        <Button class="btn" @click="nextCompleted(filterStates.completed)"><img :src="completedFilterState"></Button>
        <Button :class="filterStates.alpha && 'btn-on' || 'btn-off'" @click="nextAlpha(filterStates.alpha)"><img :src="alphaFilterState"></Button>
        <Button :class="filterStates.private && 'btn-on' || 'btn-off'" @click="nextPrivate(filterStates.private)"><img :src="privateFilterState"></Button>
        <Button :class="filterStates.time && 'btn-on' || 'btn-off'" @click="nextTime(filterStates.time)"><img :src="timeFilterState"></Button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.container {
  width:1400px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0.4rem auto 0;
  text-align: center;
  align-items: center;
  justify-content: space-evenly;
  background:rgba(48, 27, 0, 0.74);
  box-shadow: rgba(255, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
  padding: 1rem;
  gap: 1rem;
}
.toggler {
  margin: 1rem;
}
.filters {
  display: flex;
  gap: 2rem;
}

input {
  font-family: cursive;
  height: 28px;
  font-size: 22px;
  width: 50vw;
}

.btn-reset {
  font-family: cursive;
  background: rgb(117, 71, 1);
  color: white;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
.btn-reset:hover {
	background:linear-gradient(to bottom, #553000 5%, #a3651a 100%);
	background-color:#3b2200;
}
.btn-reset:active {
	position:relative;
	top:1px;
}

@media screen and (max-width: 1460px) {
  .container {
    width: 920px;
  }
}
@media screen and (max-width: 977px) {
  .container {
    width: 88vw;
  }
}
</style>