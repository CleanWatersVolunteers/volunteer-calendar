<template>
  <v-container>
    <header-component title="Календарь смен: Список волонтёров"></header-component>

    <v-main>
      <v-data-table :headers="headers" :items="volunteers" class="elevation-1" />
    </v-main>
    
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import HeaderComponent from "../components/HeaderComponent.vue"

export default {
  name: "VolunteersPage",
  components: {
    HeaderComponent,
  },
  data() {
    return {
      headers: [
        { title: "ФИО", value: "name" },
        { title: "Телефон", value: "phone" },
        { title: "Телеграм", value: "telegram"},
        { title: "Опыт", value: "experience"}
      ],
    };
  },
  computed: {
    ...mapState["shifts"],
    volunteers() {
      return this.$store.getters["getVolunteers"];
    },
  },
  methods: {
  },
};
</script>
