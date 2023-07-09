<script setup>
import { ref } from "vue";
</script>

<template>
  <div class="footer">
    <p>© 2023 Consul Group. Все права защищены.</p>
  </div>
</template>

<style scoped lang="scss">
.footer {
  border-top: 1px solid #bebdbd;
  padding-block: 1rem;
  margin-top: 3rem;

  p {
    margin: 0;
    font-size: 1rem;
  }

  @media (max-width: 850px) {
    margin-top: 1rem;

    p {
      font-size: 0.8rem;
    }
  }
}
</style>
