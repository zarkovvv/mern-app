import {AppBar, Container, Grid, Grow, Typography} from "@mui/material";
import carads from '../../images/carads.png';
import Ads from "../common/Ads/Ads";
import Form from "../common/Form/Form";
import useStyles from './styles';

const Home = () => {

  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">CarAds</Typography>
        <img className={classes.image} src={carads} alt="CarAds" height="60"/>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Ads />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default Home;