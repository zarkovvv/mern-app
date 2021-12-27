import {ThumbUpAlt, Delete, MoreHoriz} from '@mui/icons-material';
import {Button, Card, CardActions, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";

const Post = () => {

  return (
    <Card>
      <CardMedia image={'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={'Title'} />
      <div>
        <Typography variant="h6"></Typography>
        <Typography variant="body2">13:07</Typography>
      </div>
      <div>
        <Button style={{ color: 'white' }} size="small"><MoreHoriz fontSize="default" /></Button>
      </div>
      <div >
        <Typography variant="body2" color="textSecondary" component="h2"></Typography>
      </div>
      <Typography gutterBottom variant="h5" component="h2"></Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p"></Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" ><ThumbUpAlt fontSize="small" /> Like </Button>
        <Button size="small" color="primary" ><Delete fontSize="small" /> Delete</Button>
      </CardActions>
    </Card>
  );
};

export default Post;