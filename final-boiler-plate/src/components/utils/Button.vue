<script setup>

</script>


<template>
  <div class="main">
    <slot class="content"></slot>
  </div>
</template>


<style scoped>

.btn-off {
  filter:opacity(30%);
}

.main {
  width:32px;
  height:32px;
}
</style>