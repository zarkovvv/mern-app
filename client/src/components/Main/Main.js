import {Container, Grid, Grow} from "@mui/material";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";

const Main = () => {
  return (
    <Grow in>
      <Container>
        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Main;