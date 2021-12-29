import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";
import Alert from "../alerts/Alert";
import {useDispatch} from "react-redux";
import {login} from '../../redux/slices/authSlice';
import {CircularProgress} from "@mui/material";

const LoginDialog = (props) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('authData')) {
      navigate('/ads');
    }
  }, [navigate])

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const {data} = await axios.post("/api/auth/login", {email, password});

      dispatch(login(data));
      setLoading(false);
      localStorage.setItem("authData", JSON.stringify({
        username: data.user.username,
        email: data.user.email,
        uid: data.user.uid,
        token: data.token
      }));

      navigate("/ads");

    } catch (e) {
      toast.error(e.response.data.error);
    }
  }

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-800">
      <div
        className="flex flex-col bg-white shadow-md shadow-black px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
        <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Welcome
        </div>
        <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
          Enter your credentials to get access account
        </div>

        <div className="mt-10">
          <form onSubmit={loginHandler}>
            <div className="flex flex-col mb-5">
              <label htmlFor="email" className="mb-1 text-xs tracking-wide text-gray-600">E-Mail Address:</label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <i className="fas fa-at text-blue-500"/>
                </div>

                <input
                  id="email"
                  type="email"
                  name="email"
                  className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <label htmlFor="password"
                     className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
              <div className="relative">
                <div
                  className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <span>
                    <i className="fas fa-lock text-blue-500"/>
                  </span>
                </div>

                <input
                  id="password"
                  type="password"
                  name="password"
                  className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex w-full">
              <button
                type="submit"
                className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in">
                {loading ? <CircularProgress size={24} sx={{color: 'white'}}/> :
                  <>
                    <span className="mr-2 uppercase">LOGIN</span>
                    <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                    <path
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                    </svg>
                    </span>
                  </>
                }
              </button>

            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-center items-center mt-6">
        <span className="inline-flex items-center text-gray-100 font-medium text-sm text-center">
          <span className="ml-2">Don't have an account?
            <Link to="/register"
                  className="text-sm ml-2 text-blue-400 font-semibold hover:text-blue-200">Register here</Link>
          </span>
        </span>
      </div>
      <Alert/>
    </div>
  )
}

export default LoginDialog;