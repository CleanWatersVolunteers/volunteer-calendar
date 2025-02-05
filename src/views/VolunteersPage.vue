<template>
  <v-container>
    <header-component title="Календарь смен: Список волонтёров"></header-component>

    <v-main>

      <!-- Панель с фильтрами -->
      <v-row  class="mb-0 px-2" align="center">
        <v-col cols="4" sm="6" md="4" class="mb-0 pa-1 pr-2">
          <v-text-field
            v-model="search"
            label="Поиск по ФИО, телефону, Telegram"
            variant="outlined"
            dense
            hide-details
            clearable
          />
        </v-col>
        <v-col cols="6" class="text-right mb-0 pa-1 ">
          <v-switch 
            v-model="showActiveOnly"
            color="primary"
            label="Только не уехавшие волонтеры"
            inset
            hide-details
          />
        </v-col>
      </v-row>

      <v-responsive min-width="600">
        <v-data-table 
          :headers="headers" 
          :items="filteredVolunteers" 
          :items-per-page="20"
          item-key="name"
          class="elevation-1 compact-table" 
          density="compact"
        />
      </v-responsive>
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
      search: "", // Для поиска
      showActiveOnly: false, // Фильтр активных волонтеров
      headers: [
        { title: "ФИО", value: "name", align: "left" },
        { title: "Телефон", value: "phone", align: "left" },
        { title: "Телеграм", value: "tg_username", align: "left"},
        { title: "Дата начала работ", value: "date_start", align: "center"},
        { title: "Дата окончания работ", value: "date_end", align: "center"},
        { title: "Навыки", value: "skills", align: "left"}, 
        { title: "birds_skill_id", value: "birds_skill_id", align: "left"},
        { title: "Опыт", value: "bird_skill_id", align: "left"}
      ],
    };
  },
  computed: {
    ...mapState["shifts"],
    volunteers() {
      return this.$store.getters["getVolunteers"];
    },
    // Фильтрация по активным волонтерам
    filteredVolunteers() {
      const today = new Date().toISOString().split("T")[0];

      return this.volunteers
        .filter(volunteer => {
          if (this.showActiveOnly) {
            return volunteer.date_end >= today; // Активные волонтеры
          }
          return true;
        })
        .filter(volunteer => {
          // Фильтр по поисковому запросу
          const query = this.search.toLowerCase();
          return (
            volunteer.name.toLowerCase().includes(query) ||
            volunteer.phone.includes(query) ||
            (volunteer.tg_username && volunteer.tg_username.toLowerCase().includes(query))
          );
        });
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

<style>
/* Стили для компактной таблицы */
.compact-table .v-data-table {
  font-size: 14px;
}
</style>