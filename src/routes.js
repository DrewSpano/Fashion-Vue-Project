import LandingPage from './components/Pages/LandingPage.vue';
import LoginPage from './components/Pages/LoginPage';
import CreatePage from './components/Pages/CreatePage.vue';
import ProfilePage from './components/Pages/ProfilePage.vue';
import TracklistPage from './components/Pages/TracklistPage.vue';
import DashboardPage from './components/Pages/DashboardPage.vue';
import BlogPage from './components/Pages/BlogPage.vue';
import DonatePage from './components/Pages/DonatePage.vue';


export const routes = [
    {path: '/', component: LandingPage},
    {path: '/Login', component: LoginPage},
    {path: '/Create', component: CreatePage},
    {path: '/Profile', component: ProfilePage},
    {path: '/Tracklist', component: TracklistPage},
    {path: '/Dash', component: DashboardPage},
    {path: '/Blog', component: BlogPage},
    {path: '/Donate', component: DonatePage},
]