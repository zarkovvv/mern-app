import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {Carousel} from "react-responsive-carousel";
import {useParams, useNavigate} from 'react-router-dom';

import useStyles from './styles';
import {Container, createTheme, CssBaseline, Divider, Grid, Paper, ThemeProvider, Typography} from "@mui/material";
import {getAds} from "../../redux/slices/adsSlice";
import axios from "axios";

const AdDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  const ads = useSelector((state) => state.ads.items);
  const ad = ads.find(ad => ad.aid === id);

  const [images, setImages] = useState([]);

  useEffect(async () => {
    if (!ads.length) {
      const {data} = await axios.get('/api/private/ads');
      dispatch(getAds(data.data));
      console.log(id)
    } else {
      console.log(ad);
    }
  }, [id]);

  useEffect(() => {
    setImages(ad?.images);
  }, [ad]);

  useEffect(() => {
    // const dots = document.getElementsByClassName('control-dots')[0]; //carousel-status
    // const status = document.getElementsByClassName('carousel-status')[0];
    // const parent = dots.parentNode;
    // parent.insertBefore(dots, status);
  }, [])

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const createCarouselItemImage = (img, index) => (
    <img key={index} src={img} className={classes.media}/>
  );

  const baseChildren = <div>{ad?.images.map(createCarouselItemImage)}</div>;

  const handleItemClick = (index, item) => {
    console.log(index)
    console.log(item)
  }

  if (!ad) return null;

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
          <div className={classes.card}>
            <div className={classes.section}>
              <Grid container>
                <Grid item xs={6}>
                  <Grid container spacing={1} sx={{paddingBottom: '20px'}}>
                    <Grid item xs={12}>
                      <Typography variant="h4" fontWeight="bold" component="h2">{ad.title}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h4" component="h2">{ad.car.price} lv.</Typography>
                    </Grid>
                  </Grid>
                  <Grid container maxWidth="sm" spacing={0.5}>
                    <Grid item xs={6}>
                      Brand: {ad.car.brand}
                    </Grid>
                    <Grid item xs={6}>
                      Color: {ad.car.color}
                    </Grid>
                    <Grid item xs={6}>
                      Model: {ad.car.model}
                    </Grid>
                    <Grid item xs={6}>
                      Engine: {ad.car.engine.engineType}
                    </Grid>
                    <Grid item xs={6}>
                      Year: {ad.car.year}
                    </Grid>
                    <Grid item xs={6}>
                      Power: {ad.car.engine.power} hp.
                    </Grid>
                    <Grid item xs={6}>
                      Mileage: {ad.car.km} km.
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sx={{paddingY: '10px'}} >
                    <Divider />
                  </Grid>
                  <Grid item xs={12} >
                    <Typography variant="body1">{ad.description}</Typography>
                  </Grid>
                  <Grid item xs={12} sx={{paddingY: '10px'}} >
                    <Divider />
                  </Grid>
                </Grid>
                <Grid item xs={6} >
                  <Carousel onClickItem={handleItemClick} infiniteLoop dynamicHeight={false} showThumbs={true} >{baseChildren.props.children}</Carousel>
                </Grid>
              </Grid>

            </div>

          </div>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default AdDetails;