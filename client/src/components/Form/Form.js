import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';


const Form = () => {

  return (
    <Paper>
      <form autoComplete="off" noValidate>
        <Typography variant="h6"> Editing "ujjjjjjjjjjjjjjj"</Typography>
        <TextField name="creator" variant="outlined" label="Creator" fullWidth />
        <TextField name="title" variant="outlined" label="Title" fullWidth  />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth />
        <div></div>
        <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;