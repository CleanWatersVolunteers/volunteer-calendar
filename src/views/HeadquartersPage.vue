<template>
<v-container>
  <header-component></header-component>

  <v-main>
    <v-container>
      <v-row justify="center" >
        <v-col
          v-for="hq in headquarters"
          :key="hq.id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card @click="openShifts(hq.id)">
            <v-card-title>{{ hq.name }}</v-card-title>
            <v-card-text>Локация: {{ hq.location }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</v-container>
</template>



<script>
import { mapState } from 'vuex';
import HeaderComponent from '../components/HeaderComponent.vue'

export default {
  name: "HeadquartersPage",
  components: {
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
    ...mapState['shifts'], 
    headquarters() {
      return this.$store.getters["getHeadquarters"];
    },
  },
  async mounted() {
    await this.$store.dispatch('loadHQ');
    console.log(this.headquarters);
  },
  methods: {
    openShifts(hqId) {
      this.$router.push(`/headquarters/${hqId}`);
    },
  },
};
</script>