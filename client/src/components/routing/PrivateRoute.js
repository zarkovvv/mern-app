import {Navigate} from 'react-router-dom';

const PrivateRoute = ({children}) => {
  return (localStorage.getItem('authData') ? (children) : (<Navigate to="/login"/>));
}

export default PrivateRoute;