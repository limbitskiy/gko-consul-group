<script setup>
import { onMounted, ref } from "vue";

const props = defineProps(["data"]);

const columns = [
  {
    name: "number",
    required: true,
    label: "Кадастровый номер",
    align: "left",
    field: "number",
    // format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "cost",
    align: "center",
    label: "Кадастровая стоимость",
    field: "cost",
    format: (val) => {
      // insert a space every 3 digits from the end
      const str = "" + val;
      const strArr = str.split(".");
      const wholeArr = [];

      let remainingNum = strArr[0];
      while (remainingNum.length > 0) {
        wholeArr.unshift(" " + remainingNum.slice(-3));
        remainingNum = remainingNum.slice(0, -3);
      }
      const firstPart = wholeArr.join("");
      return firstPart + (strArr[1] ? "." + strArr[1] : "");
    },
    sortable: true,
  },
  // { name: "fat", label: "УПКС", field: "fat", sortable: true },
  // { name: "carbs", label: "Может что-то еще", field: "carbs" },
  // { name: "protein", label: "Protein (g)", field: "protein" },
  // { name: "sodium", label: "Sodium (mg)", field: "sodium" },
  {
    name: "upks",
    label: "УПКС",
    field: "upks",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
];

const tableMode = ref(false);
</script>

<template>
  <div id="table-data">
    <div class="table-wrap">
      <div class="toggle">
        <q-toggle
          v-model="tableMode"
          color="red"
          label="Таблица"
          left-label
        /><span>Карточки</span>
      </div>
      <q-table
        table-style="font-size: 2rem"
        flat
        :grid="tableMode"
        bordered
        :dark="true"
        :square="true"
        :rows="props.data"
        :columns="columns"
        row-key="name"
        class="consul-table"
      />
    </div>

    <ul class="table-details">
      <li>
        <span class="table-details__title">Стоимость объекта</span>
        <p>
          Указана кадастровая стоимость объекта(-ов) недвижимости рассчитанная в
          рамках проведения очередной ГКО
        </p>
      </li>

      <li>
        <span class="table-details__title">Дата начала</span>
        <p>
          Планируемая дата начала применения указанной кадастровой стоимости: с
          01.01.2024г
        </p>
      </li>

      <li>
        <span class="table-details__title">Срок подачи</span>
        <p>Срок подачи замечаний на Отчет по ГКО: до 10.10.2023г</p>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
#table-data {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-block: 4rem 1rem;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
}

.table-wrap {
  order: 2;
  min-width: 0;
  max-width: 100%;
  width: auto;
}

.table-details {
  order: 3;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: clamp(19px, 3vw, 24px);

  @media (max-width: 1000px) {
    order: 1;
  }

  p {
    color: #b5b5b5;
  }

  .table-details__title {
    font-weight: 500;
  }
}

.toggle {
  border: 1px solid white;
  padding: 1rem;
}
</style>

<style>
.q-table__grid-item {
  padding: 0 !important;
}
</style>
