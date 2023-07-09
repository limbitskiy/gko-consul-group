<script setup>
import { ref, computed } from "vue";
import CTable from "./CTable.vue";
import CBanner from "./CBanner.vue";
import CSpinner from "./CSpinner.vue";

const kNumbers = ref(null);
const isLoading = ref(false);
const showTable = ref(false);
const isValid = computed(() => kNumbers.value || firstLoad.value);
const firstLoad = ref(true);

const onClick = () => {
  if (!kNumbers.value) {
    firstLoad.value = false;
    return;
  } else {
    spinner.show();

    setTimeout(() => {
      showTable.value = true;
      spinner.hide();

      setTimeout(() => {
        const table = document.getElementById("k-n-table");
        const box = table.getBoundingClientRect();

        scrollTo({
          top: box.top + window.scrollY,
          behavior: "smooth",
        });
      }, 500);
    }, 1000);
  }
};

const spinner = {
  show() {
    // document.body.style.overflow = "hidden";
    isLoading.value = true;
  },

  hide() {
    // document.body.style.overflow = "auto";
    isLoading.value = false;
  },
};
</script>

<template>
  <h2>Введите кадастровый номер:</h2>
  <small
    >* только здания, помещения, сооружения, ОНС расположенные на территории
    г.Москва
  </small>

  <div class="k-n-input">
    <q-input
      outlined
      autogrow
      type="number"
      v-model.number="kNumbers"
      error-message="Пожалуйста, введите хотя бы один кадастровый номер"
      :error="!isValid"
    >
      <template v-slot:append>
        <q-icon
          v-if="kNumbers !== ''"
          name="close"
          @click="kNumbers = ''"
          class="cursor-pointer"
        />
      </template>

      <template v-slot:after>
        <q-btn round dense flat icon="send" @click="onClick" />
      </template>
    </q-input>
  </div>

  <q-card dark bordered class="input-desc bg-grey-3 my-card text-black">
    <ul>
      <li>
        Ниже будет указана кадастровая стоимость объекта(-ов) недвижимости
        рассчитанная в рамках проведения очередной ГКО.
      </li>

      <li>
        Планируемая дата начала применения указанной кадастровой стоимости: с
        01.01.2024г.
      </li>

      <li>Срок подачи замечаний на Отчет по ГКО: до __.__.____г.</li>
    </ul>
  </q-card>

  <CTable v-if="showTable" />

  <CBanner v-if="showTable" />

  <CSpinner v-if="isLoading" />
</template>

<style scoped lang="scss">
h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 4px;
  font-weight: 500;

  @media (max-width: 485px) {
    line-height: 1.1;
  }
}

small {
  color: #6d6d6d;
}

.k-n-input {
  max-width: 500px;
  margin-block: 2rem 1rem;
}

.input-desc {
  font-size: 1.2rem;
  margin-block: 1.5rem 1rem;
  width: max-content;
  padding-inline: 0 2rem;

  @media (max-width: 1330px) {
    width: 100%;
  }

  @media (max-width: 850px) {
    font-size: 1rem;
  }
}
</style>
