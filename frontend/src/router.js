import { createWebHistory, createRouter } from 'vue-router';
 
const routes = [
    {
        path: "/",
        alias: "/users",
        name: "users",
        component: () => import("./components/UserList.vue")
    },
    {
        path:"/",
        alias:"/upload",
        name:"upload",
        component: () => import("./components/UploadFile.vue")
    },
    {
        path: "/",
        alias: "/login",
        name: "Login Page",
        component: () => import("./components/Login.vue")
    },
    {
        path: "/",
        alias: "/secure",
        name: "Secure Index",
        component: () => import("./components/SecureIndex.vue")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
