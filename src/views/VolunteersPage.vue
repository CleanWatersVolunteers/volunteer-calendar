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
        { title: "Телеграм", value: "tg_username"},
        { title: "Опыт", value: "bird_skill_id"}
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
  async mounted() {
    await this.$store.dispatch("loadVolunteers");
    console.log("mounted vol", this.volunteers);
  }
};
</script>
