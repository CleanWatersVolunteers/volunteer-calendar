<template>
    <v-card-text >
      <v-data-table
        hide-default-footer
        :headers="headers"
        :items="volunteersItems"
        class="elevation-1"
      > 
        <template v-slot:top>
          <v-toolbar :class="isStaffed ? 'green-background' : ''"
            flat
          >
            <v-toolbar-title >{{ shift.time }}</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
              v-model="showShiftEdit"
              max-width="500px"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  class="mb-2"
                  color="primary"
                  dark
                  v-bind="props"
                >
                  Изменить смену
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Изменить смену: {{ shift.time }} {{ sectionName }} {{ role }} </span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        md="4"
                        sm="6"
                      >
                        <v-text-field
                          v-model="localShift.required"
                          label="Требуется волонтеров"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        md="4"
                        sm="6"
                      >
                        <v-text-field
                          v-model="localShift.experienced"
                          label="Из них опытных"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="closeShiftEdit"
                  >
                    Отмена
                  </v-btn>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="saveShiftEdit"
                  >
                    Сохранить
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:item="{ item }">
          <tr :class="getRowClass(item)">
            <td>{{ item.id }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.volunteer.name }}</td>
            <td>{{ item.volunteer.phone }}</td>
            <td>{{ item.volunteer.telegram }}</td>
            <td>{{ item.experience ? 'Нужен' : '' }}</td>
            <td>{{ item.volunteer.note}}</td>
          </tr>
        </template>
      </v-data-table>

      <VolunteerForm
        v-if="showVolunteerForm"
        :sectionName="sectionName"
        :shiftTime="shiftTime"
        :role="role.role"
        @add-volunteer="handleAddVolunteer"
      />
      <!-- <v-btn
        color="primary"
        class="mt-2"
        @click="showVolunteerForm = true"
      >
        Добавить волонтера
      </v-btn> -->
    </v-card-text>
</template>

<script>
import VolunteerForm from "./VolunteerForm.vue";

export default {
  name: "RoleCard",
  props: {
    shift: {
      type: Object,
      required: true,
    },
    sectionName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      headers: [
        { title: "№", value: "id" },
        { title: "Статус", value: "status"},
        { title: "ФИО", value: "volunteer.name" },
        { title: "Телефон", value: "volunteer.phone" },
        { title: "Телеграм", value: "volunteer.telegram" },
        { title: "Опыт", value: "experience" },
        { title: "Примечания", value: "volunteer.notes" },
      ],
      showVolunteerForm: false,
      localShift: this.shift,
      showShiftEdit: false,
    };
  },
  components: {
    VolunteerForm,
  },
  computed: {
    volunteersItems() {
      const volunteers = this.shift?.volunteers || null;
      const required = this.shift?.required || 0;
      const experiencedCnt = this.shift?.experienced || 0

      const experienced = volunteers?.filter(person => person.experience) || [];   // уточняем, сколько есть опытных среди волонтеров
      const inexperienced = volunteers?.filter(person => !person.experience) || [];

      // формируем список вансий для смены
      const result = []
      for (let i = 0; i < experiencedCnt; i++) {
        const elem = {
          id: i+1,
          status: "Не закрыта",
          volunteer: {},
          experience: true, 
        }
        if (i < experienced.length) {
          elem.volunteer = experienced[i]
          elem.status = "Закрыта"
        } 
        result.push(elem);
      }
      
      // Формируем оставшиеся 5 элементов из списка inexperienced
      for (let i = 0; i < required - experiencedCnt; i++) {
        const elem = {
          id: i+1 + experiencedCnt,
          status: "Не закрыта",
          volunteer: {},
          experience: false, 
        }
        if (i < inexperienced.length) {
          elem.volunteer = inexperienced[i] 
          elem.status = "Закрыта"
        } 
        result.push(elem);
      }
      return result
    },
    isStaffed() {
      const volunteersCount = this.shift.volunteers.length
      // Считаем количество опытных волонтеров
      const experiencedVolunteers = this.shift.volunteers.filter(person => person.experience === true).length;
      return this.shift.required === volunteersCount && this.shift.experienced === experiencedVolunteers
    }
  },
  watch: {
    showShiftEdit (val) {
      val || this.closeShiftEdit()
    },
  },
  methods: {
    handleAddVolunteer(volunteer) {
      this.$emit("add-volunteer", volunteer);
      this.showVolunteerForm = false;
    },
    getRowClass(item) {
      return (item.status === "Закрыта") ? "row-is-staffed" : "row-is-free"; // пока ограничиваемся двумя классами
    },
    closeShiftEdit() {
      this.showShiftEdit = false
      // в примере еще вот такой код есть, пока не понимаю, зачем
      // this.$nextTick(() => {
      //     this.editedItem = Object.assign({}, this.defaultItem)
      //     this.editedIndex = -1
      //   })
    },
    saveShiftEdit() {
        // if (this.editedIndex > -1) {
        //   Object.assign(this.desserts[this.editedIndex], this.editedItem)
        // } else {
        //   this.desserts.push(this.editedItem)
        // }
        this.closeShiftEdit()
      },
  },
};
</script>

<style>
.green-background {
  background-color: green; /* Цвет фона */
  color: white; /* (опционально) цвет текста для контраста */
}

.row-is-staffed {
  background-color: #b8f7b2; /* Зеленый цвет для закрытой смены */
}

.row-is-free {
  background-color: #ffebee; /* Розовый цвет для незакрытой смены */
}

</style>