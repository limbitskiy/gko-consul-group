<script setup>
import { ref } from "vue";
</script>

<template>
  <div class="banner">
    <div class="banner-content">
      <div class="banner-text">
        <h3>Считаете кадастровую стоимость завышенной?</h3>
        <p>
          Обратитесь в <a href="https://consul.group">CONSUL GROUP</a> для
          оценки потенциала снижения кадастровой стоимости!
        </p>
      </div>
      <button>Отправить сообщение</button>
    </div>
    <img
      class="banner-image"
      src="images/footer-banner-image.png"
      slt="banner image"
    />
  </div>
</template>

<style scoped lang="scss">
.banner {
  display: flex;
  justify-content: space-between;
  color: white;
  background-color: #6889ab;
  margin-block: 3rem;

  a {
    color: white;
  }

  h3 {
    margin-block: 0 2rem;
    font-size: 3rem;
    font-weight: 500;
  }

  p {
    margin-bottom: 2rem;
  }
}

.banner-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 3rem 5rem;
}

.banner-image {
  @media (max-width: 1150px) {
    display: none;
  }
}
</style>
