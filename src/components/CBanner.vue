<script setup>
import { ref } from "vue";
import "../styles/index.css";
import axios from "axios";

const props = defineProps(["numbers"]);

const api = "https://api3.consul.group/v1/ownex/cost/email";

const form = ref(null);
const showContactDialog = ref(false);
const showSuccessDialog = ref(false);
const showErrorDialog = ref(false);
const name = ref("");
const phone = ref("");
const mail = ref("");

const getNumbers = (numbers) => numbers.map((item) => item.number);

const modelMultiple = ref(getNumbers(props.numbers));

const onSubmit = () => {
  form.value.validate().then((success) => {
    if (success) {
      // const payload = {
      //   name: name.value,
      //   phone: `+7 ${phone.value}`,
      //   email: mail.value,
      //   cadastre: getNumbers(props.numbers).join(","),
      // };

      // console.log(payload);

      axios
        .post(api, {
          name: name.value,
          phone: `+7 ${phone.value}`,
          email: mail.value,
          cadastre: getNumbers(props.numbers).join(","),
        })
        .then(() => {
          name.value = "";
          phone.value = "";
          mail.value = "";
          modelMultiple.value = getNumbers(props.numbers);
          showContactDialog.value = false;
          showSuccessDialog.value = true;
        })
        .catch((error) => {
          console.error(error);
          showContactDialog.value = false;
          showErrorDialog.value = true;
        });
    }
  });
};
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
      @click="showContactDialog = true"
    />
  </div>

  <q-dialog
    v-model="showContactDialog"
    :square="true"
    :persistent="true"
    class="consul-dialog feedback-dialog"
  >
    <q-card>
      <q-card-section class="consul-dialog__header">
        <q-icon name="contact_support" />
        <div class="text-h6">Отправить сообщение</div>
      </q-card-section>

      <q-card-section class="q-pt-none text-subtitle1">
        <q-form @submit.prevent="onSubmit" class="q-gutter-md" ref="form">
          <q-input
            filled
            v-model="name"
            label="Введите Ваше имя"
            :square="true"
            outlined
            clearable
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'Это обязательное поле',
              (val) =>
                (val.length > 0 && val.length < 100) || 'Это обязательное поле',
            ]"
          />

          <q-input
            filled
            v-model="phone"
            label="Введите телефон"
            :square="true"
            outlined
            clearable
            mask="(###) ### - ####"
            prefix="+7"
            unmasked-value
            lazy-rules
            :rules="[
              (val) => val.length > 9 || 'Номер должен состоять из 10 символов',
            ]"
          />

          <q-input
            filled
            type="email"
            v-model="mail"
            label="Введите свою почту"
            :square="true"
            outlined
            clearable
            :rules="[
              (val) => (val !== null && val !== '') || 'Это обязательное поле',
              (val) =>
                (val.length > 0 && val.length < 100) || 'Это обязательное поле',
            ]"
          />

          <q-select
            class="multiselect"
            filled
            v-model="modelMultiple"
            :options-dense="true"
            popup-content-class="select-dropdown"
            multiple
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="getNumbers(props.numbers)"
            :square="true"
            use-chips
            outlined
            stack-label
            label="Кадастровый(-е) номер(-а)"
            :rules="[
              (val) =>
                (val !== null && val.length) || 'Выберите кадастровый номер',
            ]"
          />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="red" @click="onSubmit" />
        <q-btn flat label="Отмена" color="grey" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showSuccessDialog" :square="true" class="consul-dialog">
    <q-card>
      <q-card-section class="consul-dialog__header">
        <q-icon name="done" />
        <div class="text-h6">Успех</div>
      </q-card-section>

      <q-card-section class="q-pt-none text-subtitle1">
        Сообщение отправлено успешно.
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showErrorDialog" :square="true" class="consul-dialog">
    <q-card>
      <q-card-section class="consul-dialog__header">
        <q-icon name="error" />
        <div class="text-h6">Ошибка</div>
      </q-card-section>

      <q-card-section class="q-pt-none text-subtitle1">
        При отправке сообщения возникла ошибка.
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss">
.select-dropdown {
  font-size: 12px !important;
}
.multiselect {
  width: 500px;

  @media (max-width: 600px) {
    width: initial;
  }
}
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
