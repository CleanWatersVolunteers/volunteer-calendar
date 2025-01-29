import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from "../views/LoginPage.vue";
import HeadquartersPage from "../views/HeadquartersPage.vue";
import ShiftsListPage from "../views/ShiftsListPage.vue";
import VolunteersPage from "../views/VolunteersPage.vue";
// import store from '../store/shifts.js';


const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/headquarters",
    name: "Headquarters",
    component: HeadquartersPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/headquarters/:id',
    name: 'ShiftsListPage',
    component: ShiftsListPage,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/volunteers",
    name: "Volunteers",
    component: VolunteersPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/",
    redirect: "/login",
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Auth Guard
router.beforeEach((to, from, next) => {
  // для авторизации по API
  // const isAuthenticated = store.getters['isAuthenticated'];
  // if (to.meta.requiresAuth && !isAuthenticated) {
  //   next("/login");
  // } else {
  //   next();
  // }

  // замоканные данные
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router
