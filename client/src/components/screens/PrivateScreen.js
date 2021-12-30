import React from "react";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import Alert from "../alerts/Alert";
import {createTheme, ThemeProvider} from "@mui/material";
import Home from "../Home/Home";
import {useDispatch} from "react-redux";
import {getAds} from "../../redux/slices/adsSlice";

const PrivateScreen = () => {
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(async () => {

    navigate('/ads');

    if (!localStorage.getItem('authData')) {
      navigate('/login');
    }

    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('authData')).token}`
        }
      }

      try {
        const {data} = await axios.get("/api/private/ads", config);
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
          <Home />
        </React.Fragment>
      </ThemeProvider>
  )
}

export default PrivateScreen;