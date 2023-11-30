import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Register from '@/views/Register.vue'

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
        }
    ]
})

export default router