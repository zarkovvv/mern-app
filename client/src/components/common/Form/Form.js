import * as React from 'react';
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {Box, Container, Paper, Stepper, Step, StepLabel, Button, Typography, CircularProgress} from '@mui/material';
import AdForm from "./AdForm/AdForm";
import CarForm from "./CarForm/CarForm";
import Alert from "../../alerts/Alert";
import {createAd} from "../../../redux/slices/adsSlice";
import {useDispatch, useSelector} from "react-redux";

const steps = ['Car details', 'Ad details'];

function getStepContent(step, formData, setFormData) {
  switch (step) {
    case 0:
      return <CarForm formData={formData} setFormData={setFormData}/>;
    case 1:
      return <AdForm formData={formData} setFormData={setFormData}/>;
    default:
      throw new Error('Unknown step');
  }
}

const Form = () => {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
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

  const handleNext = async () => {
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

      try {
        setLoading(true);
        await dispatch(createAd({obj})).unwrap();
        toast.success("Successfully created ad");
      } catch (e) {
        toast.error(e.response.data.error);
      } finally {
        setLoading(false);
      }

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
                  {loading ? <CircularProgress size={24} /> : activeStep === steps.length - 1 ? 'Create ad' : 'Next'}
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