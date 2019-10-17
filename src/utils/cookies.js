import Cookies from 'js-cookie'

export default function removeAll() {
  let arrCookie = document.cookie.split(';')
  for (let i = 0; i < arrCookie.length; i++) {
    let arr = arrCookie[i].split('=')
    if (arr.length > 0) {
      Cookies.remove(arr[0])
    }
  }
}
