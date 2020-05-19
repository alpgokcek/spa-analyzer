/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Pages from '@/pages'
import AuthRequired from '@/AuthRequired'
import Dashboard from '@/pages/Dashboard'
import DashboardIndex from '@/pages/Dashboard/Default'
import i18n from './i18n'

import LayoutIndex from '@/pages/layout/'
import LayoutCreate from '@/pages/layout/create'
import LayoutUpdate from '@/pages/layout/update'

import CustomerIndex from '@/pages/Customer/'
import CustomerCreate from '@/pages/Customer/create'
import CustomerUpdate from '@/pages/Customer/update'

import UserIndex from '@/pages/User/'
import UserCreate from '@/pages/User/create'
import UserUpdate from '@/pages/User/update'

import AuthUpdate from '@/pages/Authorization/update'
import MergeUpdate from '@/pages/Merge/update'

import BalanceUpdate from '@/pages/Balance/update'
import DiscountUpdate from '@/pages/Discount/update'

import ProductIndex from '@/pages/Product/'

import TariffIndex from '@/pages/Tariff/'
import TariffCreate from '@/pages/Tariff/Create'
import TariffUpdate from '@/pages/Tariff/Update'

import PackageIndex from '@/pages/Package/'
import PackageCreate from '@/pages/Package/Create'
import PackageUpdate from '@/pages/Package/Update'

import BrandIndex from '@/pages/Brand/'
import BrandCreate from '@/pages/Brand/Create'

import PhoneIndex from '@/pages/Phone/'
import PhoneCreate from '@/pages/Phone/create'
import PhoneUpdate from '@/pages/Phone/update'

import PPMIndex from '@/pages/PPM/'
import PPMCreate from '@/pages/PPM/create'
import PPMUpdate from '@/pages/PPM/update'

import PinsIndex from '@/pages/Pins/'
import PinsCreate from '@/pages/Pins/Create'
import PinsUpdate from '@/pages/Pins/Update'

import PinCodeIndex from '@/pages/PinCode/'
import PinCodeCreate from '@/pages/PinCode/Create'
import PinCodeUpdate from '@/pages/PinCode/Update'


