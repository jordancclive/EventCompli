import React, { useEffect, useState } from 'react';
import { ClipboardCopyIcon, ExternalLinkIcon, PencilIcon, ImageIcon, CheckIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { FormField } from '../ui/FormField';
export function PortalPreview({
  formData,
  updateFormData
}) {
  const [customizing, setCustomizing] = useState(false);
  const [portalSettings, setPortalSettings] = useState({
    headerColor: '#0f766e',
    accentColor: '#0284c7',
    welcomeMessage: '',
    showVendorProgress: true,
    showEventDetails: true,
    showVendorLimits: true,
    showInsuranceRequirements: true,
    logoUrl: ''
  });
  // Generate a URL-friendly version of the event name
  useEffect(() => {
    if (formData.eventName && !formData.portalUrl) {
      const urlSlug = formData.eventName.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      updateFormData({
        portalUrl: urlSlug
      });
    }
  }, [formData.eventName, formData.portalUrl]);
  useEffect(() => {
    // Set default welcome message based on event name
    if (formData.eventName && !portalSettings.welcomeMessage) {
      setPortalSettings({
        ...portalSettings,
        welcomeMessage: `Welcome to the vendor registration portal for ${formData.eventName}. Please complete all required steps to secure your spot.`
      });
    }
    // Set logo URL if event image exists
    if (formData.eventImage && !portalSettings.logoUrl) {
      setPortalSettings({
        ...portalSettings,
        logoUrl: formData.eventImage
      });
    }
  }, [formData.eventName, formData.eventImage]);
  const handleUrlChange = e => {
    updateFormData({
      portalUrl: e.target.value
    });
  };
  const handleSettingChange = (setting, value) => {
    setPortalSettings({
      ...portalSettings,
      [setting]: value
    });
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`eventcompli.com/portal/${formData.portalUrl}`);
    // In a real app, you would show a toast notification here
  };
  const toggleCustomizing = () => {
    setCustomizing(!customizing);
  };
  const currentYear = new Date().getFullYear();
  return <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Vendor Portal Preview
      </h2>
      <p className="text-gray-600 mb-6">
        Preview how your vendor registration portal will look and customize its
        appearance.
      </p>
      <div className="mb-6 flex justify-end">
        <Button variant={customizing ? 'primary' : 'outline'} className="flex items-center" onClick={toggleCustomizing}>
          {customizing ? <>
              <CheckIcon className="h-4 w-4 mr-2" />
              Done Customizing
            </> : <>
              <PencilIcon className="h-4 w-4 mr-2" />
              Customize Portal
            </>}
        </Button>
      </div>
      {customizing ? <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
          <h3 className="font-medium text-gray-900 mb-4">
            Portal Customization
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Welcome Message
              </label>
              <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" rows={3} value={portalSettings.welcomeMessage} onChange={e => handleSettingChange('welcomeMessage', e.target.value)} placeholder="Enter a welcome message for vendors" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Header Color
                </label>
                <div className="flex">
                  <input type="color" value={portalSettings.headerColor} onChange={e => handleSettingChange('headerColor', e.target.value)} className="h-10 w-10 border border-gray-300 rounded-l-md" />
                  <input type="text" value={portalSettings.headerColor} onChange={e => handleSettingChange('headerColor', e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 border-l-0 rounded-r-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Accent Color
                </label>
                <div className="flex">
                  <input type="color" value={portalSettings.accentColor} onChange={e => handleSettingChange('accentColor', e.target.value)} className="h-10 w-10 border border-gray-300 rounded-l-md" />
                  <input type="text" value={portalSettings.accentColor} onChange={e => handleSettingChange('accentColor', e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 border-l-0 rounded-r-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Logo (Optional)
              </label>
              <div className="flex items-center">
                <button className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-l-md bg-gray-50">
                  <ImageIcon className="h-5 w-5 text-gray-400" />
                </button>
                <input type="text" value={portalSettings.logoUrl} onChange={e => handleSettingChange('logoUrl', e.target.value)} placeholder="Enter logo URL or upload image" className="flex-1 px-3 py-2 border border-gray-300 border-l-0 rounded-r-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Recommended size: 200x200 pixels, PNG or JPG format
              </p>
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Portal Content
              </label>
              <div className="flex items-center">
                <input type="checkbox" id="showVendorProgress" checked={portalSettings.showVendorProgress} onChange={e => handleSettingChange('showVendorProgress', e.target.checked)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="showVendorProgress" className="ml-2 block text-sm text-gray-700">
                  Show vendor registration progress
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="showEventDetails" checked={portalSettings.showEventDetails} onChange={e => handleSettingChange('showEventDetails', e.target.checked)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="showEventDetails" className="ml-2 block text-sm text-gray-700">
                  Show event details (date, location)
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="showVendorLimits" checked={portalSettings.showVendorLimits} onChange={e => handleSettingChange('showVendorLimits', e.target.checked)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="showVendorLimits" className="ml-2 block text-sm text-gray-700">
                  Show vendor type limits
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="showInsuranceRequirements" checked={portalSettings.showInsuranceRequirements} onChange={e => handleSettingChange('showInsuranceRequirements', e.target.checked)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="showInsuranceRequirements" className="ml-2 block text-sm text-gray-700">
                  Show insurance requirements summary
                </label>
              </div>
            </div>
          </div>
        </div> : <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8 overflow-hidden" style={{
      maxHeight: '500px'
    }}>
          <div className="overflow-y-auto max-h-[460px] pr-2">
            {/* Header */}
            <div className="px-6 py-4 -mx-6 -mt-6 mb-6 flex items-center sticky top-0 z-10" style={{
          backgroundColor: portalSettings.headerColor
        }}>
              <div className="flex items-center">
                {portalSettings.logoUrl ? <img src={portalSettings.logoUrl} alt="Event Logo" className="h-10 w-10 mr-3 rounded-md object-cover" /> : <img src="/CompliBot.png" alt="EventCompli" className="h-10 w-10 mr-3" />}
                <h3 className="text-lg font-medium text-white">
                  {formData.eventName || 'Your Event'}
                </h3>
              </div>
            </div>
            {/* Welcome Message */}
            {portalSettings.welcomeMessage && <div className="mb-6">
                <p className="text-gray-700">{portalSettings.welcomeMessage}</p>
              </div>}
            {/* Progress Indicator */}
            {portalSettings.showVendorProgress && <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Registration Progress
                </h4>
                <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{
              width: '30%',
              backgroundColor: portalSettings.accentColor
            }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Step 1: Basic Info</span>
                  <span>30% Complete</span>
                </div>
              </div>}
            {/* Event Details */}
            {portalSettings.showEventDetails && <div className="flex flex-col sm:flex-row gap-2 text-sm text-gray-600 mb-6">
                {formData.eventDates && <div className="flex items-center">
                    <span className="mr-2">📅</span>
                    <span>{formData.eventDates}</span>
                  </div>}
                {formData.location && <div className="flex items-center">
                    <span className="mr-2">📍</span>
                    <span>{formData.location}</span>
                  </div>}
              </div>}
            {/* Registration Type */}
            <div className="mb-6 p-4 bg-white border border-gray-200 rounded-md">
              <p className="text-sm text-gray-600 mb-2">Registration Type:</p>
              <p className="font-medium">
                {formData.registrationType === 'invite' ? '🔒 Invite Only' : '🌐 Open Registration'}
              </p>
            </div>
            {/* Vendor Limits */}
            {portalSettings.showVendorLimits && formData.vendorCaps && formData.vendorCaps.length > 0 && <div className="mb-6 p-4 bg-white border border-gray-200 rounded-md">
                  <p className="text-sm text-gray-600 mb-2">
                    Vendor Opportunities:
                  </p>
                  <div className="space-y-2">
                    {formData.vendorCaps.map((cap, index) => <div key={index} className="flex justify-between items-center">
                        <span className="text-sm font-medium">{cap.type}</span>
                        <div className="flex items-center">
                          {cap.maxCount ? <>
                              <span className="text-sm text-gray-600 mr-2">
                                {cap.maxCount} spots
                              </span>
                              <div className="w-24 bg-gray-200 h-2 rounded-full overflow-hidden">
                                <div className="h-full rounded-full" style={{
                      width: '25%',
                      backgroundColor: portalSettings.accentColor
                    }}></div>
                              </div>
                              <span className="text-xs text-gray-500 ml-2">
                                25% filled
                              </span>
                            </> : <span className="text-sm text-gray-600">
                              Unlimited spots
                            </span>}
                        </div>
                      </div>)}
                  </div>
                </div>}
            {/* Insurance Requirements Summary */}
            {portalSettings.showInsuranceRequirements && formData.vendorTypeInsuranceRequirements && formData.vendorTypeInsuranceRequirements.length > 0 && <div className="mb-6 p-4 bg-white border border-gray-200 rounded-md">
                  <p className="text-sm text-gray-600 mb-3">
                    Insurance Requirements:
                  </p>
                  <div className="space-y-4">
                    {formData.vendorTypeInsuranceRequirements.map((item, index) => <div key={index} className="border-t border-gray-100 pt-3 first:border-0 first:pt-0">
                          <h5 className="text-sm font-medium mb-1">
                            {item.vendorType}
                          </h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {item.requirements.requiredDocuments.coi && <li>• Certificate of Insurance required</li>}
                            {item.requirements.coiRequirements.cgl && <li>
                                • Commercial General Liability: $
                                {parseInt(item.requirements.cglLimits.eachOccurrence || 0).toLocaleString()}{' '}
                                per occurrence
                              </li>}
                            {item.requirements.coiRequirements.autoLiability && <li>
                                • Automobile Liability: $
                                {parseInt(item.requirements.autoLiabilityDetails.limit || 0).toLocaleString()}
                              </li>}
                            {item.requirements.requiredDocuments.w9 && <li>• W-9 Form required</li>}
                          </ul>
                        </div>)}
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Full requirements will be displayed during the application
                    process.
                  </p>
                </div>}
            {/* Sample Form */}
            <div className="mb-6 p-4 bg-white border border-gray-200 rounded-md">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Vendor Information
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Business Name
                  </label>
                  <div className="border border-gray-300 rounded-md h-9 bg-gray-50"></div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Vendor Type
                  </label>
                  <div className="border border-gray-300 rounded-md h-9 bg-gray-50"></div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Contact Email
                  </label>
                  <div className="border border-gray-300 rounded-md h-9 bg-gray-50"></div>
                </div>
              </div>
              <div className="mt-4">
                <button className="px-4 py-2 text-sm font-medium text-white rounded-md" style={{
              backgroundColor: portalSettings.accentColor
            }}>
                  Begin Application
                </button>
              </div>
            </div>
            {/* Required Document Upload Section */}
            <div className="mb-6 p-4 bg-white border border-gray-200 rounded-md">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Required Documents
              </h4>
              {formData.insuranceRequirements.requiredDocuments.w9 && <div className="mb-4 pb-4 border-b border-gray-100">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    W-9 Form
                  </label>
                  <div className="flex items-center justify-center w-full h-20 px-4 transition bg-gray-50 border-2 border-gray-200 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-300">
                    <span className="flex items-center space-x-2">
                      <ImageIcon className="w-5 h-5 text-gray-400" />
                      <span className="font-medium text-gray-500 text-sm">
                        Drop files to upload or Browse
                      </span>
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Upload your completed W-9 form (PDF format preferred)
                  </p>
                </div>}
              {formData.insuranceRequirements.requiredDocuments.coi && <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Certificate of Insurance
                  </label>
                  <div className="flex items-center justify-center w-full h-20 px-4 transition bg-gray-50 border-2 border-gray-200 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-300">
                    <span className="flex items-center space-x-2">
                      <ImageIcon className="w-5 h-5 text-gray-400" />
                      <span className="font-medium text-gray-500 text-sm">
                        Drop files to upload or Browse
                      </span>
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Upload your Certificate of Insurance (PDF format)
                  </p>
                </div>}
            </div>
            {/* Additional Information */}
            <div className="mb-6 p-4 bg-white border border-gray-200 rounded-md">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Additional Information
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Please review the following important information before
                applying:
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  • Applications are reviewed in the order they are received
                </p>
                <p>
                  • You will receive an email confirmation once your application
                  is submitted
                </p>
                <p>
                  • All vendors must comply with the insurance requirements for
                  their vendor type
                </p>
                <p>
                  • Questions? Contact the event organizer at
                  organizer@eventcompli.com
                </p>
              </div>
            </div>
            {/* Footer */}
            <div className="text-xs text-center text-gray-500 mt-8 pt-4 border-t border-gray-200">
              <p>Powered by EventCompli</p>
              <p className="mt-1">© {currentYear} All Rights Reserved</p>
            </div>
          </div>
        </div>}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Portal URL
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
            eventcompli.com/portal/
          </span>
          <input type="text" value={formData.portalUrl} onChange={handleUrlChange} className="flex-1 min-w-0 block w-full px-3 py-2 border border-gray-300 rounded-none rounded-r-md focus:ring-teal-500 focus:border-teal-500" />
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" className="flex items-center" onClick={copyToClipboard}>
          <ClipboardCopyIcon className="h-4 w-4 mr-2" />
          Copy URL
        </Button>
        <Button variant="outline" className="flex items-center" disabled>
          <ExternalLinkIcon className="h-4 w-4 mr-2" />
          Preview Portal
        </Button>
      </div>
    </div>;
}