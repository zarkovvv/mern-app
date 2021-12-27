const authData = JSON.parse(localStorage.getItem('authData'));

export default {
  authentication: {
    username: authData ? authData.username : null,
    uid: authData ? authData.uid : null,
  }
}