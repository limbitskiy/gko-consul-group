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
        const table = document.getElementById("table-data");
        const box = table.getBoundingClientRect();

        scrollTo({
          top: box.top + window.scrollY,
          behavior: "smooth",
        });
      }, 500);
    }, 1500);
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
  <div class="content-title">
    <h2>Справочная информация о величине кадастровой стоимости</h2>
    <span>
      полученных в результате проведения в 2023 году государственной кадастровой
      оценки объектов недвижимости расположенных на территории г.Москва.
    </span>
  </div>

  <div class="k-n-input">
    <div class="input-inner">
      <q-input
        :dark="true"
        outlined
        autogrow
        :square="true"
        placeholder="Не более 20 обьектов"
        type="number"
        v-model.number="kNumbers"
        error-message="Пожалуйста, введите хотя бы один кадастровый номер"
        :error="!isValid"
        class="consul-input"
        clearable
      >
        <template v-slot:append>
          <q-btn round dense flat icon="info">
            <q-popup-proxy
              transition-show="flip-up"
              transition-hide="flip-down"
            >
              <q-banner class="bg-grey-9 text-white">
                <template v-slot:avatar>
                  <q-icon name="info" class="popup-icon" />
                </template>
                <ul class="popup-list">
                  <li>
                    Указана кадастровая стоимость объекта(-ов) недвижимости
                    рассчитанная в рамках проведения очередной ГКО.
                  </li>
                  <li>
                    Планируемая дата начала применения указанной кадастровой
                    стоимости: с 01.01.2024г
                  </li>
                  <li>Срок подачи замечаний на Отчет по ГКО: до __.__.____г</li>
                </ul>
              </q-banner>
            </q-popup-proxy>
          </q-btn>
        </template>
      </q-input>
      <small class="before"
        >* только здания, помещения, сооружения, ОНС расположенные на территории
        г.Москва
      </small>
      <q-btn
        outline
        class="consul-button"
        label="ИСКАТЬ"
        :square="true"
        @click="onClick"
      />
    </div>
    <small class="after"
      >* только здания, помещения, сооружения, ОНС расположенные на территории
      г.Москва
    </small>
  </div>

  <CTable v-if="showTable" />

  <CBanner v-if="showTable" />

  <CSpinner v-if="isLoading" />
</template>

<style scoped lang="scss">
.content-title {
  max-width: 720px;
  margin-block: 4rem;

  h2 {
    font-size: clamp(30px, 4vw, 46px);
    margin-bottom: 8px;
    font-weight: 500;
    line-height: 1.5;
  }

  span {
    font-size: clamp(19px, 3vw, 24px);
    display: inline-block;
  }

  @media (max-width: 1000px) {
    max-width: initial;
    text-align: center;
  }

  @media (max-width: 500px) {
    margin-block: 4rem;
  }
}

.k-n-input {
  max-width: 666px;
  margin-block: 2rem 1rem;

  small {
    font-size: 19px;
    color: #c5c5c5;
    &.before {
      display: none;
      margin-bottom: 3rem;
    }
  }

  .consul-input {
    font-size: 19px;
    width: 450px;
  }

  .consul-button {
    color: #ff4c00;
    font-size: 16px;
    height: 56px;
    min-width: 130px;
    line-height: 1px;
  }

  .input-inner {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  @media (max-width: 666px) {
    small.after {
      display: none;
    }
    small.before {
      display: block;
    }

    .input-inner {
      gap: 0;
    }
    .consul-input {
      width: 100%;
    }

    .consul-button {
      min-width: 100%;
    }
  }
}

.input-desc {
  font-size: 1.2rem;
  margin-block: 1.5rem 1rem;
  width: max-content;
  padding-inline: 0 2rem;
}

.popup-icon {
  margin-top: 1rem;

  @media (max-width: 600px) {
    display: none;
  }
}

.popup-list {
  @media (max-width: 600px) {
    padding: 0;
  }
}
</style>

<style>
/* active input border color */
.q-field__control {
  color: white !important;
}
</style>
