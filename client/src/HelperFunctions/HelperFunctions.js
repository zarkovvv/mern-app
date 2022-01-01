export const setLocalStorageItem = (data) => {
  localStorage.setItem("authData", JSON.stringify({
    username: data.user.username,
    email: data.user.email,
    uid: data.user.uid,
    token: data.token
  }));
}