import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/list-email',
            component: () => import('@/layouts/Layout'),
            children: [
                // Components
                {
                    name: 'AddEmailPage',
                    path: 'pages/add-email',
                    component: () => import('@/views/pages/AddEmailPage'),
                },

                {
                    name: 'CreateUser',
                    path: 'pages/create-user',
                    component: () => import('@/views/pages/CreateUser'),
                },

                {
                    name: 'Icons',
                    path: 'pages/icons',
                    component: () => import('@/views/pages/Icons'),
                },

                {
                    name: 'TableSimple',
                    path: 'pages/tables-simple',
                    component: () => import('@/views/pages/TableSimple'),
                },

                {
                    name: 'ListEmail',
                    path: '/list-email',
                    component: () => import('@/views/dashboard/ListEmail'),
                },

                {
                    name: 'Edit',
                    path: '/emails/:id',
                    component: () => import('@/views/pages/Edit')
                }
            ]
        },

    ],
})