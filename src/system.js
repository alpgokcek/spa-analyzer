export const systemName = 'SPA Analyzer'
export const copyright = '© 2020 SPA'
export const verno = '2.2.6.2' // 2.ürün - 2.versiyon - 1.demo - 13. test
export const apiLink = 'http://spa-analyzer-api.herokuapp.com/api/'
export const storageLink = 'http://spa-analyzer-api.herokuapp.com/storage'

// today, now, min date, max date -->
export const now = new Date()
export const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
var dd = now.getDate()
var mm = now.getMonth() + 1
var yyyy = now.getFullYear()
var hh = now.getHours()
var ii = now.getMinutes()
var ss = now.getSeconds()
if (dd < 10) {
  dd = '0' + dd
}
if (mm < 10) {
  mm = '0' + mm
}
export const mmMinDate = new Date(today)
export const mmMaxDate = new Date(today)
export let mmToday = dd + '-' + mm + '-' + yyyy
export let mmNow = hh + ':' + ii + ':' + ss
// <-- today, now, min date, max date
