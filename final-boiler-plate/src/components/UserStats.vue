<script setup>

</script>


<template>
  <div class="main">
    <div class="container">
      <div class="content">
        <div class="heading">
          UserName
        </div>
        <div class="data">
          Total tasks: number(number)
          <div class="subdata">
            <div>
              Completed: number
            </div>
            <div>
              Pending: number
            </div>
          </div>
        </div>
        <div class="data">
          Total public: number
        </div>
        <div class="data">
          Total private: number
        </div>
        <div class="data">
          Task maximum time: number
        </div>
        <div class="data">
          Task minimum time: number
        </div>
        <div class="data">
          Task average time: number
        </div>
        <div class="signout">
          Signout
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

.container {
  margin: 2rem 4rem;
  height: 800px;
}

.content {
  display: flex;

}

</style>