<template>
  <v-container>
    <header-component title="Календарь смен: Список волонтёров"></header-component>

    <v-main>

      <!-- Панель с фильтрами -->
      <v-row  class="mb-0 px-2" align="center">
        <v-col cols="12" sm="8" md="4" class="mb-0 pa-1 pr-2">
          <v-text-field
            v-model="search"
            label="Поиск по ФИО, телефону, Telegram"
            variant="outlined"
            dense
            hide-details
            clearable
          />
        </v-col>
        <v-col cols="12" sm="4" class="d-flex text-right mb-0 pa-1 "> 
          <v-switch 
            v-model="showActiveOnly"
            color="primary"
            label="Только не уехавшие волонтеры"
            inset
            hide-details
          />
        </v-col>
      </v-row>

      <v-data-table 
        v-if="!isMobile"
        :headers="headers" 
        :items="filteredVolunteers" 
        :items-per-page="20"
        item-key="name"
        class="elevation-1 compact-table" 
        density="compact"
      />


      <!-- Карточки для мобильных устройств -->
      <v-row v-if="isMobile">
        <v-col v-for="volunteer in filteredVolunteers" :key="volunteer.id" cols="12">
          <v-card class="pa-1" >
            <v-card-title align="left">{{ volunteer.name }}</v-card-title>
            <v-card-subtitle align="left">Период работ: {{ volunteer.date_start }} - {{ volunteer.date_end }}</v-card-subtitle>
            <v-card-text align="left">
              <p><strong>Телефон:</strong> {{ volunteer.phone }}</p>
              <p><strong>Телеграм:</strong> {{ volunteer.tg_username }}</p>
              <p><strong>Навыки:</strong> {{ volunteer.skills }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

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
      isMobile: window.innerWidth < 600, // Проверяем размер экрана
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
    checkScreenSize() {
      this.isMobile = window.innerWidth < 600;
    },
  },
  async mounted() {
    // Отслеживаем изменение ширины окна
    window.addEventListener("resize", this.checkScreenSize);

    // Получаем список волонтёров
    await this.$store.dispatch("loadVolunteers");
    console.log("mounted vol", this.volunteers);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
};
</script>

<style>
/* Стили для компактной таблицы */
.compact-table .v-data-table {
  font-size: 14px;
}
</style>