import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from "@/views/LoginPage";
import AdminLayout from "@/views/AdminLayout";
import DashboardPage from "@/views/DashboardPage";
import AddUser from "@/views/AddUser";
import ApprovedUsers from "@/views/ApprovedUsers";
import NonApprovedUsers from "@/views/NonApprovedUsers";
import AdminUsers from "@/views/AdminUsers";
import ChartPage from "@/views/ChartPage";
import RegisterPage from "@/views/RegisterPage";
import CustomerLayout from "@/views/CustomerLayout";
import SubscriptionInfo from "@/views/SubscriptionInfo";
import ProfilePage from "@/views/ProfilePage";
import ResetPassword from "@/views/ResetPassword";
import CompleteReset from "@/views/CompleteReset";

const routes = [
  {
    path:"/",
    redirect:"/login"
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
  {
    path: '/reset_password',
    name: 'reset',
    component: ResetPassword
  },
  {
    path: '/complete_reset/:user_id/:code',
    name: 'complete_reset',
    component: CompleteReset
  },
  {
    path: '/user',
    name: 'user',
    component: CustomerLayout,
    children: [
      {
        path: 'chart',
        name: 'chart_user',
        component: ChartPage
      },
      {
        path: 'profile',
        name: 'profile',
        component: ProfilePage
      },
      {
        path: 'subscription',
        name: 'subscription',
        component: SubscriptionInfo
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
   component: AdminLayout,
    children: [
      {
        name: 'dashboard',
        path: 'dashboard',
        component: DashboardPage,
      },
      {
        name: 'adduser',
        path: 'add_user',
        component: AddUser,
      },
      {
        name: 'approved_users',
        path: 'approved_users',
        component: ApprovedUsers,
      },
      {
        name: 'non_approved_users',
        path: 'non_approved_users',
        component: NonApprovedUsers,
      },
      {
        name: 'admin_users',
        path: 'admin_users',
        component: AdminUsers,
      },
      {
        name: 'chart',
        path: 'chart',
        component:ChartPage,
      },
      ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
