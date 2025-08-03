import React, { useState } from 'react';
import { StepIndicator } from '../ui/StepIndicator';
import { VendorTypeBasics } from '../FormSteps/VendorTypeBasics';
import { RequiredDocuments } from '../FormSteps/RequiredDocuments';
import { InsuranceRequirements } from '../FormSteps/InsuranceRequirements';
import { TemplateManagement } from '../FormSteps/TemplateManagement';
import { Button } from '../ui/Button';
export function VendorTypeCreation() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    vendorTypeName: '',
    maxVendors: '',
    showOnPortal: true,
    requiredDocuments: {
      coi: true,
      w9: false,
      businessLicense: false,
      healthPermit: false,
      customForms: []
    },
    insuranceRequirements: {
      generalLiability: {
        eachOccurrence: '1000000',
        aggregate: '2000000',
        required: true
      },
      automobileLiability: {
        combinedSingleLimit: '1000000',
        required: false
      },
      workersCompensation: {
        eachAccident: '1000000',
        diseaseEachEmployee: '1000000',
        diseasePolicyLimit: '1000000',
        required: false
      },
      umbrella: {
        eachOccurrence: '1000000',
        aggregate: '1000000',
        required: false
      },
      additionalInsured: [],
      waiverOfSubrogation: false,
      primaryAndNoncontributory: false
    },
    templateName: '',
    selectedTemplate: null
  });
  const steps = [{
    number: 1,
    title: 'Vendor Type Basics'
  }, {
    number: 2,
    title: 'Required Documents'
  }, {
    number: 3,
    title: 'Insurance Requirements'
  }, {
    number: 4,
    title: 'Save Template'
  }];
  const updateFormData = data => {
    setFormData({
      ...formData,
      ...data
    });
  };
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <VendorTypeBasics formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <RequiredDocuments formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <InsuranceRequirements formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <TemplateManagement formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };
  const handleSave = () => {
    // Here would be API call to save the vendor type
    console.log('Saving vendor type:', formData);
    // Redirect to vendor types list or show success message
  };
  return <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Create Vendor Type
        </h1>
        <StepIndicator steps={steps} currentStep={currentStep} />
        <div className="py-6">{renderStep()}</div>
        <div className="flex justify-between mt-8">
          {currentStep > 1 && <Button variant="outline" onClick={prevStep}>
              Back
            </Button>}
          {currentStep < steps.length ? <Button variant="primary" onClick={nextStep} className="ml-auto">
              Continue
            </Button> : <Button variant="accent" onClick={handleSave} className="ml-auto">
              Create Vendor Type
            </Button>}
        </div>
      </div>
    </main>;
}