<script setup>
import { ref } from "vue";
</script>

<template>
  <div class="header">
    <div class="header-part">
      <img
        class="logo-ownex-big"
        src="images/header-ownex-big.png"
        alt="big ownex logo"
      />
      <span class="logo-text">
        Система мониторинга и операционного контроля за обьектами коммерческой
        недвижимости
      </span>
    </div>
    <div class="header-part">
      <div class="header__logo-wrap">
        <img
          class="logo-consul"
          src="images/header-consul.png"
          alt="ownex logo"
        />
        <img
          class="logo-ownex"
          src="images/header-ownex.png"
          alt="consul logo"
        />
      </div>
      <span class="logo-text">
        Группа компаний, предоставляющая профессиональные правовые консультации
        в сфере недвижимости и строительства
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  margin-block: 2rem 6rem;

  @media (max-width: 800px) {
    margin-block: 1rem 3rem;
  }
}

.header-part {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.2rem;

  @media (max-width: 1150px) {
    flex-direction: column;
    font-size: 1rem;

    &:last-of-type {
      margin-top: 1.5rem;
    }
  }

  @media (max-width: 525px) {
    &:last-of-type {
      margin-top: 0;
      width: 80px;
    }
  }
}

.header__logo-wrap {
  min-width: 168px;

  @media (max-width: 525px) {
    min-width: initial;
  }
}

.logo-text {
  max-width: 430px;

  @media (max-width: 800px) {
    display: none;
  }
}

@media (max-width: 525px) {
  .logo-ownex-big {
    width: 100px;
  }

  .logo-consul {
    width: 50px;
  }

  .logo-ownex {
    width: 30px;
  }
}
</style>
