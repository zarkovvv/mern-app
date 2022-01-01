import React from "react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {createTheme, ThemeProvider} from "@mui/material";
import {useDispatch} from "react-redux";
import {getAds} from "../../redux/slices/adsSlice";
import Home from "../Home/Home";
import Alert from "../alerts/Alert";
import CssBaseline from "@mui/material/CssBaseline";

const PrivateScreen = () => {
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(async () => {

    if (!localStorage.getItem('authData')) {
      navigate('/login');
    }

    const fetchPrivateData = async () => {

      try {
        const {data} = await axios.get("/api/private/ads");
        dispatch(getAds(data.data));
      } catch (e) {
        localStorage.removeItem('authData');
        setError('Not authorized');
        toast.error("Session expired!", {autoClose: false, onClose: () => navigate('/login')});
      }
    }

    await fetchPrivateData();
  }, [navigate]);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    error ?
      <Alert/>
      :
      <ThemeProvider theme={darkTheme}>
        <React.Fragment>
          <CssBaseline />

          <Home />
        </React.Fragment>
      </ThemeProvider>
  )
}

export default PrivateScreen;