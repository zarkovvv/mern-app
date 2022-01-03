import useStyles from './styles';
import {Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Typography} from "@mui/material";
import {Delete, MoreHoriz, ThumbUpAlt} from "@mui/icons-material";
import {useState} from "react";
import EditDialog from "../../../dialogs/EditDialog";
import {useDispatch} from "react-redux";
import {deleteAd, getAds} from "../../../../redux/slices/adsSlice";
import {toast} from "react-toastify";
import Alert from "../../../alerts/Alert";
import axios from "axios";

const Ad = ({data}) => {

  const dispatch = useDispatch();

  const [openEdit, setOpenEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  }

  const handleCloseEdit = () => {
    setOpenEdit(false);
  }

  const handleDelete = async () => {
    const {aid} = data;
    setLoading(true);
    try {
      await dispatch(deleteAd({aid})).unwrap();
      toast.success('Successfully deleted ad!');
    } catch (e) {
      toast.error(e.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  const classes = useStyles();

  return(
    <>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={"title"} />
        <div className={classes.overlay}>
          <Typography variant="h6">{data.title}</Typography>
          <Typography variant="body2">{"moment"}</Typography>
        </div>
        <div className={classes.overlay2}>
          <Button style={{ color: 'white' }} size="small" onClick={handleOpenEdit}><MoreHoriz fontSize="default" /></Button>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{data.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{data.description}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" ><ThumbUpAlt fontSize="small" /> Like 1 </Button>
          <Button size="small" color="primary" onClick={handleDelete}>
            {loading ? <CircularProgress size={24} /> : <><Delete fontSize="small" /> Delete</>}
          </Button>
        </CardActions>
      </Card>
      {openEdit && <EditDialog show={true} onClose={handleCloseEdit} ad={data}/>}
      <Alert />
    </>
  );
}

export default Ad;