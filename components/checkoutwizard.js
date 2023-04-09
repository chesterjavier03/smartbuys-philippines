import { Step, StepLabel, Stepper } from '@mui/material';

const CheckoutWizard = ({ activeStep = 0 }) => {
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      style={{ marginTop: '2rem' }}
    >
      {['Login', 'Shipping Address', 'Place Order'].map((step) => (
        <Step key={step}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CheckoutWizard;
