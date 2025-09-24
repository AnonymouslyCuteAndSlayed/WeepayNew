import React, { useState } from 'react';
import Sidebar from '../../common/navs/Sidebar/sidebar';
import StepBreadcrumbs from '../../common/navs/Breadcrumbs/breadcrumbs';
import { FileText, Calculator, CheckCircle, UserRoundPlus, FolderPlus, Building2, FolderDot, DiamondPlus  } from 'lucide-react';

import BasicInfoPage from './InputField/ClientDetails/basicInformationField';
import ResourceAllocation from './InputField/resourceAllopage';
import BusinessPlanning from '../AddProposal/InputField/businessPlanningpage';
import ProjectManagement from '../AddProposal/InputField/projectManageCoor';
import RiskBuffer from '../AddProposal/InputField/riskBufferpage';
import AdditionalDirectCosts from '../AddProposal/InputField/additionalDirectpage';
import SummaryTable from '../AddProposal/InputField/discountField'

import "../../styles/AddProposal/mainCalculator.css"

function MainCalculator() {  
  const [activeItem, setActiveItem] = useState('dashboard');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  
  const [currentStep, setCurrentStep] = useState(0); 
  const [formData, setFormData] = useState({}); 

  //steps/pages
  const steps = [
    { label: 'Basic Info', icon: FileText },
    { label: 'Resource Allocation', icon: UserRoundPlus},
    { label: 'Business Planning & Profit Target', icon: Building2},
    { label: 'Project Management', icon: FolderDot},
    { label: 'Risk Assessment & Buffers', icon: FolderDot},
    { label: 'Additional Direct Costs', icon: DiamondPlus}

  ];
   
  const handleSidebarToggle = (isExpanded) => {
    setSidebarExpanded(isExpanded);
  };
    
  const handleNavItemClick = (itemId) => {
    setActiveItem(itemId);
  };

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
          <BusinessPlanning 
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
          <ProjectManagement
            formData={formData}
            setFormData={setFormData}
            onNext={goToNextStep}
            onPrevious={goToPreviousStep}
            currentStep={currentStep}
            totalSteps={steps.length}
          />
        );

        case 4:
        return (
          <RiskBuffer
            formData={formData}
            setFormData={setFormData}
            onNext={goToNextStep}
            onPrevious={goToPreviousStep}
            currentStep={currentStep}
            totalSteps={steps.length}
          />
        );

        case 5:
        return (
          <AdditionalDirectCosts
            formData={formData}
            setFormData={setFormData}
            onNext={goToNextStep}
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
      
      <div
          className={`main-container ${sidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'} ${
            formData && Object.keys(formData).length > 0 ? 'two-columns' : ''
          }`}
        >
          <div className="calculator-field">
            <h4>
              <FolderPlus className="folderplus" /> Create Proposal
            </h4>

            <div className="input-container ">
              <StepBreadcrumbs
                currentStep={currentStep}
                steps={steps}
                onStepClick={handleStepClick}
              />
              {renderCurrentPage()}
            </div>

            <div className='discount-field'>

              <SummaryTable/>
          </div>

          </div>

  {
      formData && Object.keys(formData).length > 0 && (
        <div className="pdf-field">
          <div className="p-4">
            <h5>Current Data:</h5>
            <pre className="text-sm bg-gray-100 p-2 rounded">
              {JSON.stringify(formData, null, 5)}
            </pre>
          </div>
        </div>
      )
    }
</div>
    </>
  );
}

export default MainCalculator;
