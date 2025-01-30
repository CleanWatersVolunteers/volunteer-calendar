<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on">
        Добавить волонтера
      </v-btn>
    </template>

    <v-card>
      <v-card-title>Добавить волонтера</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="volunteer.name" label="ФИО" />
          <v-text-field v-model="volunteer.phone" label="Телефон" />
          <v-textarea v-model="volunteer.notes" label="Примечания" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text @click="save">Сохранить</v-btn>
        <v-btn color="secondary" text @click="dialog = false">Отмена</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "VolunteerForm",
  props: {
    sectionName: String,
    shiftTime: String,
    role: String,
  },
  data() {
    return {
      dialog: false,
      volunteer: {
        name: "",
        phone: "",
        notes: "",
      },
    };
  },
  methods: {
    save() {
      this.$emit("add-volunteer", this.volunteer);
      this.dialog = false;
    },
  },
};
</script>