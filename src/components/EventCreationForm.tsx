import React, { useEffect, useState } from 'react';
import { BasicInfo } from './FormSteps/BasicInfo';
import { RegistrationType } from './FormSteps/RegistrationType';
import { VendorCap } from './FormSteps/VendorCap';
import { InsuranceRequirements } from './FormSteps/InsuranceRequirements';
import { PortalPreview } from './FormSteps/PortalPreview';
import { NextSteps } from './FormSteps/NextSteps';
import { StepIndicator } from './ui/StepIndicator';
import { VerticalStepIndicator } from './ui/VerticalStepIndicator';
import { Button } from './ui/Button';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
export function EventCreationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentVendorTypeIndex, setCurrentVendorTypeIndex] = useState(0);
  const [completedVendorTypes, setCompletedVendorTypes] = useState([]);
  const [formData, setFormData] = useState({
    eventName: '',
    eventDates: '',
    location: '',
    eventSummary: '',
    eventImage: '',
    registrationType: '',
    vendorCaps: [],
    portalUrl: '',
    vendorTypeInsuranceRequirements: [],
    insuranceRequirements: {
      useTemplate: false,
      selectedTemplate: null,
      requiredDocuments: {
        w9: false,
        coi: false,
        vendorAgreement: false,
        customForm: false
      },
      coiRequirements: {
        cgl: false,
        autoLiability: false,
        umbrellaLiability: false,
        workersComp: false,
        certificateHolder: false,
        additionalInsured: false,
        endorsements: false
      },
      cglLimits: {
        eachOccurrence: '',
        aggregate: ''
      },
      autoLiabilityDetails: {
        ownedAutos: false,
        hiredNonOwnedAutos: false,
        limit: ''
      },
      umbrellaLimit: '',
      workersCompLimit: '',
      certificateHolderRequirements: '',
      additionalInsuredEntities: [],
      endorsements: {
        additionalInsured: false,
        waiverOfSubrogation: false,
        primaryNonContributory: false,
        noticeOfCancellation: false
      }
    }
  });
  // Initialize vendor type insurance requirements when vendor caps change
  useEffect(() => {
    if (formData.vendorCaps.length > 0) {
      // Only initialize requirements for vendor types that don't have them yet
      const updatedRequirements = [...formData.vendorTypeInsuranceRequirements];
      formData.vendorCaps.forEach((vendorCap, index) => {
        if (!updatedRequirements[index]) {
          updatedRequirements[index] = {
            vendorType: vendorCap.type,
            requirements: JSON.parse(JSON.stringify(formData.insuranceRequirements)) // Deep copy default requirements
          };
        }
      });
      if (updatedRequirements.length !== formData.vendorTypeInsuranceRequirements.length) {
        setFormData({
          ...formData,
          vendorTypeInsuranceRequirements: updatedRequirements
        });
      }
    }
  }, [formData.vendorCaps]);
  const steps = [{
    number: 1,
    title: 'Event Basics'
  }, {
    number: 2,
    title: 'Registration Type'
  }, {
    number: 3,
    title: 'Vendor Types'
  }, {
    number: 4,
    title: 'Insurance Requirements'
  }, {
    number: 5,
    title: 'Portal Preview'
  }, {
    number: 6,
    title: 'Finalize and Launch'
  }];
  const updateFormData = data => {
    setFormData({
      ...formData,
      ...data
    });
  };
  const updateInsuranceRequirements = requirements => {
    if (formData.vendorCaps.length > 0) {
      const updatedRequirements = [...formData.vendorTypeInsuranceRequirements];
      updatedRequirements[currentVendorTypeIndex] = {
        vendorType: formData.vendorCaps[currentVendorTypeIndex].type,
        requirements: requirements
      };
      setFormData({
        ...formData,
        vendorTypeInsuranceRequirements: updatedRequirements
      });
    }
  };
  const nextStep = () => {
    if (currentStep === 4) {
      // Handle insurance requirements step
      if (!completedVendorTypes.includes(currentVendorTypeIndex)) {
        setCompletedVendorTypes([...completedVendorTypes, currentVendorTypeIndex]);
      }
      // If there are more vendor types to configure
      if (currentVendorTypeIndex < formData.vendorCaps.length - 1) {
        setCurrentVendorTypeIndex(currentVendorTypeIndex + 1);
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    if (currentStep === 4) {
      if (currentVendorTypeIndex > 0) {
        setCurrentVendorTypeIndex(currentVendorTypeIndex - 1);
        return;
      }
    }
    setCurrentStep(currentStep - 1);
  };
  const goToStep = stepNumber => {
    // Only allow clicking on completed steps or the next available step
    if (stepNumber < currentStep || stepNumber === currentStep) {
      setCurrentStep(stepNumber);
      // Reset vendor type index when going back to step 4
      if (stepNumber === 4) {
        setCurrentVendorTypeIndex(0);
      }
    }
  };
  const getCurrentInsuranceRequirements = () => {
    if (formData.vendorTypeInsuranceRequirements[currentVendorTypeIndex]) {
      return formData.vendorTypeInsuranceRequirements[currentVendorTypeIndex].requirements;
    }
    return formData.insuranceRequirements;
  };
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfo formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <RegistrationType formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <VendorCap formData={formData} updateFormData={updateFormData} />;
      case 4:
        if (formData.vendorCaps.length === 0) {
          return <div className="text-center py-8">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Vendor Types Defined
              </h3>
              <p className="text-gray-600 mb-4">
                Please go back to the previous step and add at least one vendor
                type.
              </p>
              <Button variant="outline" onClick={() => setCurrentStep(3)}>
                Go Back to Vendor Types
              </Button>
            </div>;
        }
        return <InsuranceRequirements formData={{
          insuranceRequirements: getCurrentInsuranceRequirements()
        }} updateFormData={data => {
          if (data.insuranceRequirements) {
            updateInsuranceRequirements(data.insuranceRequirements);
          }
        }} vendorType={formData.vendorCaps[currentVendorTypeIndex].type} vendorTypeIndex={currentVendorTypeIndex} totalVendorTypes={formData.vendorCaps.length} completedVendorTypes={completedVendorTypes} allVendorTypes={formData.vendorCaps} onVendorTypeChange={index => {
          if (!completedVendorTypes.includes(currentVendorTypeIndex)) {
            setCompletedVendorTypes([...completedVendorTypes, currentVendorTypeIndex]);
          }
          setCurrentVendorTypeIndex(index);
        }} />;
      case 5:
        return <PortalPreview formData={formData} updateFormData={updateFormData} />;
      case 6:
        return <NextSteps formData={formData} />;
      default:
        return null;
    }
  };
  const getButtonText = () => {
    if (currentStep === 4) {
      if (currentVendorTypeIndex < formData.vendorCaps.length - 1) {
        return `Next Vendor Type: ${formData.vendorCaps[currentVendorTypeIndex + 1].type}`;
      }
      return 'Continue to Portal Preview';
    }
    if (currentStep === steps.length - 1) {
      return 'Create Event';
    }
    return 'Continue';
  };
  return <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-72 bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Create a New Event
        </h1>
        <VerticalStepIndicator steps={steps} currentStep={currentStep} onStepClick={goToStep} />
      </div>
      <div className="flex-1 bg-white rounded-lg shadow-md p-8">
        <div className="md:hidden mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Create a New Event
          </h1>
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>
        <div className="py-4">{renderStep()}</div>
        <div className="flex justify-between mt-8">
          {currentStep > 1 || currentStep === 4 && currentVendorTypeIndex > 0 ? <Button variant="outline" onClick={prevStep} className="flex items-center">
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back
              </Button> : <div></div> // Empty div to maintain layout
        }
          {currentStep < steps.length || currentStep === 4 && currentVendorTypeIndex < formData.vendorCaps.length - 1 ? <Button variant="primary" onClick={nextStep} className="flex items-center">
              {getButtonText()}
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Button> : null}
        </div>
      </div>
    </div>;
}