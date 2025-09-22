import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { CheckCircle } from 'lucide-react';

function StepBreadcrumbs({ currentStep, steps, onStepClick }) {
  
  function handleClick(event, stepIndex) {
    event.preventDefault();
    if (onStepClick && stepIndex <= currentStep) {
      onStepClick(stepIndex);
    }
    console.info(`You clicked step ${stepIndex}.`);
  }

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isClickable = index <= currentStep;
          
          if (isActive) {
            // Current step - not clickable
            return (
              <Typography
                key={index}
                sx={{ 
                  color: 'primary.main',
                  display: 'flex', 
                  alignItems: 'center',
                  fontWeight: 'bold'
                }}
              >
                <IconComponent size={16} style={{ marginRight: 4 }} />
                {step.label}
              </Typography>
            );
          } else if (isClickable) {
            // Previous steps - clickable
            return (
              <Link
                key={index}
                underline="hover"
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  color: isCompleted ? 'success.main' : 'inherit',
                  cursor: 'pointer'
                }}
                onClick={(event) => handleClick(event, index)}
              >
                <IconComponent size={16} style={{ marginRight: 4 }} />
                {step.label}
                {isCompleted && <CheckCircle size={12} style={{ marginLeft: 4 }} />}
              </Link>
            );
          } else {
            // Future steps - not clickable
            return (
              <Typography
                key={index}
                sx={{ 
                  color: 'text.disabled', 
                  display: 'flex', 
                  alignItems: 'center' 
                }}
              >
                <IconComponent size={16} style={{ marginRight: 4 }} />
                {step.label}
              </Typography>
            );
          }
        })}
      </Breadcrumbs>
    </div>
  );
}

export default StepBreadcrumbs;