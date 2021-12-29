import React from "react";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import Alert from "../alerts/Alert";
import {createTheme, ThemeProvider} from "@mui/material";

const PrivateScreen = () => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  const navigate = useNavigate();

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
        const {data} = await axios.get("/api/private", config);
        setPrivateData(data.data);
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
      mode: 'light',
    },
  });

  return (
    error ?
      <Alert/>
      :
      <ThemeProvider theme={darkTheme}>
        <React.Fragment>
          {privateData}
        </React.Fragment>
      </ThemeProvider>
  )
}

export default PrivateScreen;