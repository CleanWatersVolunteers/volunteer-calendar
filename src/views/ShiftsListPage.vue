<template>
  <v-container>
    <header-component :title="pageTitle"></header-component>

    <v-main>
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
    };
  },
  computed: {
    ...mapState(["shifts"]),
    sections() {
      console.log("ID:", Number(this.id));
      const result = this.$store.getters["getSectionsByHeadquarter"](Number(this.id));
      return result || []
    },
    currentHeadquarter() {
      return this.$store.getters["getHeadquarterById"](Number(this.id))
    },
    pageTitle() {
      return "Календарь смен: "+ this.currentHeadquarter.name
    }
  },
  methods: {
  }
};
</script>