import Auth from '@/Views/Auth'
import Login from '@/Views/Auth/Login'
import Register from '@/Views/Auth/Register'
import ForgotPassword from '@/Views/Auth/ForgotPassword'
import ResetPassword from '@/Views/Auth/ResetPassword'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: Pages,
    redirect: '/Dashboard',
    beforeEnter: AuthRequired,
    children: [
      {
        path: '/Dashboard', component: Dashboard, redirect: '/Dashboard', children: [
          { path: '/', name: 'Dashboard', component: DashboardIndex }
        ]
      },
      {
        path: '/', component: LayoutIndex, children: [
          { path: '/Customer', name: 'Customer', component: CustomerIndex, meta: { title: i18n.t('router.Customer'), createLink: 'CustomerCreate'} },
          { path: '/Customer/passive', name: 'CustomerPassive', component: CustomerIndex, meta: { title: i18n.t('router.PassiveCustomers'), createLink: 'CustomerCreate'} },
          { path: '/User', name: 'User', component: UserIndex, meta: { title: i18n.t('router.User'), createLink: 'UserCreate'} },
          { path: '/User/:customer', name: 'CustomerUser', component: UserIndex, meta: { title: i18n.t('router.CustomersUsers'), createLink: 'UserCreate'} },
          { path: '/Product', name: 'Products', component: ProductIndex, meta: { title: i18n.t('router.Product'), createLink: ''} },
          { path: '/Phone', name: 'Phone', component: PhoneIndex, meta: { title: i18n.t('router.Phone'), createLink: 'PhoneCreate'} },
          { path: '/Brand/:type', name: 'Brand', component: BrandIndex, meta: { title: i18n.t('router.Brand'), createLink: 'BrandCreate'} },
          { path: '/Tariff', name: 'Tariff', component: TariffIndex, meta: { title: i18n.t('router.Tariff'), createLink: 'TariffCreate'} },
          { path: '/Package', name: 'Package', component: PackageIndex, meta: { title: i18n.t('router.Package'), createLink: 'PackageCreate'} },
          { path: '/PPM', name: 'PPM', component: PPMIndex, meta: { title: i18n.t('router.PPM'), createLink: 'PPMCreate'} },
          { path: '/Pins', name: 'Pins', component: PinsIndex, meta: { title: i18n.t('router.Pins'), createLink: 'PinsCreate'} },
          { path: '/PinCode', name: 'PinCode', component: PinCodeIndex, meta: { title: i18n.t('router.PinCode'), createLink: 'PinCodeCreate'} }
        ]
      },
      {
        path: '/Create', component: LayoutCreate, children: [
          { path: '/Create/Customer', name: 'CustomerCreate', component: CustomerCreate, meta: { title: i18n.t('router.CustomerCreate'), baseLink: 'Customer'} },
          { path: '/Create/User', name: 'UserCreate', component: UserCreate, meta: { title: i18n.t('router.UserCreate'), baseLink: 'User'} },
          { path: '/Create/Phone', name: 'PhoneCreate', component: PhoneCreate, meta: { title: i18n.t('router.PhoneCreate'), baseLink: 'Phone'} },
          { path: '/Create/Tariff', name: 'TariffCreate', component: TariffCreate, meta: { title: i18n.t('router.TariffCreate'), baseLink: 'Tariff'} },
          { path: '/Create/Package', name: 'PackageCreate', component: PackageCreate, meta: { title: i18n.t('router.PackageCreate'), baseLink: 'Tariff'} },
          { path: '/Create/Brand', name: 'BrandCreate', component: BrandCreate, meta: { title: i18n.t('router.BrandCreate'), baseLink: 'Brand'} },
          { path: '/Create/PPM', name: 'PPMCreate', component: PPMCreate, meta: { title: i18n.t('router.PPMCreate'), baseLink: 'PPM'} },
          { path: '/Create/Pins', name: 'PinsCreate', component: PinsCreate, meta: { title: i18n.t('router.PinsCreate'), baseLink: 'Pins'} },
          { path: '/Create/PinCode', name: 'PinCodeCreate', component: PinCodeCreate, meta: { title: i18n.t('router.PinCodeCreate'), baseLink: 'PinCode'} }

        ]
      },
      {
        path: '/Update', component: LayoutUpdate, children: [
          { path: '/Update/Customer/:token', name: 'CustomerUpdate', component: CustomerUpdate, meta: { title: i18n.t('router.CustomerUpdate')} },
          { path: '/Update/Balance/:token', name: 'BalanceUpdate', component: BalanceUpdate, meta: { title: i18n.t('router.BalanceUpdate')} },
          { path: '/Update/Sales/:token', name: 'SalesUpdate', component: BalanceUpdate, meta: { title: i18n.t('router.SalesUpdate')} },
          { path: '/Update/Discount/:token', name: 'DiscountUpdate', component: DiscountUpdate, meta: { title: i18n.t('router.DiscountUpdate')} },
          { path: '/Update/User/:token', name: 'UserUpdate', component: UserUpdate, meta: { title: i18n.t('router.UserUpdate')} },
          { path: '/Update/Authorization/:token', name: 'AuthUpdate', component: AuthUpdate, meta: { title: i18n.t('router.AuthUpdate')} },
          { path: '/Update/Merge/:token', name: 'MergeUpdate', component: MergeUpdate, meta: { title: i18n.t('router.MergeUpdate')} },
          { path: '/Update/Phone/:slug', name: 'PhoneUpdate', component: PhoneUpdate, meta: { title: i18n.t('router.PhoneUpdate')} },
          { path: '/Update/Tariff/:slug', name: 'TariffUpdate', component: TariffUpdate, meta: { title: i18n.t('router.TariffUpdate')} },
          { path: '/Update/Package/:slug', name: 'PackageUpdate', component: PackageUpdate, meta: { title: i18n.t('router.PackageUpdate')} },
          { path: '/Update/PPM/:slug', name: 'PPMUpdate', component: PPMUpdate, meta: { title: i18n.t('router.PPMUpdate')} },
          { path: '/Update/Pins/:slug', name: 'PinsUpdate', component: PinsUpdate, meta: { title: i18n.t('router.PinsUpdate')} },
          { path: '/Update/PinCode/:slug', name: 'PinCodeUpdate', component: PinCodeUpdate, meta: { title: i18n.t('router.PinCodeUpdate')} }
        ]
      }
    ]
  },
  {
    path: '/Auth', component: Auth, redirect: '/Auth',
    children: [
      { path: 'Login', name: 'Login', component: Login },
      { path: 'Register', name: 'Register', component: Register },
      { path: 'ForgotPassword', name: 'ForgotPassword', component: ForgotPassword },
      { path: 'ResetPassword', name: 'ResetPassword', component: ResetPassword }
    ]
  },
  { path: '*', redirect: '/Dashboard'}

]

const router = new Router({
  linkActiveClass: 'active',
  routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

export default router
