<script setup>
import { ref, computed } from 'vue';
import Button from './utils/Button.vue';

const ALL_PATH = "src/assets/icons/all.png";
const COMPLETED_PATH = "src/assets/icons/completed.png";
const NO_COMPLETED_PATH = "src/assets/icons/no_completed.png";
const TIME_DESC_PATH = "src/assets/icons/timedesc.png";
const TIME_ASC_PATH = "src/assets/icons/timeasc.png";
const ALPHA_DESC_PATH = "src/assets/icons/alphadesc.png";
const ALPHA_ASC_PATH = "src/assets/icons/alphaasc.png";

const filterStates = ref({
  completed: 0,  // 1 - Only completed | 2 - Only Pending | 0 Off
  time: 0,       // 1 - Descending | 2 - Ascending | 0 Off
  alpha: 0,      // 1 - Descending | 2 - Ascending | 0 Off
})

const emit = defineEmits(["sendFilters"]);

const completedFilterState = computed(() => {
  if (filterStates.value.completed === 0) return NO_COMPLETED_PATH;
  return filterStates.value.completed === 1 ? COMPLETED_PATH : NO_COMPLETED_PATH;
})
const timeFilterState = computed(() => {
  if (filterStates.value.time === 0) return TIME_DESC_PATH;
  return filterStates.value.time === 1 ? TIME_DESC_PATH : TIME_ASC_PATH;
})
const alphaFilterState = computed(() => {
  if (filterStates.value.alpha === 0) return ALPHA_DESC_PATH;
  return filterStates.value.alpha === 1 ? ALPHA_DESC_PATH : ALPHA_ASC_PATH;
})

const nextCompleted = (filterState) => {
  if (filterState === 2) {
    filterStates.value.completed = 0;
    emitFilters();
    return;
  }
  else{
    filterStates.value.completed++;
    emitFilters();
    return;
  }
}
const nextTime = (filterState) => {
  if (filterState === 2) {
    filterStates.value.time = 0;
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
  if (filterState === 2) {
    filterStates.value.alpha = 0;
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

</script>


<template>
  <div class="main">
    <div class="container">
      <div class="toggler">
        <Button @click="nextCompleted(filterStates.completed)"><img :src="completedFilterState"></Button>
      </div>
      <div class="filters">
        <Button @click="nextTime(filterStates.time)"><img :src="timeFilterState"></Button>
        <Button @click="nextAlpha(filterStates.alpha)"><img :src="alphaFilterState"></Button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.container {
  display: flex;
  flex-direction: row;
  width: 1270px;
  height: 50px;
  text-align: center;
  background-color: rgb(119, 117, 117);
  align-items: center;
  justify-content: space-between;


}

.toggler {
  margin: 1rem;
}

.filters {
  margin: 1rem;
  display: flex;
  gap: 1rem;
}

@media only screen and (max-width:1285px) { 
	.container {
    width: 635px;
  }
}



</style>