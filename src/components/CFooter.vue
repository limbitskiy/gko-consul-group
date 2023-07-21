<template>
  <div class="footer">
    <span
      >© {{ new Date().getFullYear() }} Consul Group. Все права защищены.</span
    >
  </div>
</template>

<style scoped lang="scss">
.footer {
  border-top: 1px solid #bebdbd;
  padding-block: 1rem;
  margin-top: 2rem;
  width: 100%;
  display: flex;
  align-items: center;

  span {
    font-size: 0.9rem;
  }
}
</style>
