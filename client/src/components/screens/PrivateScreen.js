import React from "react";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import Alert from "../alerts/Alert";
import Header from "../Header/Header";
import Main from "../Main/Main";
import {createTheme, ThemeProvider} from "@mui/material";

const PrivateScreen = () => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  const navigate = useNavigate();

  useEffect(async () => {
    if (!localStorage.getItem('authToken')) {
      navigate('/login');
    }

    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('authToken')).token}`
        }
      }

      try {
        const {data} = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (e) {
        localStorage.removeItem('authToken');
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
          <Header />
          <Main />
        </React.Fragment>
      </ThemeProvider>
  )
}

export default PrivateScreen;