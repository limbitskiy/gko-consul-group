<script setup>
import CHead from "./components/CHead.vue";
import CContent from "./components/CContent.vue";
import CFooter from "./components/CFooter.vue";
</script>

<template>
  <div class="flex-wrapper">
    <div>
      <CHead />
      <CContent />
    </div>
    <div>
      <CFooter />
    </div>
  </div>
</template>

<style scoped>
.flex-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100dvh;
}
</style>
