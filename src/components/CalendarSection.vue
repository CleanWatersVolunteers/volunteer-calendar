<template>
  <v-card class="mb-6">
    <v-card-title>{{ section.notes }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row 
        v-for="role in section.roles"
        :key="role.role"
      >
        <v-col>
          <RoleCard :role="role" :sectionName="section.name" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import RoleCard from "./RoleCard.vue";

export default {
  name: 'CalendarSection',
  props: {
    section: {
      type: Object,
      required: true,
    }
  },
  components: {
    RoleCard,
  },
};
</script>
