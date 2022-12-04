function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (JSON.stringify(value) || "") + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return JSON.parse(c.substring(nameEQ.length, c.length));
  }
  return null;
}
function eraseCookie(name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function checkCookie(name) {
  return getCookie(name) == null ? false : true;
}


const setLocalStorage = (key, value) => {
  value = typeof value == 'object' ? JSON.stringify(value) : value;
  localStorage.setItem(key, value);
}

const getLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  return JSON.parse(value);
}

const checkLocalStorage = (key) => {
  const checkValue = localStorage.getItem(key);
  return checkValue == undefined ? false : true;
}


export { setCookie, getCookie, eraseCookie, checkCookie, setLocalStorage, getLocalStorage, checkLocalStorage };