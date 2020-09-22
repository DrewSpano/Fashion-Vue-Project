import LandingPage from './components/Pages/LandingPage.vue';
import LoginPage from './components/Pages/LoginPage';
import CreatePage from './components/Pages/CreatePage.vue';
import ProfilePage from './components/Pages/ProfilePage.vue';


export const routes = [
    {path: '/', component: LandingPage},
    {path: '/Login', component: LoginPage},
    {path: '/Create', component: CreatePage},
    {path: '/Profile', component: ProfilePage}
]