import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const AdForm = ({formData, setFormData}) => {

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default AdForm;