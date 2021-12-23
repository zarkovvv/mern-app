import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import Alert from "../alerts/Alert";

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
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      }

      try {
        const {data} = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (e) {
        localStorage.removeItem('authToken');
        setError('Not authorized');
        toast.error("Not authorized!", {autoClose: false, onClose: () => navigate('/login')});
      }
    }

    await fetchPrivateData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  }

  return(
      error ? <Alert /> :
        <>
          <div className='bg-green-700 h-9 w-screen'>
            PRIVATE: {privateData}
          </div>
          <button onClick={handleLogout}>LOGOUT</button>
        </>
  )
}

export default PrivateScreen;