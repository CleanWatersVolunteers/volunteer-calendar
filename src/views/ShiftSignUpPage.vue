<template>
  <v-container>
    <v-btn @click="$router.go(-1)" color="primary" class="mb-4">
      Назад
    </v-btn>

    <v-card>
      <v-card-title>{{ shift.name }}</v-card-title>
      <v-card-subtitle>{{ shift.description }}</v-card-subtitle>
      <v-card-text>
        <p>Здесь могут быть дополнительные детали для блока {{ shift.id }}.</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { getShiftById } from '../services/shiftService'

export default {
  data() {
    return {
      shift: {}
    }
  },
  created() {
    const shiftId = this.$route.params.id
    this.shift = getShiftById(shiftId) // Получаем данные смены по ID
  }
}
</script>

<style scoped>
.v-card {
  max-width: 600px;
  margin: 20px auto;
}
</style>
