import {CircularProgress, Grid} from "@mui/material";
import Post from "./Post/Post";

const Posts = () => {

  const posts = ['dsa', "daa", "csa", "dba", "dna", ];

  return (
    !posts.length ? <CircularProgress /> : (
      <Grid container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post} item xs={12} sm={6} md={6}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    )
  );
}

export default Posts;