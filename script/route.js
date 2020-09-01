const router=new VueRouter({
    routes: [
        {path:"/Home",component:Home},
        {path:"/Background",component: Background}
    ]
})
const app =new Vue({
    router:router
}).$mount('#app')