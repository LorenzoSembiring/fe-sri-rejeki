import { createRouter, createWebHistory } from "vue-router";
import { checkAdmin } from "@/auth";
import Dashboard from "@/views/Dashboard.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Shop from "@/views/Shop.vue";
import ProfileOld from "@/views/ProfileOld.vue";
import Profile from "@/views/Profile.vue";
import ProfileAddress from "@/views/ProfileAddress.vue";
import TransactionHistory from "@/views/TransactionHistory.vue"
import Product from "@/views/Product.vue";
import View3D from "@/views/View3D.vue";
import Cart from "@/views/Cart.vue";
import Shipping from "@/views/Shipping.vue";
import AdminDashboard from "@/views/admin/Dashboard.vue";
import AdminProduct from "@/views/admin/Product.vue";
import AdminAddProduct from "@/views/admin/AddProduct.vue";
import AdminEditProduct from "@/views/admin/EditProduct.vue";
import AdminDetailProduct from "@/views/admin/DetailProduct.vue";
import D3 from "@/views/admin/3D.vue";
import AdminAdd3D from "@/views/admin/Add3D.vue";
import AdminCategory from "@/views/admin/Category.vue";
import AdminAddCategory from "@/views/admin/AddCategory.vue";
import AdminEditCategory from "@/views/admin/EditCategory.vue";
import Order from "@/views/admin/Order.vue";
import Statistic from "@/views/admin/Statistic.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/shop",
      name: "shop",
      component: Shop,
    },
    {
      path: "/profile-old",
      name: "profileold",
      component: ProfileOld,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },
    {
      path: "/profile/address",
      name: "profile-address",
      component: ProfileAddress,
    },
    {
      path: "/profile/transaction-history",
      name: "transaction-history",
      component: TransactionHistory,
    },
    {
      path: "/product/:id",
      name: "product",
      component: Product,
      props: true,
    },
    {
      path: "/product/:id/3d",
      name: "3D",
      component: View3D,
      props: true,
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart,
    },
    {
      path: "/shipping",
      name: "shipping",
      component: Shipping,
    },
    {
      path: "/admin/dashboard",
      name: "Admin Dashboard",
      component: AdminDashboard,
			meta: { requiresAuth: true, role: 'admin' }
    },
    {
      path: "/admin/product",
      name: "Manage Product",
      component: AdminProduct,
			meta: { requiresAuth: true, role: 'admin' }
    },
    {
			path: "/admin/add-product",
      name: "Add Product",
      component: AdminAddProduct,
			meta: { requiresAuth: true, role: 'admin' }
    },
    {
			path: "/admin/product/:id",
      name: "Detail Product",
      component: AdminDetailProduct,
      props: true,
			meta: { requiresAuth: true, role: 'admin' }
    },
    {
			path: "/admin/edit-product/:id",
      name: "Edit Product",
      component: AdminEditProduct,
      props: true,
			meta: { requiresAuth: true, role: 'admin' }
    },
    {
			path: "/admin/3d",
      name: "d3",
      component: D3,
			meta: { requiresAuth: true, role: 'admin' }
    },
    {
			path: "/admin/category",
      name: "Manage Category",
      component: AdminCategory,
			meta: { requiresAuth: true, role: 'admin' }
    },
    {
			path: "/admin/add-category",
      name: "Add Category",
      component: AdminAddCategory,
			meta: { requiresAuth: true, role: 'admin' }
    },
    {
			path: "/admin/edit-category/:id",
      name: "Edit Category",
      component: AdminEditCategory,
      props: true,
			meta: { requiresAuth: true, role: 'admin' }
    },
    {
			path: "/admin/order",
      name: "Order",
      component: Order,
			meta: { requiresAuth: true, role: 'admin' }
    },
    {
			path: "/admin/statistic",
      name: "Statistic",
      component: Statistic,
			meta: { requiresAuth: true, role: 'admin' }
    },
    {
			path: "/admin/add-3d",
      name: "Add 3D",
      component: AdminAdd3D,
			meta: { requiresAuth: true, role: 'admin' }
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const role = to.meta.role;

  if (requiresAuth) {
    const isAdmin = await checkAdmin();
    if (isAdmin) {
      next();
    } else {
      if (role && role === "admin") {
        next({ name: "home" });
      } else {
        next({ name: "login" });
      }
    }
  } else {
    next();
  }
});

export default router;
