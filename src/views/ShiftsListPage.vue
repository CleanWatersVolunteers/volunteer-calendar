<template>
  <v-container>
    <header-component :title="pageTitle"></header-component>
    <v-main>
    <v-row justify="center" class="mb-4">
      <v-col cols="12" sm="6" md="4">
        <v-menu
          ref="menu"
          v-model="dateMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="selectedDate"
              label="Выберите дату"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="selectedDate"
            no-title
            @input="dateMenu = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
      <v-row 
          v-for="section in sections"
          :key="section.name"
          justify="center" 
          no-gutters
      >
        <v-col>
          <calendar-section :section="section" />
        </v-col>
      </v-row>
    </v-main>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import CalendarSection from "../components/CalendarSection.vue";
import HeaderComponent from "../components/HeaderComponent.vue"

export default {
  props: ["id"],
  components: {
    CalendarSection,
    HeaderComponent,
  },
  data() {
    return {
      links: [
        { text: 'Список штабов', to: 'headquarters' },
        { text: 'Список волонтеров', to: 'volunteers' },
      ],
      dateMenu: false, // Открытие/закрытие меню выбора даты
      selectedDate: new Date().toISOString().substr(0, 10), // Текущая дата по умолчанию
    };
  },
  computed: {
    ...mapState(["shifts"]),
    sections() {
      console.log("ID:", Number(this.id));
      const result = this.$store.getters["getShiftByHeadquarter"](Number(this.id));
      console.log(result);
      return result || []
    },
    currentHeadquarter() {
      return this.$store.getters["getHeadquarterById"](Number(this.id)) || {};
    },
    pageTitle() {
      return "Календарь смен: "+ this.currentHeadquarter.name
    }
  },
  async mounted() {
    await this.$store.dispatch("loadShifts", this.id);
    console.log(this.shifts);
  },
  methods: {
  }
};
</script>