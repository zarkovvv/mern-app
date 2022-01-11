import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import Alert from "../alerts/Alert";
import {useDispatch, useSelector} from "react-redux";
import {
  Avatar,
  Box, Button,
  Checkbox,
  Container,
  FormControlLabel, Grid,
  TextField,
  Typography
} from "@mui/material";
import {loginUser} from '../../redux/slices/authSlice'
import {LockOutlined} from "@mui/icons-material";

const LoginDialog = (props) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {loading} = useSelector((state) => state.authentication);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem('authData')) {
      navigate('/ads');
    }
  }, [navigate])

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({email, password})).unwrap();
      navigate("/ads");
    } catch (e) {
      toast.error(e.response.data.error);
    }
  }

  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link className="link" color="inherit" to="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1 }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={loginHandler} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            // autoComplete="email"
            // autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="primary"
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs={12} textAlign='center'>
              <Link className="link" to="/resetpassword" >
                Forgot password?
              </Link>
            </Grid>
            <Grid item xs={12} textAlign='center'>
              <span className="ml-2">Already have an account?
                <Link className="link" to="/login"> Login here</Link>
              </span>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
      <Alert />
    </Container>
  )
}

export default LoginDialog;