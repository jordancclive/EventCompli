import React, { useState } from 'react';
import { FormField } from '../ui/FormField';
import { Button } from '../ui/Button';
import { InfoIcon, SaveIcon, CheckCircleIcon, AlertCircleIcon, BookmarkIcon, CheckIcon } from 'lucide-react';
export function SaveAsTemplate({
  formData,
  vendorTypeInsuranceRequirements
}) {
  const [selectedVendorType, setSelectedVendorType] = useState(vendorTypeInsuranceRequirements.length > 0 ? 0 : null);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const handleSaveTemplate = () => {
    // In a real app, this would save the template to the database
    setSaveSuccess(true);
    setSaveError(false);
    // Reset after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
      setTemplateName('');
      setTemplateDescription('');
    }, 3000);
  };
  return <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Save Insurance Requirements as Templates
      </h2>
      <p className="text-gray-600 mb-6">
        Save the insurance requirements you've defined as templates for future
        use with other events.
      </p>
      <div className="bg-blue-50 p-4 rounded-md flex items-start mb-6">
        <InfoIcon className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-blue-700">
          <p className="font-medium mb-1">What are Vendor Type Templates?</p>
          <p>
            Templates allow you to reuse the same insurance requirements across
            different events. This saves time and ensures consistency in your
            compliance standards.
          </p>
        </div>
      </div>
      {vendorTypeInsuranceRequirements.length > 0 ? <>
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">
              Select Vendor Type to Save as Template
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              {vendorTypeInsuranceRequirements.map((item, index) => <button key={index} className={`p-4 border rounded-md text-left transition-colors ${selectedVendorType === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`} onClick={() => setSelectedVendorType(index)}>
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{item.vendorType}</h4>
                    {selectedVendorType === index && <CheckIcon className="h-5 w-5 text-blue-500" />}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.requirements.coiRequirements.cgl ? 'Includes CGL' : ''}
                    {item.requirements.coiRequirements.autoLiability ? ', Auto Liability' : ''}
                    {item.requirements.coiRequirements.workersComp ? ', Workers Comp' : ''}
                  </p>
                </button>)}
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="font-medium text-gray-900 mb-4">Template Details</h3>
            <div className="space-y-4">
              <FormField label="Template Name" id="templateName" value={templateName} onChange={e => setTemplateName(e.target.value)} placeholder="e.g., Standard Food Vendor Requirements" helperText="Give your template a descriptive name" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Optional)
                </label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" rows={3} value={templateDescription} onChange={e => setTemplateDescription(e.target.value)} placeholder="Describe when this template should be used" />
              </div>
              <div>
                <Button variant="outline" className="flex items-center" onClick={handleSaveTemplate} disabled={!templateName || selectedVendorType === null}>
                  <BookmarkIcon className="h-4 w-4 mr-2" /> Save as Template
                </Button>
                {saveSuccess && <div className="mt-3 flex items-center text-green-600 text-sm">
                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                    Template saved successfully!
                  </div>}
                {saveError && <div className="mt-3 flex items-center text-red-600 text-sm">
                    <AlertCircleIcon className="h-4 w-4 mr-2" />
                    Error saving template. Please try again.
                  </div>}
              </div>
            </div>
          </div>
        </> : <div className="text-center py-8 border border-gray-200 rounded-md">
          <AlertCircleIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Insurance Requirements Defined
          </h3>
          <p className="text-gray-600 mb-4 max-w-md mx-auto">
            You haven't defined any insurance requirements for your vendor types
            yet.
          </p>
        </div>}
      <div className="bg-gray-50 p-4 rounded-md mt-6">
        <h3 className="font-medium text-gray-900 mb-2">What's Next?</h3>
        <p className="text-sm text-gray-600">
          After saving your templates, you'll be able to quickly apply them to
          vendor types in future events, saving time and ensuring consistency in
          your compliance requirements.
        </p>
      </div>
    </div>;
}