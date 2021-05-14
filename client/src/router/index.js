import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: "/",
        name: "notes",
        component: () => import("../views/notes.vue"),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/note/:id",
        name: 'viewnote',
        component: () => import("../views/note.vue"),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/account",
        name: "account",
        component: () => import("../views/account.vue"),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/login.vue")
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../views/register.vue")
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem("jwt") == null) {
            next({
                path: "/login"
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router