<script setup>
import CHead from "./components/CHead.vue";
import CContent from "./components/CContent.vue";
import CFooter from "./components/CFooter.vue";
</script>

<template>
  <div class="photo-bg"></div>
  <div class="page">
    <div class="container">
      <CHead />
      <CContent />
    </div>
  </div>
  <div class="footer-wrap">
    <div class="container">
      <CFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  min-height: calc(100dvh - 87px);
  z-index: 2;
}
.photo-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: calc(100dvh - 87px);
  z-index: 0;
  background: center / cover no-repeat
    url("./assets/images/background-small-compressed.png");

  @media (min-width: 500px) {
    background: center / cover no-repeat
      url("./assets/images/background-compressed.png");
  }
}

.container {
  width: min(1600px, 100%);
  margin-inline: auto;
  padding-inline: 1rem;
}

.footer-wrap {
  z-index: 1;
}
</style>
