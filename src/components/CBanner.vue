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
    font-size: clamp(1.5rem, 4vw, 3rem);
    font-weight: 500;
    line-height: 1.2;

    @media (max-width: 850px) {
      margin-block: 0 1rem;
    }

    @media (max-width: 550px) {
      line-height: 1.3;
    }
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

  @media (max-width: 1150px) {
    align-items: center;
  }

  @media (max-width: 850px) {
    padding: 2rem 3rem;
  }

  @media (max-width: 550px) {
    padding: 2rem;
  }
}

.banner-image {
  @media (max-width: 1150px) {
    display: none;
  }
}
</style>
