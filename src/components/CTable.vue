<script setup>
import { ref } from "vue";

const columns = [
  {
    name: "name",
    required: true,
    label: "Кадастровый номер",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "calories",
    align: "center",
    label: "Кадастровая стоимость",
    field: "calories",
    sortable: true,
  },
  // { name: "fat", label: "УПКС", field: "fat", sortable: true },
  // { name: "carbs", label: "Может что-то еще", field: "carbs" },
  // { name: "protein", label: "Protein (g)", field: "protein" },
  // { name: "sodium", label: "Sodium (mg)", field: "sodium" },
  {
    name: "calcium",
    label: "УПКС",
    field: "calcium",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  // {
  //   name: "iron",
  //   label: "Может что-то еще",
  //   field: "iron",
  //   sortable: true,
  //   sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  // },
];

const rows = [
  {
    name: "000001",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    name: "000002",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    name: "000003",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
  {
    name: "000004",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: "3%",
    iron: "8%",
  },
  {
    name: "000005",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: "7%",
    iron: "16%",
  },
  {
    name: "000006",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: "0%",
    iron: "0%",
  },
  {
    name: "000007",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: "0%",
    iron: "2%",
  },
  {
    name: "000008",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: "0%",
    iron: "45%",
  },
  {
    name: "000009",
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: "2%",
    iron: "22%",
  },
  {
    name: "000010",
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: "12%",
    iron: "6%",
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
        :rows="rows"
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
        <p>Срок подачи замечаний на Отчет по ГКО: до __.__.____г</p>
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
