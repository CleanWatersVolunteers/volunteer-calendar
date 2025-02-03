<template>
  <v-container>
    <v-app-bar flat color="primary" app>
        <v-toolbar-title  cols="auto">{{ title || "Календарь смен. Анапа"}}</v-toolbar-title>
        <!-- <v-spacer /> -->
        <v-btn color="secondary" @click="logout">Выйти</v-btn>
    </v-app-bar>

    <v-app-bar flat color="primary">
        <v-container>
        <v-row>
            <v-col 
            v-for="link in links"
            :key="link.text"
            >
            <v-btn
                @click="goTo(link.to)"
                text
                color="white"
            >
                {{ link.text }}
            </v-btn>
            </v-col>
        </v-row>
        </v-container>      
    </v-app-bar>
  </v-container>
</template>


<script>
export default {
  name: "HeaderComponent",
  props: {
    title: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      links: [
        { text: 'Список штабов', to: 'headquarters' },
        { text: 'Список волонтёров', to: 'volunteers' },
      ],

    }
  },
  methods: {
    goTo(page) {
      this.$router.push(`/${page}`);
    },
    logout() {
      localStorage.removeItem("isLoggedIn");
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  }  
}
</script>