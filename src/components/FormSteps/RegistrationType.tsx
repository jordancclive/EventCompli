import React from 'react';
import { LockIcon, GlobeIcon, InfoIcon } from 'lucide-react';
export function RegistrationType({
  formData,
  updateFormData
}) {
  const handleRegistrationTypeChange = type => {
    updateFormData({
      registrationType: type
    });
  };
  return <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Registration Type
      </h2>
      <p className="text-gray-600 mb-6">
        Choose how vendors will register for your event.
      </p>
      <div className="space-y-4">
        <div className={`border rounded-lg p-4 cursor-pointer transition-all ${formData.registrationType === 'invite' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => handleRegistrationTypeChange('invite')}>
          <div className="flex items-center">
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${formData.registrationType === 'invite' ? 'border-teal-500' : 'border-gray-300'}`}>
              {formData.registrationType === 'invite' && <div className="w-3 h-3 rounded-full bg-teal-500"></div>}
            </div>
            <div className="flex items-center">
              <LockIcon className="h-5 w-5 text-gray-700 mr-2" />
              <span className="font-medium text-gray-900">Invite Only</span>
            </div>
          </div>
          <div className="ml-8 mt-2">
            <p className="text-sm text-gray-600">
              You'll manually invite vendors by email. Only invited vendors can
              register.
            </p>
            <div className="mt-3 bg-gray-100 p-3 rounded-md">
              <h4 className="text-sm font-medium text-gray-800 mb-1">
                Best for:
              </h4>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>Curated events with pre-selected vendors</li>
                <li>Events with limited space and high demand</li>
                <li>When you want complete control over who can apply</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={`border rounded-lg p-4 cursor-pointer transition-all ${formData.registrationType === 'open' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => handleRegistrationTypeChange('open')}>
          <div className="flex items-center">
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${formData.registrationType === 'open' ? 'border-teal-500' : 'border-gray-300'}`}>
              {formData.registrationType === 'open' && <div className="w-3 h-3 rounded-full bg-teal-500"></div>}
            </div>
            <div className="flex items-center">
              <GlobeIcon className="h-5 w-5 text-gray-700 mr-2" />
              <span className="font-medium text-gray-900">
                Open Registration
              </span>
            </div>
          </div>
          <div className="ml-8 mt-2">
            <p className="text-sm text-gray-600">
              Anyone with the portal link can apply. You can still review and
              approve each vendor.
            </p>
            <div className="mt-3 bg-gray-100 p-3 rounded-md">
              <h4 className="text-sm font-medium text-gray-800 mb-1">
                Best for:
              </h4>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>Larger events accepting new vendors</li>
                <li>Farmers markets and community events</li>
                <li>When you want to streamline the application process</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-md flex items-start mt-6">
          <InfoIcon className="h-5 w-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-yellow-700">
            <strong>Note:</strong> You can switch between registration types
            later, but it's best to decide before inviting vendors or sharing
            your portal link.
          </p>
        </div>
      </div>
    </div>;
}