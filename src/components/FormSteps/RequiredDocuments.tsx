import React, { useState } from 'react';
import { CheckIcon, PlusIcon, TrashIcon, HelpCircleIcon } from 'lucide-react';
import { Button } from '../ui/Button';
export function RequiredDocuments({
  formData,
  updateFormData
}) {
  const [customFormName, setCustomFormName] = useState('');
  const handleDocumentChange = (documentType, checked) => {
    updateFormData({
      requiredDocuments: {
        ...formData.requiredDocuments,
        [documentType]: checked
      }
    });
  };
  const addCustomForm = () => {
    if (customFormName.trim() === '') return;
    updateFormData({
      requiredDocuments: {
        ...formData.requiredDocuments,
        customForms: [...formData.requiredDocuments.customForms, {
          name: customFormName,
          id: Date.now().toString()
        }]
      }
    });
    setCustomFormName('');
  };
  const removeCustomForm = id => {
    updateFormData({
      requiredDocuments: {
        ...formData.requiredDocuments,
        customForms: formData.requiredDocuments.customForms.filter(form => form.id !== id)
      }
    });
  };
  return <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Required Documents
      </h2>
      <p className="text-gray-600 mb-6">
        Select which documents vendors of this type must submit.
      </p>
      <div className="space-y-4 mb-8">
        <div className="flex items-center p-4 border border-gray-200 rounded-md bg-white hover:bg-gray-50">
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="font-medium">Certificate of Insurance (COI)</h3>
              <div className="ml-2 relative group">
                <HelpCircleIcon className="h-4 w-4 text-gray-400 cursor-help" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-gray-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                  Proof of insurance coverage required for event participation
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Selecting this will enable insurance requirement settings
            </p>
          </div>
          <button className={`w-6 h-6 rounded-md flex items-center justify-center ${formData.requiredDocuments.coi ? 'bg-teal-500' : 'border border-gray-300'}`} onClick={() => handleDocumentChange('coi', !formData.requiredDocuments.coi)}>
            {formData.requiredDocuments.coi && <CheckIcon className="h-4 w-4 text-white" />}
          </button>
        </div>
        <div className="flex items-center p-4 border border-gray-200 rounded-md bg-white hover:bg-gray-50">
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="font-medium">W-9 Form</h3>
              <div className="ml-2 relative group">
                <HelpCircleIcon className="h-4 w-4 text-gray-400 cursor-help" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-gray-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                  Tax identification form required for payment processing
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Required for vendor payment processing
            </p>
          </div>
          <button className={`w-6 h-6 rounded-md flex items-center justify-center ${formData.requiredDocuments.w9 ? 'bg-teal-500' : 'border border-gray-300'}`} onClick={() => handleDocumentChange('w9', !formData.requiredDocuments.w9)}>
            {formData.requiredDocuments.w9 && <CheckIcon className="h-4 w-4 text-white" />}
          </button>
        </div>
        <div className="flex items-center p-4 border border-gray-200 rounded-md bg-white hover:bg-gray-50">
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="font-medium">Business License</h3>
              <div className="ml-2 relative group">
                <HelpCircleIcon className="h-4 w-4 text-gray-400 cursor-help" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-gray-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                  Local business permit required by many jurisdictions
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Local business permit or registration
            </p>
          </div>
          <button className={`w-6 h-6 rounded-md flex items-center justify-center ${formData.requiredDocuments.businessLicense ? 'bg-teal-500' : 'border border-gray-300'}`} onClick={() => handleDocumentChange('businessLicense', !formData.requiredDocuments.businessLicense)}>
            {formData.requiredDocuments.businessLicense && <CheckIcon className="h-4 w-4 text-white" />}
          </button>
        </div>
        <div className="flex items-center p-4 border border-gray-200 rounded-md bg-white hover:bg-gray-50">
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="font-medium">Health Permit</h3>
              <div className="ml-2 relative group">
                <HelpCircleIcon className="h-4 w-4 text-gray-400 cursor-help" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-gray-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                  Required for food vendors in most jurisdictions
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Required for food and beverage vendors
            </p>
          </div>
          <button className={`w-6 h-6 rounded-md flex items-center justify-center ${formData.requiredDocuments.healthPermit ? 'bg-teal-500' : 'border border-gray-300'}`} onClick={() => handleDocumentChange('healthPermit', !formData.requiredDocuments.healthPermit)}>
            {formData.requiredDocuments.healthPermit && <CheckIcon className="h-4 w-4 text-white" />}
          </button>
        </div>
      </div>
      <h3 className="font-medium text-gray-800 mb-3">Custom Forms</h3>
      <div className="space-y-3 mb-4">
        {formData.requiredDocuments.customForms.map(form => <div key={form.id} className="flex items-center p-3 border border-gray-200 rounded-md bg-white">
            <div className="flex-1">
              <p className="text-sm font-medium">{form.name}</p>
            </div>
            <button className="text-gray-400 hover:text-red-500" onClick={() => removeCustomForm(form.id)}>
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>)}
      </div>
      <div className="flex gap-2 mb-6">
        <input type="text" value={customFormName} onChange={e => setCustomFormName(e.target.value)} placeholder="Custom form name" className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
        <Button variant="outline" className="flex items-center" onClick={addCustomForm} disabled={customFormName.trim() === ''}>
          <PlusIcon className="h-4 w-4 mr-1" /> Add
        </Button>
      </div>
    </div>;
}