import useStyles from './styles';
import {
  Button,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography
} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useState} from "react";
import EditDialog from "../../dialogs/EditDialog";
import {useDispatch} from "react-redux";
import {deleteAd} from "../../../redux/slices/adsSlice";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const Ad = ({data}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const random = Math.floor(Math.random() * data.images.length);

  const [openEdit, setOpenEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenDetails = () => {
    navigate(`/ads/${data.aid}`);
  }

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

  return (
    <>
      <Card className={classes.card} sx={{minHeight: '354px'}}>
        <ButtonBase
          component="span"
          name="test"
          className={classes.cardAction}
          onClick={handleOpenDetails}
        >
          <CardMedia className={classes.media}
                     image={data.images[random] || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                     title={"title"}/>
          <div className={classes.overlay}>
            {/*<Typography variant="h6">{data.title}</Typography>*/}
          </div>

          <Typography className={classes.title} gutterBottom variant="h5" component="h2">{data.title}</Typography>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">{data.description.length > 30 ? data.description.slice(0,30).concat('...') : data.description}</Typography>
          </CardContent>
        </ButtonBase>
          <CardActions className={classes.cardActions}>
            <Button size="small" color="primary" onClick={handleOpenEdit}>
              Edit
            </Button>
            <Button size="small" color="secondary" onClick={handleDelete}>
              {loading ? <CircularProgress size={24}/> : <><Delete fontSize="small"/><span>Delete</span></>}
            </Button>
          </CardActions>
      </Card>
      {openEdit && <EditDialog show={true} onClose={handleCloseEdit} ad={data}/>}
    </>
  );
}

export default Ad;