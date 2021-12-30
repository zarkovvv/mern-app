import Ad from "./Ad/Ad";
import useStyles from "./Ad/styles";
import {useSelector} from "react-redux";


const Ads = () => {

  const classes = useStyles();
  const ads = useSelector((state) => state.ads);

  return(
    <>
      <h1>ADS</h1>
      {ads.map((ad) => {
        return <Ad data={ad} key={ad.aid}/>
      })}
    </>
  );
}

export default Ads;