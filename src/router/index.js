import Vue from 'vue'
import Router from 'vue-router'
import KreirajNovu from '@/components/KreirajNovu/KreirajNovu'
import Katalozi from '@/components/Katalozi/Katalozi'
import Artikli from '@/components/Artikli/Artikli'
import Dobavljaci from '@/components/Dobavljaci/Dobavljaci'
import Kupac from '@/components/Kupac/Kupac'
import Mesto from '@/components/Mesto/Mesto'
import Status from '@/components/Status/Status'

import 'vuetify/dist/vuetify.min.css'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Kreiraj novu',
            component: KreirajNovu
        },
        {
            path: '/katalozi',
            name: 'Katalozi',
            component: Katalozi
        },
        {
            path: '/artikli',
            name: 'Artikli',
            component: Artikli
        },
        {
            path: '/dobavljaci',
            name: 'Dobavljači',
            component: Dobavljaci
        },
        {
            path: '/kupac',
            name: 'Kupac',
            component: Kupac
        },
        {
            path: '/mesto',
            name: 'Mesto',
            component: Mesto
        },
        {
            path: '/status',
            name: 'Status',
            component: Status
        }
    ]
})