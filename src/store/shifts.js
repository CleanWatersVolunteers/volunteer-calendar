import { createStore } from 'vuex';
import { login } from '../services/auth'
import { loadVolunteers, loadHQ, loadShifts } from '../services/api'

export default createStore({
  namespaced: true,
  state: {
    isLoggedIn: false, // Для логина МОК
    loginError: null,
    // Для логина через API    
    token: null,
    user: null,
    // мок для штабов и прочего
    headquarters: [
      {
        id: 1,
        name: "Жемчужная, 9",
        location: "Анапа",
      },
      {
        id: 2,
        name: "Мира, 113",
        location: "Анапа",
      },
    ],
    shifts: {},
    sections: [
      {
        name: "ШТАБ",
        headquarter: 9,
        roles: [
          {
            role: "Координатор штаба",
            shifts: [ 
              {
                time: "00:00-08:00",
                required: 1,
                experienced: 1,
                volunteers: [
                  { id: 1, name: "Иван Иванов", experience: true, phone: "123456", telegram:"", notes: "" },
                ],
              }, 
              {
                time: "08:00-16:00",
                required: 1,
                experienced: 1,
                volunteers: [ ],
              },
              {
                time: "16:00-24:00",
                required: 1,
                experienced: 1,
                volunteers: [
                  { id:2, name: "Царева Екатерина", experience: true, phone: "+7900000000", notes: "" }
                ],
              }
            ]
          },
          {
            role: "Администратор",
            shifts: [ 
              {
                time: "00:00-08:00",
                required: 1,
                experienced: 1,
                volunteers: [
                  { id: 1, name: "Иван Иванов", experience: true, phone: "123456", notes: "" },
                ],
              }, 
              {
                time: "08:00-16:00",
                required: 1,
                experienced: 1,
                volunteers: [ ],
              },
              {
                time: "16:00-24:00",
                required: 1,
                experienced: 1,
                volunteers: [
                  { id:2, name: "Царева Екатерина", experience: true, phone: "+7900000000", notes: "" }
                ],
              }
            ],
          },
          {
            role: "Связист",
            shifts: [ 
              {
                time: "00:00-08:00",
                required: 1,
                experienced: 1,
                volunteers: [
                  { id: 1, name: "Иван Иванов", experience: true, phone: "123456", notes: "" },
                ],
              }, 
              {
                time: "08:00-16:00",
                required: 1,
                experienced: 1,
                volunteers: [ ],
              },
              {
                time: "16:00-24:00",
                required: 1,
                experienced: 1,
                volunteers: [
                  { id:2, name: "Царева Екатерина", experience: true, phone: "+7900000000", notes: "" }
                ],
              }
            ]
          },
        ],
      },
      {
        name: "ПТИЦЫ",
        headquarter: 1,  // в какому штабу относится секция
        roles: [
          {
            role: "Регистрация птиц",
            shifts: [
              {
                time: "00:00-08:00",
                required: 3,
                experienced: 1,
                volunteers: [
                  { id: 1, name: "Анна Петрова", phone: "789101", experience: true },
                ],
              },
              {
                time: "08:00-16:00",
                required: 3,
                experienced: 1,
                volunteers: [
                  { id: 1, name: "Анна Петрова", phone: "789101", experience: true },
                ],
              },
              {
                time: "16:00-00:00",
                required: 5,
                experienced: 1,
                volunteers: [
                ],
              }
            ]
          },
          {
            role: "Вет.врач (первичка+крахмал+мойка)",
            shifts: [
              {
                time: "08:00-20:00",
                required: 1,
                experienced: 1,
                volunteers: [
                  { id: 1, name: "Анна Петрова", phone: "789101", experience: true },
                ],
              },
              {
                time: "20:00-08:00",
                required: 1,
                experienced: 1,
                volunteers: [
                  { id: 1, name: "Анна Петрова", phone: "789101", experience: true },
                ],
              }
            ]
          },
          {
            role: "Первичка",
            shifts: [
              {
                time: "00:00-08:00",
                required: 10,
                experienced: 4,
                volunteers: [
                  { id: 1, name: "Анна Петрова", phone: "789101", experience: true },
                  { id: 1, name: "Анна Петрова", phone: "789101", experience: true },
                  { id: 1, name: "Анна Петрова", phone: "789101", experience: false },
                  { id: 1, name: "Анна Петрова", phone: "789101", experience: false },
                ],
              },
              {
                time: "08:00-16:00",
                required: 10,
                experienced: 4,
                volunteers: [
                  { id: 1, name: "Анна Петрова", phone: "789101", experience: true },
                ],
              },
              {
                time: "16:00-00:00",
                required: 10,
                experienced: 4,
                volunteers: [
                ],
              }
            ]
          },
        ],
      },
    ],
    volunteers: [
      { id: 1, name: "Анна Петрова", experience: true, phone: "+79991234567", telegram: "@anna_petrova", note: "" },
      { id: 2, name: "Иван Иванов", experience: false, phone: "", telegram: "", note: "Может участвовать только по выходным" },
      { id: 3, name: "Мария Сидорова", experience: true, phone: "+79998765432", telegram: "@maria_sidorova", note: "" },
      { id: 4, name: "Олег Смирнов", experience: false, phone: "+79991239876", telegram: "@oleg_smirnov", note: "" },
      { id: 5, name: "Елена Воробьева", experience: true, phone: "", telegram: "", note: "Имеет опыт работы с детьми" },
      { id: 6, name: "Николай Карпов", experience: false, phone: "", telegram: "@nik_karpov", note: "" },
      { id: 7, name: "Светлана Орлова", experience: true, phone: "+79995556677", telegram: "", note: "" },
      { id: 8, name: "Дмитрий Зайцев", experience: false, phone: "+79990001122", telegram: "@dima_zaitsev", note: "Доступен только вечером" },
      { id: 9, name: "Екатерина Лебедева", experience: true, phone: "", telegram: "@katya_lebeda", note: "" },
      { id: 10, name: "Алексей Морозов", experience: false, phone: "+79992223344", telegram: "", note: "" },
      { id: 11, name: "Ольга Павлова", experience: true, phone: "+79998887766", telegram: "@olga_pavlova", note: "Работала на крупных мероприятиях" },
      { id: 12, name: "Михаил Круглов", experience: false, phone: "", telegram: "@mikhail_kruglov", note: "" },
      { id: 13, name: "Татьяна Попова", experience: true, phone: "+79991112233", telegram: "", note: "" },
      { id: 14, name: "Андрей Фёдоров", experience: false, phone: "+79997775544", telegram: "@andrey_fedorov", note: "" },
      { id: 15, name: "Юлия Кузнецова", experience: true, phone: "", telegram: "", note: "Готова работать удаленно" },
    ]
  },
  getters: {
    getHeadquarters(state) {
      return state.headquarters
    },
    getSections(state) {
      return state.sections;
    },
    getSectionsByHeadquarter: (state) => (hqId) => {
      console.log("getSectionsByHeadquarter")
      console.log(state.sections)
      console.log(hqId)
      const sections = state.sections.filter((s) => s.headquarter === hqId)
      console.log(sections)
      return sections 
    },
    getShiftByHeadquarter: (state) => (hqId) => {
      return state.shifts[hqId];
    },
    getHeadquarterById: (state) => (hqId) => {
      return state.headquarters.find((hq) => hq.id === hqId)
    },
    getRoleBySection: (state) => (sectionName, roleName) => {
      const section = state.sections.find((s) => s.name === sectionName);
      return section?.roles.find((role) => role.role === roleName) || null;
    },
    getVolunteersListBySectionShift: (state) => (sectionName, roleName, shiftTime) => {
      const section = state.sections.find((s) => s.name === sectionName);
      const role = section?.roles.find((role) => role.role === roleName) || null;
      const shift = role?.shifts.find((shift) => shift.time === shiftTime) || null; 
      const volunteers = shift?.volunteers || null;
      const required = shift?.required || 0;
      const experiencedCnt = shift?.experienced || 0

      const experienced = volunteers?.filter(person => person.experience) || [];   // уточняем, сколько есть опытных среди волонтеров
      const inexperienced = volunteers?.filter(person => !person.experience) || [];

      // формируем список вансий для смены
      const result = []
      for (let i = 0; i < experiencedCnt; i++) {
        const elem = {
          id: i+1,
          volunteer: {},
          experience: true, 
        }
        if (i < experienced.length) {
          elem.volunteer = experienced[i]
        } 
        result.push(elem);
      }
      
      // Формируем оставшиеся 5 элементов из списка inexperienced
      for (let i = experiencedCnt; i < required; i++) {
        const elem = {
          id: i+1,
          volunteer: {},
          experience: false, 
        }
        if (i < inexperienced.length) {
          elem.volunteer = inexperienced[i] 
        } 
        result.push(elem);
      }
      return result
    },
    getVolunteers: (state) => state.volunteers,
    // isAuthenticated: (state) => !!state.token,
    isAuthenticated: (state) => state.isLoggedIn, // замоканные данные
  },
  mutations: {
    editShift(state, {sectionName, roleName, shiftTime, required, experienced}) {
      const section = state.sections.find((s) => s.name === sectionName);
      if (!section) return;

      const role = section.roles.find((r) => r.role === roleName);
      if (!role) return;

      const shiftData = role.shifts.find((s) => s.time === shiftTime);
      if (!shiftData) return;

      if (shiftData.required !== required) {shiftData.required = required} 
      if (shiftData.experienced !== experienced) {shiftData.experienced = experienced}
    },
    addVolunteerToShift(state, { sectionName, roleName, shiftTime, volunteer }) {
      const section = state.sections.find((s) => s.name === sectionName);
      if (!section) return;

      const role = section.roles.find((r) => r.role === roleName);
      if (!role) return;

      const shiftData = role.shifts.find((s) => s.time === shiftTime);
      if (!shiftData) return;

      shiftData.volunteers.push(volunteer);
    },
    removeVolunteerFromShift(state, { sectionName, shiftTime, role, volunteerId }) {
      const section = state.sections.find((s) => s.name === sectionName);
      if (!section) return;

      const shift = section.shifts.find((s) => s.time === shiftTime);
      if (!shift) return;

      const roleData = shift.roles.find((r) => r.role === role);
      if (!roleData) return;

      roleData.volunteers = roleData.volunteers.filter((v) => v.id !== volunteerId);
    },
    // для авторизации через API
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token)
    },
    setLoginError(state, error) {
      state.loginError = error;
    },
    // setUser(state, user) {
    //   state.user = user;
    // },
    // logout(state) {
    //   state.token = null;
    //   state.user = null;
    // },

    // замоканные данные
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem('token');
    },
    setVolunteers (state, volunteers) {
      state.volunteers = volunteers;
    },
    setHQ (state, hq) {
      state.headquarters = hq;
    },
    setShift (state, { shift, id }) {
      console.log("setShift", shift, id);
      state.shifts[id] = shift;
      console.log("shifts", state.shifts, state.shifts[id]);
    }
  },
  actions: {
    async fetchSections({ commit }) {
      // Пример: загрузка данных с API
      const response = await fetch('/api/sections');
      const sections = await response.json();
      commit('setSections', sections);
    },
    setSections(state, sections) {
      state.sections = sections;
    },
    async login({ commit }, credentials) {
      try {
        const data = await login(credentials); // Попытка выполнить вход
        commit('setToken', data.token); // Сохраняем токен
        commit('login'); // Установка флага успешного входа
        commit('setLoginError', null); // Очищаем сообщение об ошибке
      } catch (error) {
        console.error('Ошибка при входе:', error); // Логирование ошибки
        commit('setLoginError', error.error || 'Неизвестная ошибка'); // Установка сообщения об ошибке
      }
    },
    async loadVolunteers({ commit }) {
      const data = await loadVolunteers();
      console.log(data);
      commit('setVolunteers', data);
    },
    async loadHQ({ commit }) {
      const data = await loadHQ();
      console.log("load data", data);
      commit('setHQ', data);
    },
    async loadShifts({ commit }, id){
      const data = await loadShifts(id);
      console.log("load data", data);
      commit('setShift', { shift: data, id: id });
    },
    logout({ commit }) {
      commit('logout');
      localStorage.removeItem('token'); // Удаляем из localStorage
    },
  },
});