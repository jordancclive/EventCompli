import React from 'react';
import { FormField } from '../ui/FormField';
import { Switch } from '../ui/Switch';
import { InfoIcon } from 'lucide-react';
export function VendorTypeBasics({
  formData,
  updateFormData
}) {
  const handleChange = e => {
    updateFormData({
      [e.target.name]: e.target.value
    });
  };
  const handleSwitchChange = checked => {
    updateFormData({
      showOnPortal: checked
    });
  };
  return <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Vendor Type Basics
      </h2>
      <p className="text-gray-600 mb-6">
        Define the basic information for this vendor type.
      </p>
      <div className="space-y-6">
        <FormField label="Vendor Type Name" id="vendorTypeName" name="vendorTypeName" required value={formData.vendorTypeName} onChange={handleChange} placeholder="e.g., Food Vendors, Craft Vendors, etc." helperText="This name will be used to categorize vendors in your event" />
        <div className="flex items-center justify-between border-t border-gray-200 pt-6">
          <div>
            <label htmlFor="showOnPortal" className="text-sm font-medium text-gray-700">
              Show on Vendor Portal
            </label>
            <p className="text-sm text-gray-500">
              When enabled, vendors can select this vendor type during
              registration
            </p>
          </div>
          <Switch id="showOnPortal" checked={formData.showOnPortal} onCheckedChange={handleSwitchChange} />
        </div>
      </div>
      <div className="bg-teal-50 p-4 rounded-md flex items-start mt-8">
        <InfoIcon className="h-5 w-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-teal-700">
          <p className="font-medium mb-1">Important Note</p>
          <p>
            Once created, vendor types cannot be deleted - only hidden from the
            portal. This ensures historical vendor compliance data is preserved.
          </p>
        </div>
      </div>
    </div>;
}