import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Shop from '@/views/Shop.vue'
import Profile from '@/views/Profile.vue'
import Product from '@/views/Product.vue'
import View3D from '@/views/View3D.vue'
import Cart from '@/views/Cart.vue'
import Shipping from '@/views/Shipping.vue'
import AdminDashboard from '@/views/admin/Dashboard.vue'
import AdminProduct from '@/views/admin/Product.vue'
import AdminAddProduct from '@/views/admin/AddProduct.vue'
import D3 from '@/views/admin/3D.vue'
import AdminCategory from '@/views/admin/category.vue'
import AdminAddCategory from '@/views/admin/AddCategory.vue'

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
        },
        {
            path: "/product/:id",
            name: "product",
            component: Product,
            props: true
        },
        {
            path: "/product/:id/3d",
            name: "3D",
            component: View3D,
            props: true
        },
        {
            path: "/cart",
            name: "cart",
            component: Cart
        },
        {
            path: "/shipping",
            name: "shipping",
            component: Shipping
        },
        {
            path: "/admin/dashboard",
            name: "Admin Dashboard",
            component: AdminDashboard
        },
        {
            path: "/admin/product",
            name: "Manage Product",
            component: AdminProduct
        },
        {
            path: "/admin/add-product",
            name: "Add Product",
            component: AdminAddProduct
        },
        {
            path: "/admin/3d",
            name: "d3",
            component: D3
        },
        {
            path: "/admin/category",
            name: "Manage Category",
            component: AdminCategory
        },
        {
            path: "/admin/add-category",
            name: "Add Category",
            component: AdminAddCategory
        },
    ]
})

export default router