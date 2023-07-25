<script setup>
import { ref, reactive } from "vue";
import CTable from "./CTable.vue";
import CBanner from "./CBanner.vue";
import CSpinner from "./CSpinner.vue";
import axios from "axios";

const api = "https://api3.consul.group/v1/ownex/cost";

const input = ref("");

const table = reactive({
  isVisible: false,
  tableData: null,

  show(data) {
    this.tableData = data;
    this.isVisible = true;

    setTimeout(() => {
      const table = document.getElementById("table-data");
      const box = table.getBoundingClientRect();

      scrollTo({
        top: box.top + window.scrollY,
        behavior: "smooth",
      });
    }, 300);
  },

  hide() {
    this.isVisible = false;
    this.tableData = null;
  },
});

const dialog = reactive({
  showSimpleDialog: false,
  showListDialog: false,
  dialogText: "",

  show(text, type) {
    this.dialogText = text;
    this.showSimpleDialog = true;
  },
  hide() {
    this.showSimpleDialog = false;
  },
});

const spinner = reactive({
  canHide: false,
  isLoading: false,

  show() {
    // document.body.style.overflow = "hidden";
    this.isLoading = true;
    setTimeout(() => {
      this.canHide = true;
    }, 1000);
  },

  hide(callback, arg) {
    // document.body.style.overflow = "auto";
    if (this.canHide) {
      this.isLoading = false;
      this.canHide = false;
      callback(arg);
    } else {
      setTimeout(() => {
        this.hide(callback, arg);
      }, 200);
    }
  },
});

const onClick = () => {
  if (!input.value.length) return;

  const kNRegex = /^\d{2}:\d{2}:\d{6,7}:\d{1,6}$/g;
  const parsedInput = parseInput(input.value);

  if (parsedInput.length > 5) {
    dialog.show("Можно вводить не более 20 кадастровых номеров за один раз");
    return;
  }

  const notValidated = parsedInput.filter((item) => !item.match(kNRegex));

  if (notValidated.length) {
    dialog.show(`Не соблюден формат кадастрового номера: ${notValidated}`);
    return;
  }

  spinner.show();
  table.hide();

  axios
    .post(api, {
      numbers: parsedInput,
    })
    .then((res) => res.data)
    .then((data) => {
      if (!data.data.length) {
        spinner.hide(
          dialog.show.bind(dialog),
          "По данному запросу ничего не найдено"
        );
        return;
      } else {
        spinner.hide(table.show.bind(table), data.data);
      }
    });
};

const parseInput = (input) => {
  const kNSet = new Set();
  kNSet.add(input);

  splitSetBy("\n");
  splitSetBy(";");
  splitSetBy(",");

  function splitSetBy(divider) {
    for (const item of kNSet) {
      const split = item.split(divider);
      if (split.length > 1) {
        kNSet.delete(item);
        split.forEach((item) => {
          if (!item) return;
          kNSet.add(item.replace(/\s+/g, ""));
        });
      }
    }
  }

  return [...kNSet];
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
        v-model="input"
        class="consul-input"
        clearable
        :rules="[
          (val) =>
            !!val || `Пожалуйста, введите минимум один кадастровый номер`,
          (val) =>
            /^[\d:;,.\s]+$/gm.test(val) ||
            `Разрешены только цифры и знаки препинания`,
        ]"
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

  <CTable v-if="table.isVisible" :data="table.tableData" />

  <CBanner v-if="table.isVisible" />

  <CSpinner v-if="spinner.isLoading" />

  <q-dialog
    v-model="dialog.showSimpleDialog"
    :square="true"
    class="consul-dialog"
  >
    <q-card>
      <q-card-section class="consul-dialog__header">
        <q-icon name="warning" />
        <div class="text-h6">Ошибка</div>
      </q-card-section>

      <q-card-section class="q-pt-none text-subtitle1">
        {{ dialog.dialogText }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="dialog.showListDialog"
    :square="true"
    class="consul-dialog"
  >
    <q-card>
      <q-card-section class="consul-dialog__header">
        <q-icon name="warning" />
        <div class="text-h6">Ошибка</div>
      </q-card-section>

      <q-card-section class="q-pt-none text-subtitle1">
        {{ dialogText }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
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
      margin-top: 10px;
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

.consul-dialog {
  .q-card {
    box-shadow: none;
    border: 1px solid grey;
  }

  .consul-dialog__header {
    display: flex;
    align-items: center;
    gap: 0.7rem;
  }
}
</style>

<style>
/* active input border color */
.q-field__control {
  color: white !important;
}
</style>
