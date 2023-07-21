<script setup>
import { ref } from "vue";
</script>

<template>
  <div class="banner">
    <h3>Считаете кадастровую стоимость завышенной?</h3>
    <p>
      Обратитесь в <a href="https://consul.group">CONSUL GROUP</a> для оценки
      потенциала снижения кадастровой стоимости!
    </p>
    <q-btn
      outline
      class="consul-button"
      label="ОТПРАВИТЬ СООБЩЕНИЕ"
      :square="true"
    />
  </div>
</template>

<style scoped lang="scss">
.banner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  margin-block: 8rem 6rem;
  position: relative;

  @media (max-width: 750px) {
    margin-block: 4rem 3rem;
    gap: 0.5rem;
    text-align: center;
    .consul-button {
      margin-inline: auto;
    }
  }

  &:after {
    content: "";
    width: 280px;
    height: 220px;
    background: center/cover no-repeat url("../assets/images/watermark.png");
    position: absolute;
    right: 0;
    bottom: -128px;

    @media (max-width: 740px) {
      display: none;
    }
  }

  a {
    color: white;
  }

  h3 {
    margin-block: 0 2rem;
    font-size: clamp(30px, 4vw, 46px);
    font-weight: 500;
    line-height: 1.2;
  }

  p {
    font-size: clamp(19px, 3vw, 24px);
    max-width: 700px;
  }

  .consul-button {
    color: #ff4c00;
    font-size: 16px;
    height: 56px;
    width: min(400px, 100%);
    line-height: 1px;
  }
}
</style>
