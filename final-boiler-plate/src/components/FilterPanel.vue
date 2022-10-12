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
      <div class="toggler">
        <Button class="btn" @click="nextCompleted(filterStates.completed)"><img :src="completedFilterState"></Button>
      </div>
      <div class="searchbar">
        <input type="text" placeholder="Search by title..." v-model="filterStates.search" @keyup="emitFilters">
      </div>
      <div class="filters">
        <button class="btn-reset" @click="resetFilterSettings">Reset filters</button>
        <Button :class="filterStates.alpha && 'btn-on' || 'btn-off'" @click="nextAlpha(filterStates.alpha)"><img :src="alphaFilterState"></Button>
        <Button :class="filterStates.private && 'btn-on' || 'btn-off'" @click="nextPrivate(filterStates.private)"><img :src="privateFilterState"></Button>
        <Button :class="filterStates.time && 'btn-on' || 'btn-off'" @click="nextTime(filterStates.time)"><img :src="timeFilterState"></Button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.container {
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 100%;
  height: 50px;
  text-align: center;
  background-color: rgb(119, 117, 117);
  align-items: center;
  justify-content: space-between;
  background-image: url('../assets/filterheader.png');
  background-size: cover;
}
.toggler {
  margin: 1rem;
}
.filters {
  margin: 1rem;
  display: flex;
  gap: 2rem;
}

input {
  position:relative;
  left: 50%;
  height: 24px;
  font-size: 18px;
}

.btn-reset {
  padding:0.6rem;
  text-align: center;
}

@media only screen and (max-width:1285px) { 
	.container {
    width: 635px;
  }
}



</style>