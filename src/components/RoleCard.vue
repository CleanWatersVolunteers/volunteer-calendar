<template>
  <v-card outlined>
    <v-card-title>{{ role.role }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col v-for="shift in role.shifts" :key="shift.time" >
          <ShiftCard :shift="shift" :sectionName="sectionName" :role="role.role" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>


<script>
import ShiftCard from "./ShiftCard.vue";

export default {
  name: "RoleCard",
  props: {
    role: {
      type: Object,
      required: true,
    },
    sectionName: {
      type: String,
      required: true,
    },
  },
  components: {
    ShiftCard,
  },
};
</script>
