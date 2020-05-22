/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Pages from './pages'
import AuthRequired from './AuthRequired'
import Dashboard from './pages/Dashboard'
import DashboardIndex from './pages/Dashboard/Default'
import i18n from './i18n'

import LayoutIndex from './pages/layout/'
import LayoutCreate from './pages/layout/create'
import LayoutUpdate from './pages/layout/update'
import LayoutGet from './pages/layout/get'

import FileUpload from './pages/Upload/create'
import FileDelete from './pages/Upload/delete'

import AuthorityIndex from './pages/Authority/'
import CourseIndex from './pages/Course/'
import CourseOutcomeIndex from './pages/CourseOutcome/'
import AssessmentIndex from './pages/Assessment/'
import DepartmentIndex from './pages/Department/'
import DepartmentsHasInstructorsIndex from './pages/DepartmentsHasInstructors/'
import FacultyIndex from './pages/Faculty/'
import GradingToolIndex from './pages/GradingTool/'
import GtccoIndex from './pages/Gtcco/'
import IgsIndex from './pages/Igs/'
import LogIndex from './pages/Log/'
import ProgramOutcomeIndex from './pages/ProgramOutcome/'
import PopcoIndex from './pages/Popco/'
import SectionIndex from './pages/Section/'
import SagtIndex from './pages/Sagt/'
import SgmgcoIndex from './pages/Sgmgco/'
import SgmgpoIndex from './pages/Sgmgpo/'
import StsIndex from './pages/Sts/'
import UniversityIndex from './pages/University/'
import UserIndex from './pages/User/'
import UsersAdminIndex from './pages/UsersAdmin/'
import UsersStudentIndex from './pages/UsersStudent/'
import UsersInstructorIndex from './pages/UsersInstructor/'
import CheckAuthIndex from './pages/CheckAuth/'

import AuthorityCreate from './pages/Authority/create'
import CourseCreate from './pages/Course/create'
import CourseOutcomeCreate from './pages/CourseOutcome/create'
import AssessmentCreate from './pages/Assessment/create'
import DepartmentCreate from './pages/Department/create'
import DepartmentsHasInstructorsCreate from './pages/DepartmentsHasInstructors/create'
import FacultyCreate from './pages/Faculty/create'
import GradingToolCreate from './pages/GradingTool/create'
import GtccoCreate from './pages/Gtcco/create'
import IgsCreate from './pages/Igs/create'
import LogCreate from './pages/Log/create'
import ProgramOutcomeCreate from './pages/ProgramOutcome/create'
import PopcoCreate from './pages/Popco/create'
import SectionCreate from './pages/Section/create'
import SagtCreate from './pages/Sagt/create'
import SgmgcoCreate from './pages/Sgmgco/create'
import SgmgpoCreate from './pages/Sgmgpo/create'
import StsCreate from './pages/Sts/create'
import UniversityCreate from './pages/University/create'
import UserCreate from './pages/User/create'
import UsersAdminCreate from './pages/UsersAdmin/create'
import UsersStudentCreate from './pages/UsersStudent/create'
import UsersInstructorCreate from './pages/UsersInstructor/create'
import CheckAuthCreate from './pages/CheckAuth/create'

import AuthorityUpdate from './pages/Authority/update'
import CourseUpdate from './pages/Course/update'
import CourseOutcomeUpdate from './pages/CourseOutcome/update'
import AssessmentUpdate from './pages/Assessment/update'
import DepartmentUpdate from './pages/Department/update'
import DepartmentsHasInstructorsUpdate from './pages/DepartmentsHasInstructors/update'
import FacultyUpdate from './pages/Faculty/update'
import GradingToolUpdate from './pages/GradingTool/update'
import GtccoUpdate from './pages/Gtcco/update'
import IgsUpdate from './pages/Igs/update'
import LogUpdate from './pages/Log/update'
import ProgramOutcomeUpdate from './pages/ProgramOutcome/update'
import PopcoUpdate from './pages/Popco/update'
import SectionUpdate from './pages/Section/update'
import SagtUpdate from './pages/Sagt/update'
import SgmgcoUpdate from './pages/Sgmgco/update'
import SgmgpoUpdate from './pages/Sgmgpo/update'
import StsUpdate from './pages/Sts/update'
import UniversityUpdate from './pages/University/update'
import UserUpdate from './pages/User/update'
import UsersAdminUpdate from './pages/UsersAdmin/update'
import UsersStudentUpdate from './pages/UsersStudent/update'
import UsersInstructorUpdate from './pages/UsersInstructor/update'
import CheckAuthUpdate from './pages/CheckAuth/update'
import Auth from './Views/Auth'
import Login from './Views/Auth/Login'
import Register from './Views/Auth/Register'
import ForgotPassword from './Views/Auth/ForgotPassword'
import ResetPassword from './Views/Auth/ResetPassword'

