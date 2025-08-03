import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon, UsersIcon, SettingsIcon, FileTextIcon } from 'lucide-react';
import { Button } from '../ui/Button';
export function NextSteps({
  formData
}) {
  return <div className="text-center">
      <div className="mb-6">
        <div className="flex justify-center mb-2">
          <img src="/CompliBot.png" alt="CompliBot" className="h-16 w-16" />
        </div>
        <CheckCircleIcon className="h-10 w-10 text-teal-500 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-900 mt-4">
          Event Created Successfully!
        </h2>
        <p className="text-gray-600 mt-2">
          "{formData.eventName}" has been set up and is ready for the next
          steps.
        </p>
      </div>
      <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="font-medium text-gray-900 mb-4">
          What would you like to do next?
        </h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-teal-100 p-2 rounded-md mr-4">
              <UsersIcon className="h-5 w-5 text-teal-600" />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-gray-900">Invite Vendors</h4>
              <p className="text-sm text-gray-600">
                Send invitations to vendors to join your event
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-teal-100 p-2 rounded-md mr-4">
              <FileTextIcon className="h-5 w-5 text-teal-600" />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-gray-900">
                View Vendor Applications
              </h4>
              <p className="text-sm text-gray-600">
                Review and manage vendor applications as they come in
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-teal-100 p-2 rounded-md mr-4">
              <SettingsIcon className="h-5 w-5 text-teal-600" />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-gray-900">Customize Portal</h4>
              <p className="text-sm text-gray-600">
                Personalize the registration experience for vendors
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <Link to={`/invite-vendors/${formData.eventName}`}>
          <Button variant="primary">Invite Vendors</Button>
        </Link>
        <Button variant="outline">View Applications</Button>
        <Button variant="outline">Customize Portal</Button>
      </div>
    </div>;
}