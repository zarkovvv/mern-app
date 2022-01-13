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

const engineTypes = ['petrol', 'diesel', 'electric', 'hybrid'];
let images;

const EditDialog = ({show, onClose, ad}) => {

  const dispatch = useDispatch();

  const [files, setFiles] = useState([]);

  const handleSelectFile = (e) => {
    let arr = [];
    images = e.target.files;
    Object.values(e.target.files).forEach(file => {
      const image = URL.createObjectURL(file);
      arr.push(image);
    })
    setFiles(arr);
  }

  const [loading, setLoading] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(ad.car.brand);
  const [formData, setFormData] = useState(
    {
      title: ad.title,
      description: ad.description,
      brand: ad.car.brand,
      model: ad.car.model,
      km: ad.car.km,
      year: ad.car.year,
      color: ad.car.color,
      price: ad.car.price,
      engine: ad.car.engine.engineType,
      power: ad.car.engine.power
    }
  );

  const handleChange = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case 'brand':
        if (value === '') {
          setFormData({...formData, brand: '', model: ''});
        } else {
          setFormData({...formData, model: '', [name]: value});
        }
        setSelectedBrand(value);
        break;
      case 'title':
      case 'description':
      case 'model':
      case 'year':
      case 'color':
      case 'engine':
        setFormData({...formData, [name]: value});
        break;
      case 'km':
        if (Number(value) <= 9000000) {
          setFormData({...formData, [name]: Number(value)});
        }
        break;
      case 'price':
      case 'power':
        setFormData({...formData, [name]: Number(value)});
        break;
    }
  }

  const handleUpdateAd = async () => {
    const imageData = new FormData();
    if (images) {
      Object.entries(images).forEach(([key, value]) => {
        imageData.append(key, value);
      });
      imageData.append('aid', ad.aid);
    }
    const obj = {
      aid: ad.aid,
      title: formData.title,
      description: formData.description,
      car: {
        brand: formData.brand,
        model: formData.model,
        km: formData.km,
        year: formData.year,
        color: formData.color,
        price: formData.price,
        engine: {
          engineType: formData.engine,
          power: formData.power
        }
      }
    }
    try {
      setLoading(true);
      if (images) {
        const {data} = await axios.post("/api/private/ads/upload", imageData);
        obj.images = data.data;
      }
      await dispatch(updateAd({obj})).unwrap();
      toast.success('Successfully updated ad!');
    } catch (e) {
      toast.error(e.response.data.error || e.response.data)
    } finally {
      setLoading(false);
      onClose();
    }
  }

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={show}
        onClose={onClose}
      >
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                Ad details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="title"
                    name="title"
                    label="Title"
                    fullWidth
                    value={formData.title}
                    variant="outlined"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    multiline={true}
                    rows={5}
                    id="description"
                    name="description"
                    label="Description"
                    variant="outlined"
                    value={formData.description}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>


              <label htmlFor="btn-upload">
                <input
                id="btn-upload"
                name="btn-upload"
                style={{ display: 'none' }}
                type="file"
                accept="image/*"
                onChange={handleSelectFile}
                multiple={true}
                />
                <Button
                  className="btn-choose"
                  variant="outlined"
                  component="span" >
                  Choose Image
                </Button>
              </label>
              {files.length ? files.map((image, idx) => <img width={100} height={50} key={idx} src={image} alt=""/>) : '' }


            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                Car details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="brand-label">Brand</InputLabel>
                    <Select
                      name="brand"
                      labelId="brand-label"
                      id="brand"
                      value={formData.brand}
                      label="brand"
                      MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {CarList.map(car => {
                        return (
                          <MenuItem key={car.brand} value={car.brand}>{car.brand}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} >
                  <FormControl fullWidth disabled={!selectedBrand}>
                    <InputLabel id="model-label">Model</InputLabel>
                    <Select
                      name="model"
                      labelId="model-label"
                      id="model"
                      value={formData.model}
                      label="model"
                      MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {
                        selectedBrand !== '' ?
                          CarList.find(c => c.brand === selectedBrand).models.map(model => {
                            return (
                              <MenuItem key={model} value={model}>{model}</MenuItem>
                            );
                          }) :
                          ''
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} >
                  <FormControl fullWidth disabled={!selectedBrand}>
                    <InputLabel id="year-label">Year</InputLabel>
                    <Select
                      name="year"
                      labelId="year-label"
                      id="year"
                      value={formData.year}
                      label="year"
                      MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {
                        YearsList.map(year => {
                          return (
                            <MenuItem key={year} value={year}>{year}</MenuItem>
                          );
                        })
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} >
                  <TextField
                    disabled={!selectedBrand}
                    type="number"
                    name='km'
                    id="km"
                    label="Kilometers"
                    fullWidth
                    variant="outlined"
                    value={formData.km}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6} >
                  <FormControl fullWidth disabled={!selectedBrand}>
                    <InputLabel id="color-label">Color</InputLabel>
                    <Select
                      name="color"
                      labelId="color-label"
                      id="color"
                      value={formData.color}
                      label="color"
                      MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="black">Black</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} >
                  <TextField
                    disabled={!selectedBrand}
                    type="number"
                    name='price'
                    id="price"
                    label="Price"
                    helperText='price in leva'
                    fullWidth
                    variant="outlined"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6} >
                  <FormControl fullWidth disabled={!selectedBrand}>
                    <InputLabel id="engine-label">Engine</InputLabel>
                    <Select
                      name="engine"
                      labelId="engine-label"
                      id="engine"
                      value={formData.engine}
                      label="engine"
                      MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {engineTypes.map(type => {
                        return <MenuItem key={type} value={type}>{type}</MenuItem>
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} >
                  <TextField
                    type="number"
                    name='power'
                    id="power"
                    label="Power"
                    helperText='power in horsepower'
                    fullWidth
                    variant="outlined"
                    value={formData.power}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button disabled={Object.values(formData).includes('')} onClick={handleUpdateAd}>{
            loading ? <CircularProgress size={24} /> : 'Save'
          }</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default EditDialog;