import SgmgpoGet from './pages/Sgmgpo/get'

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
          { path: '/Faculty', name: 'Faculty', component: FacultyIndex, meta: { title: i18n.t('router.Faculty'), createLink: 'FacultyCreate'} },
          { path: '/Department/:faculty', name: 'Department', component: DepartmentIndex, meta: { title: i18n.t('router.Department'), createLink: 'DepartmentCreate'} },
          { path: '/Course/:faculty/:department', name: 'Course', component: CourseIndex, meta: { title: i18n.t('router.Course'), createLink: 'CourseCreate'} },
          { path: '/Section/:faculty/:department/:course', name: 'Section', component: SectionIndex, meta: { title: i18n.t('router.Section'), createLink: 'SectionCreate'} },
          { path: '/Sts/:department/:course/:section', name: 'Sts', component: StsIndex, meta: { title: i18n.t('router.Sts'), createLink: 'StsCreate'} },
          { path: '/Sgmgpo/:program/:student', name: 'Sgmgpo', component: SgmgpoIndex, meta: { title: i18n.t('router.Sgmgpo'), createLink: 'SgmgpoCreate'} },
          { path: '/Authority', name: 'Authority', component: AuthorityIndex, meta: { title: i18n.t('router.Authority'), createLink: 'AuthorityCreate'} },
          { path: '/CourseOutcome', name: 'CourseOutcome', component: CourseOutcomeIndex, meta: { title: i18n.t('router.CourseOutcome'), createLink: 'CourseOutcomeCreate'} },
          { path: '/Assessment', name: 'Assessment', component: AssessmentIndex, meta: { title: i18n.t('router.Assessment'), createLink: 'AssessmentCreate'} },
          { path: '/DepartmentsHasInstructors', name: 'DepartmentsHasInstructors', component: DepartmentsHasInstructorsIndex, meta: { title: i18n.t('router.DepartmentsHasInstructors'), createLink: 'DepartmentsHasInstructorsCreate'} },
          { path: '/GradingTool', name: 'GradingTool', component: GradingToolIndex, meta: { title: i18n.t('router.GradingTool'), createLink: 'GradingToolCreate'} },
          { path: '/Gtcco', name: 'Gtcco', component: GtccoIndex, meta: { title: i18n.t('router.Gtcco'), createLink: 'GtccoCreate'} },
          { path: '/Igs', name: 'Igs', component: IgsIndex, meta: { title: i18n.t('router.Igs'), createLink: 'IgsCreate'} },
          { path: '/Log', name: 'Log', component: LogIndex, meta: { title: i18n.t('router.Log'), createLink: 'LogCreate'} },
          { path: '/ProgramOutcome/:department/:student', name: 'ProgramOutcome', component: ProgramOutcomeIndex, meta: { title: i18n.t('router.ProgramOutcome'), createLink: 'ProgramOutcomeCreate'} },
          { path: '/Popco', name: 'Popco', component: PopcoIndex, meta: { title: i18n.t('router.Popco'), createLink: 'PopcoCreate'} },
          { path: '/Sagt', name: 'Sagt', component: SagtIndex, meta: { title: i18n.t('router.Sagt'), createLink: 'SagtCreate'} },
          { path: '/Sgmgco', name: 'Sgmgco', component: SgmgcoIndex, meta: { title: i18n.t('router.Sgmgco'), createLink: 'SgmgcoCreate'} },
          { path: '/University', name: 'University', component: UniversityIndex, meta: { title: i18n.t('router.University'), createLink: 'UniversityCreate'} },
          { path: '/User', name: 'User', component: UserIndex, meta: { title: i18n.t('router.User'), createLink: 'UserCreate'} },
          { path: '/UsersAdmin', name: 'UsersAdmin', component: UsersAdminIndex, meta: { title: i18n.t('router.UsersAdmin'), createLink: 'UsersAdminCreate'} },
          { path: '/UsersStudent', name: 'UsersStudent', component: UsersStudentIndex, meta: { title: i18n.t('router.UsersStudent'), createLink: 'UsersStudentCreate'} },
          { path: '/UsersInstructor', name: 'UsersInstructor', component: UsersInstructorIndex, meta: { title: i18n.t('router.UsersInstructor'), createLink: 'UsersInstructorCreate'} },
          { path: '/CheckAuth', name: 'CheckAuth', component: CheckAuthIndex, meta: { title: i18n.t('router.CheckAuth'), createLink: 'CheckAuthCreate'} },
        ]
      },
      {
        path: '/Get', component: LayoutGet, children: [
          { path: '/SgmgpoGet/:program/:student', name: 'SgmgpoGet', component: SgmgpoGet, meta: { title: i18n.t('router.Sgmgpo'), createLink: 'SgmgpoCreate'} },
        ]
      },
      {
        path: '/Create', component: LayoutCreate, children: [
          { path: '/Create/Authority', name: 'AuthorityCreate', component: AuthorityCreate, meta: { title: i18n.t('router.AuthorityCreate'), baseLink: 'Authority' } },
          { path: '/Create/Course', name: 'CourseCreate', component: CourseCreate, meta: { title: i18n.t('router.CourseCreate'), baseLink: 'Course' } },
          { path: '/Create/CourseOutcome', name: 'CourseOutcomeCreate', component: CourseOutcomeCreate, meta: { title: i18n.t('router.CourseOutcomeCreate'), baseLink: 'CourseOutcome' } },
          { path: '/Create/Assessment', name: 'AssessmentCreate', component: AssessmentCreate, meta: { title: i18n.t('router.AssessmentCreate'), baseLink: 'Assessment' } },
          { path: '/Create/Department', name: 'DepartmentCreate', component: DepartmentCreate, meta: { title: i18n.t('router.DepartmentCreate'), baseLink: 'Department' } },
          { path: '/Create/DepartmentsHasInstructors', name: 'DepartmentsHasInstructorsCreate', component: DepartmentsHasInstructorsCreate, meta: { title: i18n.t('router.DepartmentsHasInstructorsCreate'), baseLink: 'DepartmentsHasInstructors' } },
          { path: '/Create/Faculty', name: 'FacultyCreate', component: FacultyCreate, meta: { title: i18n.t('router.FacultyCreate'), baseLink: 'Faculty' } },
          { path: '/Create/GradingTool', name: 'GradingToolCreate', component: GradingToolCreate, meta: { title: i18n.t('router.GradingToolCreate'), baseLink: 'GradingTool' } },
          { path: '/Create/Gtcco', name: 'GtccoCreate', component: GtccoCreate, meta: { title: i18n.t('router.GtccoCreate'), baseLink: 'Gtcco' } },
          { path: '/Create/Igs', name: 'IgsCreate', component: IgsCreate, meta: { title: i18n.t('router.IgsCreate'), baseLink: 'Igs' } },
          { path: '/Create/Log', name: 'LogCreate', component: LogCreate, meta: { title: i18n.t('router.LogCreate'), baseLink: 'Log' } },
          { path: '/Create/ProgramOutcome', name: 'ProgramOutcomeCreate', component: ProgramOutcomeCreate, meta: { title: i18n.t('router.ProgramOutcomeCreate'), baseLink: 'ProgramOutcome' } },
          { path: '/Create/Popco', name: 'PopcoCreate', component: PopcoCreate, meta: { title: i18n.t('router.PopcoCreate'), baseLink: 'Popco' } },
          { path: '/Create/Section', name: 'SectionCreate', component: SectionCreate, meta: { title: i18n.t('router.SectionCreate'), baseLink: 'Section' } },
          { path: '/Create/Sagt', name: 'SagtCreate', component: SagtCreate, meta: { title: i18n.t('router.SagtCreate'), baseLink: 'Sagt' } },
          { path: '/Create/Sgmgco', name: 'SgmgcoCreate', component: SgmgcoCreate, meta: { title: i18n.t('router.SgmgcoCreate'), baseLink: 'Sgmgco' } },
          { path: '/Create/Sgmgpo', name: 'SgmgpoCreate', component: SgmgpoCreate, meta: { title: i18n.t('router.SgmgpoCreate'), baseLink: 'Sgmgpo' } },
          { path: '/Create/Sts', name: 'StsCreate', component: StsCreate, meta: { title: i18n.t('router.StsCreate'), baseLink: 'Sts' } },
          { path: '/Create/University', name: 'UniversityCreate', component: UniversityCreate, meta: { title: i18n.t('router.UniversityCreate'), baseLink: 'University' } },
          { path: '/Create/User', name: 'UserCreate', component: UserCreate, meta: { title: i18n.t('router.UserCreate'), baseLink: 'User' } },
          { path: '/Create/UsersAdmin', name: 'UsersAdminCreate', component: UsersAdminCreate, meta: { title: i18n.t('router.UsersAdminCreate'), baseLink: 'UsersAdmin' } },
          { path: '/Create/UsersStudent', name: 'UsersStudentCreate', component: UsersStudentCreate, meta: { title: i18n.t('router.UsersStudentCreate'), baseLink: 'UsersStudent' } },
          { path: '/Create/UsersInstructor', name: 'UsersInstructorCreate', component: UsersInstructorCreate, meta: { title: i18n.t('router.UsersInstructorCreate'), baseLink: 'UsersInstructor' } },
          { path: '/Create/CheckAuth', name: 'CheckAuthCreate', component: CheckAuthCreate, meta: { title: i18n.t('router.CheckAuthCreate'), baseLink: 'CheckAuth' } },
          { path: '/Create/Upload/:department/:course/:section', name: 'FileUpload', component: FileUpload, meta: { title: i18n.t('router.FileUpload'), baseLink: 'Section' } },
          { path: '/Delete/Upload/:department/:course/:section', name: 'FileDelete', component: FileDelete, meta: { title: i18n.t('router.FileDelete'), baseLink: 'Section' } },
        ]
      },
      {
        path: '/Update', component: LayoutUpdate, children: [
          { path: 'Update/Authority/:param', name: 'AuthorityUpdate', component: AuthorityUpdate, meta: { title: i18n.t('router.AuthorityUpdate') } },
          { path: 'Update/Course/:param', name: 'CourseUpdate', component: CourseUpdate, meta: { title: i18n.t('router.CourseUpdate') } },
          { path: 'Update/CourseOutcome/:param', name: 'CourseOutcomeUpdate', component: CourseOutcomeUpdate, meta: { title: i18n.t('router.CourseOutcomeUpdate') } },
          { path: 'Update/Assessment/:param', name: 'AssessmentUpdate', component: AssessmentUpdate, meta: { title: i18n.t('router.AssessmentUpdate') } },
          { path: 'Update/Department/:param', name: 'DepartmentUpdate', component: DepartmentUpdate, meta: { title: i18n.t('router.DepartmentUpdate') } },
          { path: 'Update/DepartmentsHasInstructors/:param', name: 'DepartmentsHasInstructorsUpdate', component: DepartmentsHasInstructorsUpdate, meta: { title: i18n.t('router.DepartmentsHasInstructorsUpdate') } },
          { path: 'Update/Faculty/:param', name: 'FacultyUpdate', component: FacultyUpdate, meta: { title: i18n.t('router.FacultyUpdate') } },
          { path: 'Update/GradingTool/:param', name: 'GradingToolUpdate', component: GradingToolUpdate, meta: { title: i18n.t('router.GradingToolUpdate') } },
          { path: 'Update/Gtcco/:param', name: 'GtccoUpdate', component: GtccoUpdate, meta: { title: i18n.t('router.GtccoUpdate') } },
          { path: 'Update/Igs/:param', name: 'IgsUpdate', component: IgsUpdate, meta: { title: i18n.t('router.IgsUpdate') } },
          { path: 'Update/Log/:param', name: 'LogUpdate', component: LogUpdate, meta: { title: i18n.t('router.LogUpdate') } },
          { path: 'Update/ProgramOutcome/:param', name: 'ProgramOutcomeUpdate', component: ProgramOutcomeUpdate, meta: { title: i18n.t('router.ProgramOutcomeUpdate') } },
          { path: 'Update/Popco/:param', name: 'PopcoUpdate', component: PopcoUpdate, meta: { title: i18n.t('router.PopcoUpdate') } },
          { path: 'Update/Section/:param', name: 'SectionUpdate', component: SectionUpdate, meta: { title: i18n.t('router.SectionUpdate') } },
          { path: 'Update/Sagt/:param', name: 'SagtUpdate', component: SagtUpdate, meta: { title: i18n.t('router.SagtUpdate') } },
          { path: 'Update/Sgmgco/:param', name: 'SgmgcoUpdate', component: SgmgcoUpdate, meta: { title: i18n.t('router.SgmgcoUpdate') } },
          { path: 'Update/Sgmgpo/:param', name: 'SgmgpoUpdate', component: SgmgpoUpdate, meta: { title: i18n.t('router.SgmgpoUpdate') } },
          { path: 'Update/Sts/:param', name: 'StsUpdate', component: StsUpdate, meta: { title: i18n.t('router.StsUpdate') } },
          { path: 'Update/University/:param', name: 'UniversityUpdate', component: UniversityUpdate, meta: { title: i18n.t('router.UniversityUpdate') } },
          { path: 'Update/User/:param', name: 'UserUpdate', component: UserUpdate, meta: { title: i18n.t('router.UserUpdate') } },
          { path: 'Update/UsersAdmin/:param', name: 'UsersAdminUpdate', component: UsersAdminUpdate, meta: { title: i18n.t('router.UsersAdminUpdate') } },
          { path: 'Update/UsersStudent/:param', name: 'UsersStudentUpdate', component: UsersStudentUpdate, meta: { title: i18n.t('router.UsersStudentUpdate') } },
          { path: 'Update/UsersInstructor/:param', name: 'UsersInstructorUpdate', component: UsersInstructorUpdate, meta: { title: i18n.t('router.UsersInstructorUpdate') } },
          { path: 'Update/CheckAuth/:param', name: 'CheckAuthUpdate', component: CheckAuthUpdate, meta: { title: i18n.t('router.CheckAuthUpdate') } }
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
