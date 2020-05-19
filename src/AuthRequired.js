const holy = false

export default (to, from, next) => {
  if (holy) {
    next()
  } else if (localStorage.getItem('userToken') != null && localStorage.getItem('userToken').length > 0) {
    next()
  } else {
    localStorage.removeItem('userToken')
    next('/Auth/Login')
  }
}
