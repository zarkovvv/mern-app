import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoute from "./components/routing/PrivateRoute";
import {PrivateScreen, RegisterScreen, LoginScreen, ForgotPasswordScreen, ResetPasswordScreen} from './components/screens/index';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path={"/"} element={<PrivateRoute><PrivateScreen/></PrivateRoute>} />
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
