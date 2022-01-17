import * as React from 'react';
import {
  Button, CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel, MenuItem,
  Select
} from '@mui/material';

import Form from "../common/Form/Form";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {CarList} from "../../assets/carsList/CarList";
import {YearsList} from "../../assets/yearsList/YearsList";
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import Alert from "../alerts/Alert";
import {getAds, updateAd} from "../../redux/slices/adsSlice";
import {useDispatch, useSelector} from "react-redux";
import {Carousel} from "react-responsive-carousel";

const ImagesDialog = ({show, onClose, ad, index}) => {

  const createCarouselItemImage = (img, index) => (
    <img key={index} src={img} style={{objectFit: 'contain', maxHeight: '85vh', height: '100%'}}/>
  );

  const baseChildren = <div>{ad.images.map(createCarouselItemImage)}</div>;

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={'xl'}
        open={show}
        onClose={onClose}
      >
        <DialogContent style={{overflow: 'hidden'}} >
          <Grid container>
            <Grid item xs={12}>
              <Carousel
                className="popup-carousel"
                infiniteLoop
                dynamicHeight={false}
                showThumbs={false}
                selectedItem={index}
              >
                {baseChildren.props.children}
              </Carousel>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>

        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ImagesDialog;