import axios from "axios";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import PrivateRoute from "./components/routing/PrivateRoute";
import {PrivateScreen, RegisterScreen, LoginScreen, ForgotPasswordScreen, ResetPasswordScreen} from './components/screens/index';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.headers.post['Content-Type'] = 'application/json';

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
