export function setUser(user) {
  window.sessionStorage.setItem('user', JSON.stringify(user));
}

export function getUser() {
  let user = window.sessionStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return null;
}

export function deleteUser() {
  window.sessionStorage.removeItem('user');
}