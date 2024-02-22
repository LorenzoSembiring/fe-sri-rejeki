import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Shop from '@/views/Shop.vue'
import Profile from '@/views/Profile.vue'

const router = createRouter({
    history: createWebHistory(),
    routes:
    [
        {
            path: "/dashboard",
            name: "dashboard",
            component: Dashboard
        },
        {
            path: "/register",
            name: "register",
            component: Register
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/", 
            name: "home",
            component: Home
        },
        {
            path: "/shop", 
            name: "shop",
            component: Shop
        },
        {
            path: "/profile", 
            name: "profile",
            component: Profile
        }
    ]
})

export default router