import axios from "axios";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import PrivateRoute from "./components/routing/PrivateRoute";
import {PrivateScreen, RegisterScreen, LoginScreen, ForgotPasswordScreen, ResetPasswordScreen} from './components/screens/index';
import 'react-toastify/dist/ReactToastify.css';
import store from "./redux/store";

axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request
  .use(request => {
    if (!request.headers.Authorization) {
      const token = store.getState().authentication.token;

      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
    }

    return request;
  }, error => {
    return Promise.reject(error);
  });

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path={"/"} element={<Navigate to={'/ads'} />} />
          <Route path={"/ads"} element={<PrivateRoute><PrivateScreen/></PrivateRoute>} />
          <Route path={"/login"} element={<LoginScreen />}/>
          <Route path={"/register"} element={<RegisterScreen />}/>
          <Route path={"/forgotpassword"} element={<ForgotPasswordScreen />}/>
          <Route path={"/passwordreset:resetToken"} element={<ResetPasswordScreen />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
