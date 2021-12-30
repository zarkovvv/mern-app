import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import AdForm from "./AdForm/AdForm";
import CarForm from "./CarForm/CarForm";
import {useEffect, useState} from "react";
// import Review from './Review';

const steps = ['Car details', 'Ad details'];

function getStepContent(step, formData, setFormData) {
  switch (step) {
    case 0:
      return <CarForm formData={formData} setFormData={setFormData}/>;
    case 1:
      return <AdForm formData={formData} setFormData={setFormData}/>;
    // case 2:
    //   return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

const Form = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(
    {
      title: '',
      description: '',
      brand: '',
      model: '',
      km: '',
      year: '',
      color: '',
      price: '',
      engine: '',
      power: ''
    }
  );
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(checkNextValidity());
  }, [formData]);

  const handleNext = () => {
    if (activeStep === 1) {
      const obj = {
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
      console.log(obj);
    } else {
      setActiveStep(activeStep + 1);
    }
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const checkNextValidity = () => {
    if (activeStep === 0) {
      let obj = Object.assign({}, formData);
      delete obj["title"];
      delete obj["description"];
      return Object.values(obj).includes('');
    } else if (activeStep === 1) {
      return Object.values(formData).includes('');
    }
  }

  return (
    <React.Fragment>
      <Container component="main" maxWidth="sm" sx={{mb: 4}}>
        <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
          <Typography component="h1" variant="h4" align="center">
            Create Ad
          </Typography>
          <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            <React.Fragment>
              {getStepContent(activeStep, formData, setFormData)}
              <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={disabled}
                  sx={{mt: 3, ml: 1}}
                >
                  {activeStep === steps.length - 1 ? 'Create ad' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          </React.Fragment>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default Form;