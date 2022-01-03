import Ad from "./Ad/Ad";
import useStyles from "./styles";
import {useSelector} from "react-redux";
import {CircularProgress, Grid} from "@mui/material";


const Ads = () => {

  const classes = useStyles();
  const adItems = useSelector((state) => state.ads.items);

  return (
    <>
      {
        !adItems.length ?
          <CircularProgress /> :
          (<Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
              {adItems.map((ad) => (
                <Grid key={ad.aid} item xs={12} sm={6}>
                  <Ad data={ad}/>
                </Grid>
              ))}
          </Grid>
          )
      }
    </>
  );
}

export default Ads;