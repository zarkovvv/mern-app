const authData = JSON.parse(localStorage.getItem('authData'));

export default {
  authentication: {
    username: authData ? authData.username : null,
    email: authData ? authData.email : null,
    token: authData ? authData.token : null,
    loading: false
  },
  ads: {
    items: []
  }
}