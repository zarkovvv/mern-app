import {ToastContainer, Slide} from "react-toastify";

const Alert = () => {
  return(
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      transition={Slide}
      theme='dark'
    />
  )
}

export default Alert;