import React, { useEffect, useState } from 'react';
import { FormField } from '../ui/FormField';
import { Button } from '../ui/Button';
import { InfoIcon, SaveIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
export function TemplateManagement({
  formData,
  updateFormData
}) {
  const [templates, setTemplates] = useState([{
    id: '1',
    name: 'Standard Food Vendor',
    description: 'Default requirements for food vendors'
  }, {
    id: '2',
    name: 'Craft Vendor - Basic',
    description: 'Minimal requirements for craft vendors'
  }, {
    id: '3',
    name: 'Alcohol Vendor',
    description: 'Enhanced requirements for alcohol vendors'
  }]);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const handleTemplateNameChange = e => {
    updateFormData({
      templateName: e.target.value
    });
  };
  const selectTemplate = templateId => {
    // In a real app, this would load the template data from the server
    const selected = templates.find(t => t.id === templateId);
    if (selected) {
      updateFormData({
        selectedTemplate: templateId,
        templateName: `Copy of ${selected.name}`
      });
      // Simulate loading template data
      // In a real app, this would set all the insurance requirements based on the template
    }
  };
  const saveAsTemplate = () => {
    // In a real app, this would save the template to the server
    setSaveSuccess(true);
    setSaveError(false);
    // Add the new template to the list (simulated)
    const newTemplate = {
      id: Date.now().toString(),
      name: formData.templateName,
      description: 'Custom template'
    };
    setTemplates([...templates, newTemplate]);
    // Reset after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };
  return <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Template Management
      </h2>
      <p className="text-gray-600 mb-6">
        Save these requirements as a template or load from an existing template.
      </p>
      <div className="bg-teal-50 p-4 rounded-md flex items-start mb-6">
        <InfoIcon className="h-5 w-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-teal-700">
          <p>
            <strong>Templates vs. Vendor Types:</strong> Templates are reusable
            insurance configurations that can be applied to multiple vendor
            types. Vendor types are specific to each event.
          </p>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="font-medium text-gray-900 mb-3">Load from Template</h3>
        <p className="text-sm text-gray-600 mb-4">
          Select an existing template to apply its requirements to this vendor
          type.
        </p>
        <div className="space-y-3">
          {templates.map(template => <button key={template.id} className={`w-full text-left p-4 border rounded-md transition-colors ${formData.selectedTemplate === template.id ? 'border-teal-500 bg-teal-50' : 'border-gray-200 bg-white hover:bg-gray-50'}`} onClick={() => selectTemplate(template.id)}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{template.name}</h4>
                  <p className="text-sm text-gray-600">
                    {template.description}
                  </p>
                </div>
                {formData.selectedTemplate === template.id && <CheckCircleIcon className="h-5 w-5 text-teal-500" />}
              </div>
            </button>)}
        </div>
      </div>
      <div className="mb-8 border-t border-gray-200 pt-8">
        <h3 className="font-medium text-gray-900 mb-3">Save as Template</h3>
        <p className="text-sm text-gray-600 mb-4">
          Save the current insurance requirements as a template for future use.
        </p>
        <FormField label="Template Name" id="templateName" name="templateName" value={formData.templateName} onChange={handleTemplateNameChange} placeholder="e.g., Food Vendor - Premium" helperText="Give your template a descriptive name" />
        <div className="mt-4">
          <Button variant="outline" className="flex items-center" onClick={saveAsTemplate} disabled={!formData.templateName}>
            <SaveIcon className="h-4 w-4 mr-2" /> Save as Template
          </Button>
          {saveSuccess && <div className="mt-3 flex items-center text-teal-600 text-sm">
              <CheckCircleIcon className="h-4 w-4 mr-2" />
              Template saved successfully!
            </div>}
          {saveError && <div className="mt-3 flex items-center text-red-600 text-sm">
              <AlertCircleIcon className="h-4 w-4 mr-2" />
              Error saving template. Please try again.
            </div>}
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="font-medium text-gray-900 mb-2">Next Steps</h3>
        <p className="text-sm text-gray-600">
          After creating this vendor type, you'll be able to assign it to events
          and automatically check vendor compliance against these requirements.
        </p>
      </div>
    </div>;
}