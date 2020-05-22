import i18n from '../i18n'
export const admin = [
  {title: i18n.t('nav.home'), router: 'Dashboard', icon: 'graph-up', params: {}, sub: []},
  {title: i18n.t('nav.FacultyIndex'), router: 'Faculty', icon: '', params: {}, sub: []},
  {title: i18n.t('nav.Other'), router: 'Authority', icon: '', params: {}, sub: [
    {title: i18n.t('nav.AuthorityIndex'), router: 'Authority', icon: '', params: {}, sub: []},
    {title: i18n.t ('nav.CourseIndex'), router: 'Course',icon: '',params: {},sub: []},
    {title: i18n.t('nav.CourseOutcomeIndex'), router: 'CourseOutcome', icon: '', params: {}, sub: []},
    {title: i18n.t('nav.AssessmentIndex'), router: 'Assessment', icon: '', params: {}, sub: []},
    {title: i18n.t('nav.DepartmentIndex'), router: 'Department', icon: '', params: {}, sub: []},
    {title: i18n.t('nav.DepartmentsHasInstructorsIndex'), router: 'DepartmentsHasInstructors', icon: '', params: {}, sub: []},
    {title: i18n.t('nav.GradingToolIndex'), router: 'GradingTool', icon: '', params: {}, sub: []},
    {title: i18n.t('nav.GtccoIndex'), router: 'Gtcco', icon: '', params: {}, sub: []},
    {title: i18n.t('nav.IgsIndex'), router: 'Igs', icon: '', params: {}, sub: []},
    {title: i18n.t('nav.LogIndex'), router: 'Log', icon: '', params: {}, sub: []},
    {title: i18n.t('nav.ProgramOutcomeIndex'), router: 'ProgramOutcome',icon: '',params: {},sub: []},
    {title: i18n.t('nav.PopcoIndex'), router: 'Popco', icon: '', params: {}, sub: []},
    {title: i18n.t('nav.SectionIndex'), router: 'Section', icon: '', params: {}, sub: []},
    {title: i18n.t('nav.SagtIndex'), router: 'Sagt', icon: '', params: {}, sub: []},
    {title: i18n.t('nav.SgmgcoIndex'), router: 'Sgmgco', icon: '', params: {}, sub: []},
    {title: i18n.t('nav.SgmgpoIndex'), router: 'Sgmgpo', icon: '', params: {}, sub: []},
    {title: i18n.t('nav.StsIndex'), router: 'Sts', icon: '', params: {}, sub: []},
    {title: i18n.t('nav.UniversityIndex'), router: 'University', icon: '', params: {}, sub: []},
    {title: i18n.t('nav.UserIndex'), router: 'User', icon: '', params: {}, sub: []},
    {title: i18n.t('nav.UsersAdminIndex'), router: 'UsersAdmin', icon: '', params: {}, sub: []},
    {title: i18n.t('nav.UsersStudentIndex'), router: 'UsersStudent', icon: '', params: {}, sub: []},
    {title: i18n.t('nav.UsersInstructorIndex'), router: 'UsersInstructor', icon: '', params: {}, sub: []},
    {title: i18n.t('nav.CheckAuthIndex'), router: 'CheckAuth', icon: '', params: {}, sub: []}
  ]},
]

export const instructor = [
  {title: i18n.t('nav.home'),router: 'Dashboard',icon: 'graph-up',params: {},sub: []},
  {title: i18n.t('nav.CourseIndex'),router: 'Course',icon: '',data: {faculty: localStorage.getItem('userFaculty'), department: localStorage.getItem('userDepartment')},sub: []}
]
