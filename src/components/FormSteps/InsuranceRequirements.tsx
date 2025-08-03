import React, { useState } from 'react';
import { FormField } from '../ui/FormField';
import { Switch } from '../ui/Switch';
import { InfoIcon, HelpCircleIcon, PlusIcon, TrashIcon, CheckIcon, BookmarkIcon, AlertCircleIcon, BrainIcon, UploadIcon, FileIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatCurrencyInWords } from '../../utils/numberToWords';
// Sample vendor type templates for demonstration
const sampleTemplates = [{
  id: '1',
  name: 'Food Vendor - Standard',
  description: 'Standard insurance requirements for food vendors'
}, {
  id: '2',
  name: 'Craft Vendor - Basic',
  description: 'Minimal requirements for craft vendors'
}, {
  id: '3',
  name: 'Alcohol Vendor - Premium',
  description: 'Enhanced requirements for alcohol vendors'
}];
export function InsuranceRequirements({
  formData,
  updateFormData,
  vendorType,
  vendorTypeIndex,
  totalVendorTypes,
  completedVendorTypes,
  allVendorTypes,
  onVendorTypeChange
}) {
  const [entityName, setEntityName] = useState('');
  const [showSaveTemplate, setShowSaveTemplate] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [vendorAgreementFile, setVendorAgreementFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const handleToggleTemplate = useTemplate => {
    const updatedInsuranceRequirements = {
      ...formData.insuranceRequirements,
      useTemplate
    };
    updateFormData({
      insuranceRequirements: updatedInsuranceRequirements
    });
  };
  const selectTemplate = templateId => {
    const updatedInsuranceRequirements = {
      ...formData.insuranceRequirements,
      selectedTemplate: templateId
    };
    updateFormData({
      insuranceRequirements: updatedInsuranceRequirements
    });
  };
  const handleRequiredDocumentChange = (documentType, checked) => {
    const updatedRequiredDocuments = {
      ...formData.insuranceRequirements.requiredDocuments,
      [documentType]: checked
    };
    updateFormData({
      insuranceRequirements: {
        ...formData.insuranceRequirements,
        requiredDocuments: updatedRequiredDocuments
      }
    });
  };
  const handleCoiRequirementChange = (requirement, checked) => {
    const updatedCoiRequirements = {
      ...formData.insuranceRequirements.coiRequirements,
      [requirement]: checked
    };
    updateFormData({
      insuranceRequirements: {
        ...formData.insuranceRequirements,
        coiRequirements: updatedCoiRequirements
      }
    });
  };
  const handleCglLimitChange = (field, value) => {
    const updatedCglLimits = {
      ...formData.insuranceRequirements.cglLimits,
      [field]: value
    };
    updateFormData({
      insuranceRequirements: {
        ...formData.insuranceRequirements,
        cglLimits: updatedCglLimits
      }
    });
  };
  const handleAutoLiabilityDetailChange = (field, value) => {
    const updatedAutoLiabilityDetails = {
      ...formData.insuranceRequirements.autoLiabilityDetails,
      [field]: value
    };
    updateFormData({
      insuranceRequirements: {
        ...formData.insuranceRequirements,
        autoLiabilityDetails: updatedAutoLiabilityDetails
      }
    });
  };
  const handleLimitChange = (field, value) => {
    updateFormData({
      insuranceRequirements: {
        ...formData.insuranceRequirements,
        [field]: value
      }
    });
  };
  const handleCertificateHolderRequirementsChange = value => {
    updateFormData({
      insuranceRequirements: {
        ...formData.insuranceRequirements,
        certificateHolderRequirements: value
      }
    });
  };
  const addEntity = () => {
    if (entityName.trim() === '') return;
    const newEntity = {
      id: Date.now().toString(),
      name: entityName
    };
    const updatedEntities = [...formData.insuranceRequirements.additionalInsuredEntities, newEntity];
    updateFormData({
      insuranceRequirements: {
        ...formData.insuranceRequirements,
        additionalInsuredEntities: updatedEntities
      }
    });
    setEntityName('');
  };
  const removeEntity = id => {
    const updatedEntities = formData.insuranceRequirements.additionalInsuredEntities.filter(entity => entity.id !== id);
    updateFormData({
      insuranceRequirements: {
        ...formData.insuranceRequirements,
        additionalInsuredEntities: updatedEntities
      }
    });
  };
  const handleEndorsementChange = (endorsement, checked) => {
    const updatedEndorsements = {
      ...formData.insuranceRequirements.endorsements,
      [endorsement]: checked
    };
    updateFormData({
      insuranceRequirements: {
        ...formData.insuranceRequirements,
        endorsements: updatedEndorsements
      }
    });
  };
  const handleSaveTemplate = () => {
    // In a real app, this would save the template to the database
    setSaveSuccess(true);
    // Reset after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
      setShowSaveTemplate(false);
      setTemplateName('');
      setTemplateDescription('');
    }, 3000);
  };
  const handleVendorAgreementUpload = e => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        setVendorAgreementFile({
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file)
        });
        setIsUploading(false);
      }, 1000);
    }
  };
  const removeVendorAgreementFile = () => {
    setVendorAgreementFile(null);
  };
  // Helper component for document requirement checkboxes
  const RequirementCheckbox = ({
    label,
    tooltip,
    checked,
    onChange
  }) => <div className="flex items-center p-4 border border-gray-200 rounded-md bg-white hover:bg-gray-50">
      <div className="flex-1">
        <div className="flex items-center">
          <h3 className="font-medium">{label}</h3>
          <div className="ml-2 relative group">
            <HelpCircleIcon className="h-4 w-4 text-gray-400 cursor-help" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-gray-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
              {tooltip}
            </div>
          </div>
        </div>
      </div>
      <button className={`w-6 h-6 rounded-md flex items-center justify-center ${checked ? 'bg-teal-500' : 'border border-gray-300'}`} onClick={onChange}>
        {checked && <CheckIcon className="h-4 w-4 text-white" />}
      </button>
    </div>;
  return <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {totalVendorTypes > 1 ? 'Insurance Requirements' : `Insurance Requirements for ${vendorType}`}
      </h2>
      {/* Notice about insurance requirements not being changeable */}
      <div className="mb-6 bg-yellow-50 p-4 rounded-md flex items-start">
        <AlertCircleIcon className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-yellow-700">
          <p className="font-medium mb-1">Important</p>
          <p>
            Insurance requirements for a vendor type cannot be changed after a
            vendor has registered. Please ensure all requirements are set
            correctly before inviting vendors.
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center mb-6 bg-blue-50 p-4 rounded-md">
        <p className="text-blue-700 font-medium">
          Don't have a lawyer for legal guidance?
        </p>
        <a href="https://chatgpt.com/g/g-vOB0FqIYr-insurance-compliance-engine" target="_blank" rel="noopener noreferrer">
          <Button variant="primary" className="flex items-center">
            <img src="/CompliBotIconWhite.svg" alt="CompliBot" className="h-4 w-4 mr-2" />
            Ask CompliBot
          </Button>
        </a>
      </div>
      {/* Vendor Type Navigation - Only show when there's more than one vendor type */}
      {totalVendorTypes > 1 && <div className="mb-6 bg-blue-50 p-4 rounded-md">
          <div className="flex flex-col md:flex-row justify-between mb-3">
            <h3 className="text-md font-medium text-blue-900 mb-1">
              Vendor Type: <span className="font-bold">{vendorType}</span>
            </h3>
            <p className="text-sm text-blue-700">
              {`${vendorTypeIndex + 1} of ${totalVendorTypes} vendor types`}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {allVendorTypes.map((vendorCap, index) => <button key={index} className={`px-3 py-1.5 rounded-full text-sm ${index === vendorTypeIndex ? 'bg-blue-600 text-white font-medium' : completedVendorTypes.includes(index) ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`} onClick={() => onVendorTypeChange(index)}>
                {vendorCap.type}
                {completedVendorTypes.includes(index) && index !== vendorTypeIndex && <CheckIcon className="h-3 w-3 inline-block ml-1" />}
              </button>)}
          </div>
          <div className="mt-2 flex gap-1">
            {allVendorTypes.map((_, index) => <div key={index} className={`h-2 flex-1 rounded-full ${completedVendorTypes.includes(index) ? 'bg-blue-600' : index === vendorTypeIndex ? 'bg-blue-300' : 'bg-gray-200'}`} />)}
          </div>
        </div>}
      {/* Template Selection Option */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium text-gray-900">
              Use Vendor Type Template
            </h3>
            <p className="text-sm text-gray-600">
              Apply insurance requirements from an existing vendor type template
              you have already saved
            </p>
          </div>
          <Switch checked={formData.insuranceRequirements.useTemplate} onCheckedChange={handleToggleTemplate} />
        </div>
        {formData.insuranceRequirements.useTemplate && <div className="space-y-3 mt-4 pl-4 border-l-2 border-teal-100">
            <p className="text-sm text-gray-700 mb-2">
              Select a template to apply its insurance requirements
            </p>
            {sampleTemplates.map(template => <button key={template.id} className={`w-full text-left p-4 border rounded-md transition-colors ${formData.insuranceRequirements.selectedTemplate === template.id ? 'border-teal-500 bg-teal-50' : 'border-gray-200 bg-white hover:bg-gray-50'}`} onClick={() => selectTemplate(template.id)}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {template.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {template.description}
                    </p>
                  </div>
                  {formData.insuranceRequirements.selectedTemplate === template.id && <CheckIcon className="h-5 w-5 text-teal-500" />}
                </div>
              </button>)}
          </div>}
      </div>

      {/* Required Documents Section */}
      {!formData.insuranceRequirements.useTemplate && <>
          <div className="mb-8">
            <h3 className="font-medium text-gray-900 mb-4">
              Required Documents
            </h3>
            <div className="space-y-3">
              <RequirementCheckbox label="W-9 Form" tooltip="Tax identification form required for vendor payment processing" checked={formData.insuranceRequirements.requiredDocuments.w9} onChange={() => handleRequiredDocumentChange('w9', !formData.insuranceRequirements.requiredDocuments.w9)} />
              {formData.insuranceRequirements.requiredDocuments.w9 && <div className="pl-4 ml-4 border-l-2 border-gray-100">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-gray-600 mb-2">
                      A W-9 form upload field will be shown to vendors in the
                      portal.
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <InfoIcon className="h-4 w-4 mr-1 text-blue-500" />
                      Vendors will be required to upload their completed W-9
                      form
                    </div>
                  </div>
                </div>}
              <RequirementCheckbox label="Certificate of Insurance (COI)" tooltip="Document that verifies a vendor has active insurance coverage" checked={formData.insuranceRequirements.requiredDocuments.coi} onChange={() => handleRequiredDocumentChange('coi', !formData.insuranceRequirements.requiredDocuments.coi)} />
              <RequirementCheckbox label="Vendor Agreement" tooltip="Legal contract between the event and vendor outlining terms and conditions" checked={formData.insuranceRequirements.requiredDocuments.vendorAgreement} onChange={() => handleRequiredDocumentChange('vendorAgreement', !formData.insuranceRequirements.requiredDocuments.vendorAgreement)} />
              {formData.insuranceRequirements.requiredDocuments.vendorAgreement && <div className="pl-4 ml-4 border-l-2 border-gray-100">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-gray-600 mb-2">
                      Upload a vendor agreement template for vendors to review
                      and sign
                    </p>
                    {vendorAgreementFile ? <div className="flex items-center justify-between bg-white p-2 rounded border border-gray-200">
                        <div className="flex items-center">
                          <FileIcon className="h-5 w-5 text-blue-500 mr-2" />
                          <div>
                            <p className="text-sm font-medium">
                              {vendorAgreementFile.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {Math.round(vendorAgreementFile.size / 1024)} KB
                            </p>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-red-500" onClick={removeVendorAgreementFile}>
                          <XIcon className="h-4 w-4" />
                        </button>
                      </div> : <div className="mt-2">
                        <label className="flex items-center justify-center w-full h-24 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                          <span className="flex items-center space-x-2">
                            <UploadIcon className="w-6 h-6 text-gray-500" />
                            <span className="font-medium text-gray-600">
                              {isUploading ? 'Uploading...' : 'Drop files to upload or Browse'}
                            </span>
                          </span>
                          <input type="file" name="file_upload" className="hidden" accept=".pdf,.doc,.docx" onChange={handleVendorAgreementUpload} disabled={isUploading} />
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                          Accepted file types: PDF, DOC, DOCX (Max 5MB)
                        </p>
                      </div>}
                  </div>
                </div>}
              <RequirementCheckbox label="Custom Form" tooltip="Additional documentation specific to your event requirements" checked={formData.insuranceRequirements.requiredDocuments.customForm} onChange={() => handleRequiredDocumentChange('customForm', !formData.insuranceRequirements.requiredDocuments.customForm)} />
            </div>
          </div>

          {/* COI Requirements - Only show if COI is required */}
          {formData.insuranceRequirements.requiredDocuments.coi && <div className="mb-8 border-t border-gray-200 pt-6">
              <h3 className="font-medium text-gray-900 mb-4">
                Certificate of Insurance (COI) Requirements
              </h3>
              <div className="space-y-3">
                <RequirementCheckbox label="Commercial General Liability (CGL)" tooltip="Insurance that covers third-party bodily injury and property damage claims" checked={formData.insuranceRequirements.coiRequirements.cgl} onChange={() => handleCoiRequirementChange('cgl', !formData.insuranceRequirements.coiRequirements.cgl)} />
                <RequirementCheckbox label="Automobile Liability" tooltip="Insurance that covers bodily injury and property damage caused by vehicles" checked={formData.insuranceRequirements.coiRequirements.autoLiability} onChange={() => handleCoiRequirementChange('autoLiability', !formData.insuranceRequirements.coiRequirements.autoLiability)} />
                <RequirementCheckbox label="Umbrella / Excess Liability" tooltip="Additional liability coverage that extends beyond the limits of primary insurance policies" checked={formData.insuranceRequirements.coiRequirements.umbrellaLiability} onChange={() => handleCoiRequirementChange('umbrellaLiability', !formData.insuranceRequirements.coiRequirements.umbrellaLiability)} />
                <RequirementCheckbox label="Workers' Compensation" tooltip="Insurance that provides benefits to employees who suffer work-related injuries or illnesses" checked={formData.insuranceRequirements.coiRequirements.workersComp} onChange={() => handleCoiRequirementChange('workersComp', !formData.insuranceRequirements.coiRequirements.workersComp)} />
                <RequirementCheckbox label="Certificate Holder Requirements" tooltip="Specific details about who should be listed as the certificate holder on the COI" checked={formData.insuranceRequirements.coiRequirements.certificateHolder} onChange={() => handleCoiRequirementChange('certificateHolder', !formData.insuranceRequirements.coiRequirements.certificateHolder)} />
                <RequirementCheckbox label="Additional Insured Entities" tooltip="Organizations or individuals that need to be named as additional insured on the vendor's policy" checked={formData.insuranceRequirements.coiRequirements.additionalInsured} onChange={() => handleCoiRequirementChange('additionalInsured', !formData.insuranceRequirements.coiRequirements.additionalInsured)} />
                <RequirementCheckbox label="Endorsements" tooltip="Policy amendments that modify the coverage provided by the standard insurance policy" checked={formData.insuranceRequirements.coiRequirements.endorsements} onChange={() => handleCoiRequirementChange('endorsements', !formData.insuranceRequirements.coiRequirements.endorsements)} />
              </div>
            </div>}

          {/* CGL Limits - Only show if CGL is selected */}
          {formData.insuranceRequirements.requiredDocuments.coi && formData.insuranceRequirements.coiRequirements.cgl && <div className="mb-8 pl-4 border-l-2 border-teal-100">
                <h3 className="font-medium text-gray-900 mb-4">
                  Commercial General Liability Limits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <FormField label="Each Occurrence Limit" id="cglOccurrenceLimit" type="text" value={formData.insuranceRequirements.cglLimits.eachOccurrence} onChange={e => handleCglLimitChange('eachOccurrence', e.target.value)} placeholder="e.g., 1000000" prefix="$" helperText={formatCurrencyInWords(formData.insuranceRequirements.cglLimits.eachOccurrence)} />
                    <div className="relative group mt-1">
                      <HelpCircleIcon className="h-4 w-4 text-gray-400 cursor-help inline" />
                      <span className="ml-1 text-xs text-gray-500">
                        Maximum amount paid for a single claim
                      </span>
                      <div className="absolute bottom-full left-0 mb-2 w-64 bg-gray-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                        The maximum amount the insurance company will pay for a
                        single covered claim
                      </div>
                    </div>
                  </div>
                  <div>
                    <FormField label="Aggregate Limit" id="cglAggregateLimit" type="text" value={formData.insuranceRequirements.cglLimits.aggregate} onChange={e => handleCglLimitChange('aggregate', e.target.value)} placeholder="e.g., 2000000" prefix="$" helperText={formatCurrencyInWords(formData.insuranceRequirements.cglLimits.aggregate)} />
                    <div className="relative group mt-1">
                      <HelpCircleIcon className="h-4 w-4 text-gray-400 cursor-help inline" />
                      <span className="ml-1 text-xs text-gray-500">
                        Maximum amount paid for all claims in policy period
                      </span>
                      <div className="absolute bottom-full left-0 mb-2 w-64 bg-gray-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                        The maximum amount the insurance company will pay for
                        all covered claims during the policy period
                      </div>
                    </div>
                  </div>
                </div>
              </div>}

          {/* Auto Liability Details - Only show if Auto Liability is selected */}
          {formData.insuranceRequirements.requiredDocuments.coi && formData.insuranceRequirements.coiRequirements.autoLiability && <div className="mb-8 pl-4 border-l-2 border-teal-100">
                <h3 className="font-medium text-gray-900 mb-4">
                  Automobile Liability Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <button className={`w-5 h-5 rounded-md flex items-center justify-center mr-2 ${formData.insuranceRequirements.autoLiabilityDetails.ownedAutos ? 'bg-teal-500' : 'border border-gray-300'}`} onClick={() => handleAutoLiabilityDetailChange('ownedAutos', !formData.insuranceRequirements.autoLiabilityDetails.ownedAutos)}>
                        {formData.insuranceRequirements.autoLiabilityDetails.ownedAutos && <CheckIcon className="h-3 w-3 text-white" />}
                      </button>
                      <label className="text-sm font-medium text-gray-700">
                        Owned Autos
                      </label>
                      <div className="ml-2 relative group">
                        <HelpCircleIcon className="h-4 w-4 text-gray-400 cursor-help" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-gray-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                          Coverage for vehicles owned by the business
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button className={`w-5 h-5 rounded-md flex items-center justify-center mr-2 ${formData.insuranceRequirements.autoLiabilityDetails.hiredNonOwnedAutos ? 'bg-teal-500' : 'border border-gray-300'}`} onClick={() => handleAutoLiabilityDetailChange('hiredNonOwnedAutos', !formData.insuranceRequirements.autoLiabilityDetails.hiredNonOwnedAutos)}>
                        {formData.insuranceRequirements.autoLiabilityDetails.hiredNonOwnedAutos && <CheckIcon className="h-3 w-3 text-white" />}
                      </button>
                      <label className="text-sm font-medium text-gray-700">
                        Hired & Non-Owned Autos
                      </label>
                      <div className="ml-2 relative group">
                        <HelpCircleIcon className="h-4 w-4 text-gray-400 cursor-help" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-gray-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                          Coverage for vehicles rented or borrowed by the
                          business
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <FormField label="Limit" id="autoLiabilityLimit" type="text" value={formData.insuranceRequirements.autoLiabilityDetails.limit} onChange={e => handleAutoLiabilityDetailChange('limit', e.target.value)} placeholder="e.g., 1000000" prefix="$" helperText={formatCurrencyInWords(formData.insuranceRequirements.autoLiabilityDetails.limit)} />
                    <div className="relative group mt-1">
                      <HelpCircleIcon className="h-4 w-4 text-gray-400 cursor-help inline" />
                      <span className="ml-1 text-xs text-gray-500">
                        Maximum coverage amount
                      </span>
                      <div className="absolute bottom-full left-0 mb-2 w-64 bg-gray-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                        The maximum amount the insurance company will pay for
                        covered auto liability claims
                      </div>
                    </div>
                  </div>
                </div>
              </div>}

          {/* Umbrella / Excess Liability Limit - Only show if selected */}
          {formData.insuranceRequirements.requiredDocuments.coi && formData.insuranceRequirements.coiRequirements.umbrellaLiability && <div className="mb-8 pl-4 border-l-2 border-teal-100">
                <h3 className="font-medium text-gray-900 mb-4">
                  Umbrella / Excess Liability
                </h3>
                <div>
                  <FormField label="Limit" id="umbrellaLimit" type="text" value={formData.insuranceRequirements.umbrellaLimit} onChange={e => handleLimitChange('umbrellaLimit', e.target.value)} placeholder="e.g., 1000000" prefix="$" helperText={formatCurrencyInWords(formData.insuranceRequirements.umbrellaLimit)} />
                  <div className="relative group mt-1">
                    <HelpCircleIcon className="h-4 w-4 text-gray-400 cursor-help inline" />
                    <span className="ml-1 text-xs text-gray-500">
                      Additional coverage beyond primary insurance
                    </span>
                    <div className="absolute bottom-full left-0 mb-2 w-64 bg-gray-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                      Coverage that extends beyond the limits of primary
                      insurance policies
                    </div>
                  </div>
                </div>
              </div>}

          {/* Workers' Compensation Limit - Only show if selected */}
          {formData.insuranceRequirements.requiredDocuments.coi && formData.insuranceRequirements.coiRequirements.workersComp && <div className="mb-8 pl-4 border-l-2 border-teal-100">
                <h3 className="font-medium text-gray-900 mb-4">
                  Workers' Compensation
                </h3>
                <div>
                  <FormField label="Limit" id="workersCompLimit" type="text" value={formData.insuranceRequirements.workersCompLimit} onChange={e => handleLimitChange('workersCompLimit', e.target.value)} placeholder="e.g., 1000000" prefix="$" helperText={formatCurrencyInWords(formData.insuranceRequirements.workersCompLimit)} />
                  <div className="relative group mt-1">
                    <HelpCircleIcon className="h-4 w-4 text-gray-400 cursor-help inline" />
                    <span className="ml-1 text-xs text-gray-500">
                      Coverage for work-related injuries
                    </span>
                    <div className="absolute bottom-full left-0 mb-2 w-64 bg-gray-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                      Insurance that provides benefits to employees who suffer
                      work-related injuries or illnesses
                    </div>
                  </div>
                </div>
              </div>}

          {/* Certificate Holder Requirements - Only show if selected */}
          {formData.insuranceRequirements.requiredDocuments.coi && formData.insuranceRequirements.coiRequirements.certificateHolder && <div className="mb-8 pl-4 border-l-2 border-teal-100">
                <h3 className="font-medium text-gray-900 mb-4">
                  Certificate Holder Requirements
                </h3>
                <div className="relative group mb-2">
                  <HelpCircleIcon className="h-4 w-4 text-gray-400 cursor-help inline" />
                  <span className="ml-1 text-xs text-gray-500">
                    Specify who should be listed as the certificate holder
                  </span>
                  <div className="absolute bottom-full left-0 mb-2 w-64 bg-gray-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    The entity who is provided the certificate as evidence of
                    the vendor's insurance coverage
                  </div>
                </div>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" rows={4} value={formData.insuranceRequirements.certificateHolderRequirements} onChange={e => handleCertificateHolderRequirementsChange(e.target.value)} placeholder="e.g., Event Name LLC, 123 Main St, City, State, ZIP" />
              </div>}

          {/* Additional Insured Entities - Only show if selected */}
          {formData.insuranceRequirements.requiredDocuments.coi && formData.insuranceRequirements.coiRequirements.additionalInsured && <div className="mb-8 pl-4 border-l-2 border-teal-100">
                <h3 className="font-medium text-gray-900 mb-4">
                  Additional Insured Entities
                </h3>
                <div className="relative group mb-2">
                  <HelpCircleIcon className="h-4 w-4 text-gray-400 cursor-help inline" />
                  <span className="ml-1 text-xs text-gray-500">
                    Organizations that must be named as additional insured on
                    the vendor's policy
                  </span>
                  <div className="absolute bottom-full left-0 mb-2 w-64 bg-gray-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    Entities that are protected under the vendor's insurance
                    policy
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  {formData.insuranceRequirements.additionalInsuredEntities.map(entity => <div key={entity.id} className="flex items-center p-3 border border-gray-200 rounded-md bg-white">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{entity.name}</p>
                        </div>
                        <button className="text-gray-400 hover:text-red-500" onClick={() => removeEntity(entity.id)}>
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>)}
                </div>
                <div className="flex gap-2">
                  <input type="text" value={entityName} onChange={e => setEntityName(e.target.value)} placeholder="Entity name (e.g., Event Name LLC, Venue Name)" className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
                  <Button variant="outline" className="flex items-center" onClick={addEntity} disabled={entityName.trim() === ''}>
                    <PlusIcon className="h-4 w-4 mr-1" /> Add Entity
                  </Button>
                </div>
              </div>}

          {/* Endorsements - Only show if selected */}
          {formData.insuranceRequirements.requiredDocuments.coi && formData.insuranceRequirements.coiRequirements.endorsements && <div className="mb-8 pl-4 border-l-2 border-teal-100">
                <h3 className="font-medium text-gray-900 mb-4">Endorsements</h3>
                <div className="space-y-3">
                  <div className="flex items-center p-3 border border-gray-200 rounded-md bg-white hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4 className="font-medium">Additional Insured</h4>
                        <div className="ml-2 relative group">
                          <HelpCircleIcon className="h-4 w-4 text-gray-400 cursor-help" />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-gray-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                            Extends coverage to other parties under the vendor's
                            policy
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className={`w-6 h-6 rounded-md flex items-center justify-center ${formData.insuranceRequirements.endorsements.additionalInsured ? 'bg-teal-500' : 'border border-gray-300'}`} onClick={() => handleEndorsementChange('additionalInsured', !formData.insuranceRequirements.endorsements.additionalInsured)}>
                      {formData.insuranceRequirements.endorsements.additionalInsured && <CheckIcon className="h-4 w-4 text-white" />}
                    </button>
                  </div>
                  <div className="flex items-center p-3 border border-gray-200 rounded-md bg-white hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4 className="font-medium">Waiver of Subrogation</h4>
                        <div className="ml-2 relative group">
                          <HelpCircleIcon className="h-4 w-4 text-gray-400 cursor-help" />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-gray-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                            Prevents the insurer from seeking reimbursement from
                            third parties
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className={`w-6 h-6 rounded-md flex items-center justify-center ${formData.insuranceRequirements.endorsements.waiverOfSubrogation ? 'bg-teal-500' : 'border border-gray-300'}`} onClick={() => handleEndorsementChange('waiverOfSubrogation', !formData.insuranceRequirements.endorsements.waiverOfSubrogation)}>
                      {formData.insuranceRequirements.endorsements.waiverOfSubrogation && <CheckIcon className="h-4 w-4 text-white" />}
                    </button>
                  </div>
                  <div className="flex items-center p-3 border border-gray-200 rounded-md bg-white hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4 className="font-medium">
                          Primary and Non-Contributory
                        </h4>
                        <div className="ml-2 relative group">
                          <HelpCircleIcon className="h-4 w-4 text-gray-400 cursor-help" />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-gray-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                            Vendor's insurance pays first before any other
                            policies
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className={`w-6 h-6 rounded-md flex items-center justify-center ${formData.insuranceRequirements.endorsements.primaryNonContributory ? 'bg-teal-500' : 'border border-gray-300'}`} onClick={() => handleEndorsementChange('primaryNonContributory', !formData.insuranceRequirements.endorsements.primaryNonContributory)}>
                      {formData.insuranceRequirements.endorsements.primaryNonContributory && <CheckIcon className="h-4 w-4 text-white" />}
                    </button>
                  </div>
                  <div className="flex items-center p-3 border border-gray-200 rounded-md bg-white hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4 className="font-medium">Notice of Cancellation</h4>
                        <div className="ml-2 relative group">
                          <HelpCircleIcon className="h-4 w-4 text-gray-400 cursor-help" />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-gray-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                            Requires insurer to notify additional insureds if
                            policy is cancelled
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className={`w-6 h-6 rounded-md flex items-center justify-center ${formData.insuranceRequirements.endorsements.noticeOfCancellation ? 'bg-teal-500' : 'border border-gray-300'}`} onClick={() => handleEndorsementChange('noticeOfCancellation', !formData.insuranceRequirements.endorsements.noticeOfCancellation)}>
                      {formData.insuranceRequirements.endorsements.noticeOfCancellation && <CheckIcon className="h-4 w-4 text-white" />}
                    </button>
                  </div>
                </div>
              </div>}
        </>}

      {/* Save as Template Option - Only show if not using a template */}
      {!formData.insuranceRequirements.useTemplate && <div className="border-t border-gray-200 pt-6 mt-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-medium text-gray-900">Save as Template</h3>
              <p className="text-sm text-gray-600 mt-1">
                Save these insurance requirements as a template for future use
                with other vendor types and events.
              </p>
            </div>
            <Button variant="outline" className="flex items-center whitespace-nowrap" onClick={() => setShowSaveTemplate(!showSaveTemplate)}>
              <BookmarkIcon className="h-4 w-4 mr-2" />
              {showSaveTemplate ? 'Cancel' : 'Save as Template'}
            </Button>
          </div>
          {showSaveTemplate && <div className="bg-gray-50 p-4 rounded-md mt-4">
              <div className="space-y-4">
                <FormField label="Template Name" id="templateName" value={templateName} onChange={e => setTemplateName(e.target.value)} placeholder={`${vendorType} Requirements`} helperText="Give your template a descriptive name" />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description (Optional)
                  </label>
                  <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" rows={2} value={templateDescription} onChange={e => setTemplateDescription(e.target.value)} placeholder="Describe when this template should be used" />
                </div>
                <div className="flex items-start space-x-4">
                  <Button variant="primary" className="flex items-center" onClick={handleSaveTemplate} disabled={!templateName}>
                    <BookmarkIcon className="h-4 w-4 mr-2" /> Save Template
                  </Button>
                  {saveSuccess && <div className="flex items-center text-green-600 text-sm pt-2">
                      <CheckIcon className="h-4 w-4 mr-2" />
                      Template saved successfully!
                    </div>}
                </div>
              </div>
            </div>}
        </div>}

      <div className="bg-teal-50 p-4 rounded-md flex items-start mt-8">
        <InfoIcon className="h-5 w-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-teal-700">
          <p className="font-medium mb-1">Insurance Requirements Tip</p>
          <p>
            Setting clear insurance requirements helps protect your event from
            liability and ensures vendors understand their compliance
            obligations upfront.
          </p>
        </div>
      </div>
    </div>;
}