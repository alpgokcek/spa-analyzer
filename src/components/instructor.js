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
    title: i18n.t('nav.CourseIndex'),
    router: 'Course',
    icon: 'book',
    params: {}, // instructor un verdiği dersler eklenmeli
    sub: []
  },
  {
    title: i18n.t('nav.UploadFile'),
    router: 'Upload File',
    icon: 'upload',
    params: {},
    sub: []
  }
]
