import React, { useState } from 'react';
import Sidebar from '../../common/navs/Sidebar/sidebar';
import StepBreadcrumbs from '../../common/navs/Breadcrumbs/breadcrumbs';
import { FileText, Calculator, Settings, CheckCircle, UserRoundPlus, FolderPlus} from 'lucide-react';

import BasicInfoPage from './InputField/ClientDetails/basicInformationField';
import ResourceAllocation from '../AddProposal/InputField/resourceAllocationpage';
{/*import SettingsPage from './pages/SettingsPage';
import ReviewPage from './pages/ReviewPage';*/}

import "../../styles/AddProposal/mainCalculator.css"

function MainCalculator() {  
  const [activeItem, setActiveItem] = useState('dashboard');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  
  const [currentStep, setCurrentStep] = useState(0); // Track current page
  const [formData, setFormData] = useState({}); // Shared form data

  //steps/pages
  const steps = [
    { label: 'Basic Info', icon: FileText },
    { label: 'Resource Allocation', icon: UserRoundPlus},
    { label: 'Settings', icon: Settings },
    { label: 'Review', icon: CheckCircle }
  ];
   
  const handleSidebarToggle = (isExpanded) => {
    setSidebarExpanded(isExpanded);
  };
    
  const handleNavItemClick = (itemId) => {
    setActiveItem(itemId);
  };

  // breadcrumb navigation
  const handleStepClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

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

  // Render the current page based on currentStep
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
          <ResourceAllocation
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
