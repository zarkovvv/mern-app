import {Container, Grid, Grow} from "@mui/material";
import Ads from "../common/Ads/Ads";
import Form from "../common/Form/Form";
import Header from "../common/Header/Header";

const Home = () => {
  return (
    <Container maxWidth="xl">
      <Header />
      <Grow in>
        <Container maxWidth="xl">
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={12} md={8}>
              <Ads />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default Home;