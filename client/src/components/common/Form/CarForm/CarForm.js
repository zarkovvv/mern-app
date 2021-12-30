import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {FormControl, Input, InputLabel, MenuItem, Select} from "@mui/material";
import {CarList} from "../../../../assets/carsList/CarList";
import {YearsList} from "../../../../assets/yearsList/YearsList";
import {useState} from "react";

const engineTypes = ['petrol', 'diesel', 'electric', 'hybrid'];

const CarForm = ({formData, setFormData}) => {

  const [selectedBrand, setSelectedBrand] = useState(formData.brand);

  const handleBrandChange = (e) => {
    if (e.target.value === '') {
      setFormData({brand: '', model: '', year: '', km: '', color: '', price: ''});
      setSelectedBrand(e.target.value);
      return;
    }
    setFormData({...formData, [e.target.name]: e.target.value});
    setSelectedBrand(e.target.value);
  }
  const handleModelChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleKmChange = (e) => {
    if (Number(e.target.value) <= 9000000){
      setFormData({...formData, [e.target.name]: Number(e.target.value)});
    }
  }

  const handleYearChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleColorChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handlePriceChange = (e) => {
    setFormData({...formData, [e.target.name]: Number(e.target.value)});
  }

  const handleEngineChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handlePowerChange = (e) => {
    setFormData({...formData, [e.target.name]: Number(e.target.value)});
  }

  return (
    <React.Fragment>
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
              onChange={handleBrandChange}
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
              onChange={handleModelChange}
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
              onChange={handleYearChange}
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
            onChange={handleKmChange}
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
              onChange={handleColorChange}
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
            onChange={handlePriceChange}
          />
        </Grid>
        <Grid item xs={6} >
          <FormControl fullWidth disabled={!selectedBrand}>
            <InputLabel id="engine-label">Engine</InputLabel>
            <Select
              name="engine"
              labelId="engine-label"
              id="engine"
              value={formData.engine}
              label="engine"
              onChange={handleEngineChange}
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
            disabled={!selectedBrand}
            type="number"
            name='power'
            id="power"
            label="Power"
            helperText='power in horsepower'
            fullWidth
            variant="outlined"
            value={formData.power}
            onChange={handlePowerChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default CarForm;