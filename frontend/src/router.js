import { createWebHistory, createRouter } from 'vue-router';
 
const routes = [
    {
        path:"/upload",
        alias:"/upload",
        name:"upload",
        component: () => import("./components/UploadFile.vue")
    },
    {
        path: "/login",
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
        path: "/home",
        alias: "/home",
        name: "home",
        component: () => import("./components/HomeList.vue")
    },
    {
        path: "/attendance/:id",
        alias: "/attendance",
        name: "Attendance View",
        component: () => import("./components/AttendanceView.vue")
    },
    {
        path: "/courses/:id",
        alias: "/courses",
        name: "Course View",
        component: () => import("./components/CourseView.vue")
    },
    {
        path: "/modules/:id",
        alias: "/modules",
        name: "Module View",
        component: () => import("./components/ModuleView.vue")
    },
    {
        path: "/sessions/:id",
        alias: "/sessions",
        name: "Session View",
        component: () => import("./components/SessionView.vue")
    },
    {
        path: "/users/:id",
        alias: "/users",
        name: "User View",
        component: () => import("./components/UserView.vue")
    },
    {
        path: "/reporting",
        alias: "/reporting",
        name: "reporting",
        component: () => import("./components/Reporting.vue")
    },
    {
        path: "/",
        alias: "/Timetable",
        name: "Timetable",
        component: () => import("./components/Timetable.vue")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: "active"
});

export default router;
