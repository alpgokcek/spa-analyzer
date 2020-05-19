import i18n from '../i18n'
export const items = [
  {
    title: i18n.t('nav.home'),
    router: 'Dashboard',
    icon: 'graph-up',
    params: {},
    sub: []
  },

  {
    title: i18n.t('nav.AuthorityIndex'),
    router: 'AuthorityIndex',
    icon: '',
    params: {},
    sub: []
  },    
  {
    title: i18n.t('nav.CourseIndex'),
    router: 'CourseIndex',
    icon: '',
    params: {},
    sub: []
  },    
  {
    title: i18n.t('nav.CourseOutcomeIndex'),
    router: 'CourseOutcomeIndex',
    icon: '',
    params: {},
    sub: []
  },    
  {
    title: i18n.t('nav.AssessmentIndex'),
    router: 'AssessmentIndex',
    icon: '',
    params: {},
    sub: []
  },    
  {
    title: i18n.t('nav.DepartmentIndex'),
    router: 'DepartmentIndex',
    icon: '',
    params: {},
    sub: []
  },    
  {
    title: i18n.t('nav.DepartmentsHasInstructorsIndex'),
    router: 'DepartmentsHasInstructorsIndex',
    icon: '',
    params: {},
    sub: []
  },    
  {
    title: i18n.t('nav.FacultyIndex'),
    router: 'FacultyIndex',
    icon: '',
    params: {},
    sub: []
  },    
  {
    title: i18n.t('nav.GradingToolIndex'),
    router: 'GradingToolIndex',
    icon: '',
    params: {},
    sub: []
  },    
  {
    title: i18n.t('nav.GtccoIndex'),
    router: 'GtccoIndex',
    icon: '',
    params: {},
    sub: []
  },    
  {
    title: i18n.t('nav.IgsIndex'),
    router: 'IgsIndex',
    icon: '',
    params: {},
    sub: []
  },    
  {
    title: i18n.t('nav.LogIndex'),
    router: 'LogIndex',
    icon: '',
    params: {},
    sub: []
  },    
  {
    title: i18n.t('nav.ProgramOutcomeIndex'),
    router: 'ProgramOutcomeIndex',
    icon: '',
    params: {},
    sub: []
  },    
  {
    title: i18n.t('nav.PopcoIndex'),
    router: 'PopcoIndex',
    icon: '',
    params: {},
    sub: []
  },    
  {
    title: i18n.t('nav.SectionIndex'),
    router: 'SectionIndex',
    icon: '',
    params: {},
    sub: []
  },    
  {
    title: i18n.t('nav.SagtIndex'),
    router: 'SagtIndex',
    icon: '',
    params: {},
    sub: []
  },    
  {
    title: i18n.t('nav.SgmgcoIndex'),
    router: 'SgmgcoIndex',
    icon: '',
    params: {},
    sub: []
  },    
  {
    title: i18n.t('nav.SgmgpoIndex'),
    router: 'SgmgpoIndex',
    icon: '',
    params: {},
    sub: []
  },    
  {
    title: i18n.t('nav.StsIndex'),
    router: 'StsIndex',
    icon: '',
    params: {},
    sub: []
  },    
  {
    title: i18n.t('nav.UniversityIndex'),
    router: 'UniversityIndex',
    icon: '',
    params: {},
    sub: []
  },    
  {
    title: i18n.t('nav.UserIndex'),
    router: 'UserIndex',
    icon: '',
    params: {},
    sub: []
  },    
  {
    title: i18n.t('nav.UsersAdminIndex'),
    router: 'UsersAdminIndex',
    icon: '',
    params: {},
    sub: []
  },    
  {
    title: i18n.t('nav.UsersStudentIndex'),
    router: 'UsersStudentIndex',
    icon: '',
    params: {},
    sub: []
  },    
  {
    title: i18n.t('nav.UsersInstructorIndex'),
    router: 'UsersInstructorIndex',
    icon: '',
    params: {},
    sub: []
  },    
  {
    title: i18n.t('nav.CheckAuthIndex'),
    router: 'CheckAuthIndex',
    icon: '',
    params: {},
    sub: []
  },    


  {
    title: i18n.t('nav.customer'),
    router: 'Customer',
    icon: 'people',
    params: {},
    sub: [
      { title: i18n.t('nav.passiveCustomer'), router: 'CustomerPassive', icon: 'person-dash', params: '' },
      { title: i18n.t('nav.newCustomer'), router: 'CustomerCreate', icon: 'person-plus', params: '' }
    ]
  },
  {
    title: i18n.t('nav.products'),
    router: 'Products',
    icon: 'phone',
    params: {},
    sub: [
      { title: i18n.t('nav.phones'), router: 'Phone', icon: 'phone', params: '' },
      { title: i18n.t('nav.tariffs'), router: 'Tariff', icon: 'list-task', params: '' },
      { title: i18n.t('nav.packages'), router: 'Package', icon: 'list-ul', params: '' },
      { title: i18n.t('nav.merge'), router: 'PPM', icon: 'link', params: '' }
    ]
  },
  {
    title: i18n.t('nav.pin'),
    router: 'Pins',
    icon: 'collection',
    params: {},
    sub: [
      { title: i18n.t('nav.newPincode'), router: 'PinCodeCreate', icon: 'card-heading', params: '' }
    ]
  },
  {
    title: i18n.t('nav.bank'),
    router: 'Dashboard',
    icon: 'shield-shaded',
    params: {},
    sub: []
  },
  {
    title: i18n.t('nav.users'),
    router: 'User',
    icon: 'person',
    params: {},
    sub: []
  },
  {
    title: i18n.t('nav.other'),
    router: '',
    icon: 'gem',
    params: {},
    sub: [
      { title: i18n.t('nav.bank'), router: 'Bank', icon: 'building', params: '' },
      { title: i18n.t('nav.operator'), router: 'Brand', icon: 'server', params: {type: 'b03fa0c1'} },
      { title: i18n.t('nav.phoneBrand'), router: 'Brand', icon: 'phone', params: {type: '3c0882c8'} },
      { title: i18n.t('nav.color'), router: 'Color', icon: 'brush', params: '' },
      { title: i18n.t('nav.storage'), router: 'Storage', icon: 'cloud', params: '' },
      { title: i18n.t('nav.country'), router: 'Country', icon: 'map', params: '' },
      { title: i18n.t('nav.city'), router: 'City', icon: 'map', params: '' },
      { title: i18n.t('nav.customerType'), router: 'CustomerType', icon: 'funnel', params: '' },
      { title: i18n.t('nav.userLevel'), router: 'userLevel', icon: 'funnel', params: '' }
    ]
  }
]
