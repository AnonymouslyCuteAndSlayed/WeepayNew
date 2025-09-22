import React, { useState } from 'react';
import Sidebar from '../../common/navs/Sidebar/sidebar';
import StepBreadcrumbs from '../../common/navs/Breadcrumbs/breadcrumbs';
import { FileText, Calculator, Settings, CheckCircle, FolderPlus  } from 'lucide-react';

// Import all your individual page JSX files
import BasicInfoPage from '../AddProposal/InputField/basicInformationField';
{/*import CalculationPage from './pages/CalculationPage';
import SettingsPage from './pages/SettingsPage';
import ReviewPage from './pages/ReviewPage';*/}

import "../../styles/AddProposal/mainCalculator.css"

function MainCalculator() {  
  const [activeItem, setActiveItem] = useState('dashboard');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  
  // ✨ SHARED STATE - This is the key!
  const [currentStep, setCurrentStep] = useState(0); // Track current page
  const [formData, setFormData] = useState({}); // Shared form data

  // Define your steps/pages
  const steps = [
    { label: 'Basic Info', icon: FileText },
    { label: 'Calculations', icon: Calculator },
    { label: 'Settings', icon: Settings },
    { label: 'Review', icon: CheckCircle }
  ];
   
  const handleSidebarToggle = (isExpanded) => {
    setSidebarExpanded(isExpanded);
  };
    
  const handleNavItemClick = (itemId) => {
    setActiveItem(itemId);
  };

  // 🍞 Handle breadcrumb navigation
  const handleStepClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  // 🔄 Functions to pass to child components
  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 🎯 Render the current page based on currentStep
  const renderCurrentPage = () => {
    switch (currentStep) {
      case 0:
        return (
          <BasicInfoPage 
            formData={formData} 
            setFormData={setFormData}
            onNext={goToNextStep}
            onPrevious={goToPreviousStep}
            currentStep={currentStep}
            totalSteps={steps.length}
          />
        );
      case 1:
        return (
          <CalculationPage 
            formData={formData} 
            setFormData={setFormData}
            onNext={goToNextStep}
            onPrevious={goToPreviousStep}
            currentStep={currentStep}
            totalSteps={steps.length}
          />
        );
      case 2:
        return (
          <SettingsPage 
            formData={formData} 
            setFormData={setFormData}
            onNext={goToNextStep}
            onPrevious={goToPreviousStep}
            currentStep={currentStep}
            totalSteps={steps.length}
          />
        );
      case 3:
        return (
          <ReviewPage 
            formData={formData}
            onPrevious={goToPreviousStep}
            currentStep={currentStep}
            totalSteps={steps.length}
          />
        );
      default:
        return (
          <BasicInfoPage 
            formData={formData} 
            setFormData={setFormData}
            onNext={goToNextStep}
            onPrevious={goToPreviousStep}
            currentStep={currentStep}
            totalSteps={steps.length}
          />
        );
    }
  };
  
  return (
    <>
      <Sidebar
        activeItem={activeItem}
        onNavItemClick={handleNavItemClick}
        onSidebarToggle={handleSidebarToggle}
      />
      
      <div className={`main-container ${sidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>

        <div className='calculator-field'>
          <h4> <FolderPlus className='folderplus'/> Create Proposal</h4>

          <div className='input-container'>
            
            <StepBreadcrumbs 
              currentStep={currentStep} 
              steps={steps} 
              onStepClick={handleStepClick}
            />

            {renderCurrentPage()}

            <button className='nextButton btn btn-primary'>
              Next
            </button>

            

          </div>
        </div>

        <div className='pdf-field'>
          <div className="p-4">
            <h5>Current Data:</h5>
            <pre className="text-sm bg-gray-100 p-2 rounded">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        </div>
      </div>

    </>
  );
}

export default MainCalculator;
