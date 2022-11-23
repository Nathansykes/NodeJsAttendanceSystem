import { createWebHistory, createRouter } from 'vue-router';
 
const routes = [
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
    },
    {
        path: "/",
        alias: "/home",
        name: "home",
        component: () => import("./components/HomeList.vue")
    },
    {
        path: "/sessions/:id",
        alias: "/sessions",
        name: "Attendance View",
        component: () => import("./components/AttendanceView.vue")
    },
    {
        path: "/",
        alias: "/reporting",
        name: "reporting",
        component: () => import("./components/Reporting.vue")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: "active"
});

export default router;
