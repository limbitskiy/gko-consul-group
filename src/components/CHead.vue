<script setup>
import { ref } from "vue";
</script>

<template>
  <div class="header">
    <div class="header-part">
      <img src="images/header-ownex-big.png" alt="big ownex logo" />
      <span class="logo-text">
        Система мониторинга и операционного контроля за обьектами коммерческой
        недвижимости
      </span>
    </div>
    <div class="header-part">
      <div class="header__logo-wrap">
        <img src="images/header-consul.png" alt="ownex logo" />
        <img src="images/header-ownex.png" alt="consul logo" />
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
}

.header-part {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.2rem;

  @media (max-width: 1150px) {
    flex-direction: column;

    &:last-of-type {
      margin-top: 1.5rem;
    }
  }
}

.header__logo-wrap {
  min-width: 168px;
}

.logo-text {
  max-width: 430px;
}
</style>
