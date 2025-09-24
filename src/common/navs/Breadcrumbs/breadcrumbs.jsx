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
  }

  
  const shortenLabel = (label, maxChars = 4) =>
    label.length > maxChars ? label.slice(0, maxChars) + "…" : label;

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb" sx={{ flexWrap: 'wrap' }}>
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isClickable = index <= currentStep;

          if (isActive) {
            return (
              <Typography
                key={index}
                sx={{ display: 'flex', alignItems: 'center', color: 'primary.main', fontWeight: 'bold' }}
              >
                <IconComponent size={16} style={{ marginRight: 4, flexShrink: 0 }} />
                {step.label}
              </Typography>
            );
          } else if (isClickable) {
            return (
              <Link
                key={index}
                underline="hover"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: isCompleted ? 'success.main' : 'inherit',
                  cursor: 'pointer',
                }}
                onClick={(event) => handleClick(event, index)}
                title={step.label} 
              >
                <IconComponent size={16} style={{ marginRight: 4, flexShrink: 0 }} />
                {shortenLabel(step.label)}
                {isCompleted && (
                  <CheckCircle size={12} style={{ marginLeft: 4, flexShrink: 0 }} />
                )}
              </Link>
            );
          } else {
            // Show shortened label for future steps
            return (
              <Typography
                key={index}
                sx={{ display: 'flex', alignItems: 'center', color: 'text.disabled' }}
                title={step.label}
              >
                <IconComponent size={16} style={{ marginRight: 4, flexShrink: 0 }} />
                {shortenLabel(step.label)}
              </Typography>
            );
          }
        })}
      </Breadcrumbs>
    </div>
  );
}

export default StepBreadcrumbs;
