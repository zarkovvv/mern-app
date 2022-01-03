import {AppBar, Button, Container, Grid, Grow, Typography} from "@mui/material";
import carads from '../../assets/images/carads.png';
import Ads from "../common/Ads/Ads";
import Form from "../common/Form/Form";
import useStyles from './styles';
import {useDispatch} from "react-redux";
import {logout} from "../../redux/slices/authSlice";
import {useNavigate} from "react-router-dom";

const Home = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('authData');
    navigate('/login');
  }

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">CarAds</Typography>
        <img className={classes.image} src={carads} alt="CarAds" height="60"/>
        <Button onClick={handleLogout}>LOGOUT</Button>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={12} md={7}>
              <Ads />
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default Home;