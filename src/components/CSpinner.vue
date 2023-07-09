<script setup>
import { ref } from "vue";
</script>

<template>
  <div class="overlay">
    <div class="spinner">
      <img src="images/spinner-inverted.gif" width="60" />
      <span>Идет загрузка...</span>
    </div>
  </div>
</template>

<style>
.overlay {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  display: grid;
  place-items: center;
}

.spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
