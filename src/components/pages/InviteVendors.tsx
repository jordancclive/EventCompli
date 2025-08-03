import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UsersIcon, PlusIcon, UploadIcon, MailIcon, XIcon, CheckIcon, AlertCircleIcon, ArrowLeftIcon, FileTextIcon, CircleIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { FormField } from '../ui/FormField';
import { VerticalStepIndicator } from '../ui/VerticalStepIndicator';
export function InviteVendors() {
  const {
    eventId
  } = useParams();
  const [tab, setTab] = useState('manual');
  const [emailList, setEmailList] = useState('');
  const [manualEmails, setManualEmails] = useState([{
    email: '',
    name: '',
    type: ''
  }]);
  const [isPreview, setIsPreview] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  // Sample vendor types for dropdown
  const vendorTypes = ['Food Trucks', 'Craft Vendors', 'Retail Vendors', 'Service Providers', 'Sponsors', 'Entertainment'];
  const steps = [{
    number: 1,
    title: 'Vendor List'
  }, {
    number: 2,
    title: 'Customize Message'
  }, {
    number: 3,
    title: 'Preview & Send'
  }, {
    number: 4,
    title: 'Confirmation'
  }];
  const addManualEmail = () => {
    setManualEmails([...manualEmails, {
      email: '',
      name: '',
      type: ''
    }]);
  };
  const removeManualEmail = index => {
    const updatedEmails = [...manualEmails];
    updatedEmails.splice(index, 1);
    setManualEmails(updatedEmails);
  };
  const updateManualEmail = (index, field, value) => {
    const updatedEmails = [...manualEmails];
    updatedEmails[index][field] = value;
    setManualEmails(updatedEmails);
  };
  const handleSendInvites = () => {
    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      // Reset form after success
      setTimeout(() => {
        setSendSuccess(false);
        setIsPreview(false);
        setEmailList('');
        setManualEmails([{
          email: '',
          name: '',
          type: ''
        }]);
        setCustomMessage('');
      }, 3000);
    }, 1500);
  };
  const parseEmailList = () => {
    if (!emailList) return [];
    return emailList.split('\n').map(line => line.trim()).filter(line => line.includes('@')).map(email => ({
      email,
      name: '',
      type: ''
    }));
  };
  const getTotalEmails = () => {
    if (tab === 'manual') {
      return manualEmails.filter(item => item.email.includes('@')).length;
    } else {
      return parseEmailList().length;
    }
  };
  const goToStep = stepNumber => {
    // Only allow clicking on completed steps or the next available step
    if (stepNumber < currentStep || stepNumber === currentStep) {
      setCurrentStep(stepNumber);
    }
  };
  const renderInviteForm = () => {
    if (isPreview) {
      return <div className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Preview Invitation
            </h2>
            <Button variant="outline" onClick={() => setIsPreview(false)} className="flex items-center">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Edit
            </Button>
          </div>
          <div className="border rounded-lg p-6 mb-6">
            <div className="mb-4 pb-4 border-b border-gray-200">
              <div className="text-sm text-gray-500">
                From: EventCompli &lt;noreply@eventcompli.com&gt;
              </div>
              <div className="text-sm text-gray-500">
                To: {tab === 'manual' ? manualEmails[0].email : 'Vendor Email'}
              </div>
              <div className="text-sm text-gray-500">
                Subject: You're invited to register for {eventId}
              </div>
            </div>
            <div className="prose max-w-none">
              <p>
                Hello{' '}
                {tab === 'manual' && manualEmails[0].name ? manualEmails[0].name : 'Vendor'}
                ,
              </p>
              <p>
                You've been invited to register as a vendor for{' '}
                <strong>{eventId}</strong>.
              </p>
              {customMessage && <div className="my-4 p-4 bg-gray-50 rounded-md">
                  <p>{customMessage}</p>
                </div>}
              <p>
                Please click the button below to complete your registration and
                submit required documentation:
              </p>
              <div className="my-6 text-center">
                <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md">
                  Register for {eventId}
                </button>
              </div>
              <p>
                If you have any questions, please contact the event organizer.
              </p>
              <p>
                Thank you,
                <br />
                The {eventId} Team
              </p>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-md flex items-start mb-6">
            <AlertCircleIcon className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">
                About to send {getTotalEmails()} invitation
                {getTotalEmails() !== 1 ? 's' : ''}
              </p>
              <p>
                This will send email invitations to all vendors on your list.
                Each vendor will receive a unique registration link.
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="primary" className="flex items-center" onClick={handleSendInvites} disabled={isSending || sendSuccess}>
              {isSending ? <>Sending...</> : sendSuccess ? <>
                  <CheckIcon className="h-4 w-4 mr-2" />
                  Invitations Sent!
                </> : <>
                  <MailIcon className="h-4 w-4 mr-2" />
                  Send {getTotalEmails()} Invitation
                  {getTotalEmails() !== 1 ? 's' : ''}
                </>}
            </Button>
          </div>
        </div>;
    }
    return <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Invite Vendors to {eventId}
        </h2>
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button className={`px-4 py-2 font-medium text-sm ${tab === 'manual' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setTab('manual')}>
              Add Vendors Manually
            </button>
            <button className={`px-4 py-2 font-medium text-sm ${tab === 'bulk' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setTab('bulk')}>
              Bulk Import
            </button>
          </div>
        </div>
        {tab === 'manual' ? <div>
            <div className="space-y-4 mb-6">
              {manualEmails.map((item, index) => <div key={index} className="grid grid-cols-12 gap-3">
                  <div className="col-span-5">
                    {index === 0 && <label className="block text-sm font-medium text-gray-700 mb-1">
                        Vendor Email
                      </label>}
                    <input type="email" value={item.email} onChange={e => updateManualEmail(index, 'email', e.target.value)} placeholder="email@example.com" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div className="col-span-3">
                    {index === 0 && <label className="block text-sm font-medium text-gray-700 mb-1">
                        Vendor Name (Optional)
                      </label>}
                    <input type="text" value={item.name} onChange={e => updateManualEmail(index, 'name', e.target.value)} placeholder="Business Name" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div className="col-span-3">
                    {index === 0 && <label className="block text-sm font-medium text-gray-700 mb-1">
                        Vendor Type
                      </label>}
                    <select value={item.type} onChange={e => updateManualEmail(index, 'type', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Select vendor type...</option>
                      {vendorTypes.map(type => <option key={type} value={type}>
                          {type}
                        </option>)}
                    </select>
                  </div>
                  <div className="col-span-1 flex items-center">
                    {index === 0 && <div className="h-6 mb-1"></div>}
                    {manualEmails.length > 1 && <button className="p-2 text-gray-400 hover:text-red-500" onClick={() => removeManualEmail(index)}>
                        <XIcon className="h-5 w-5" />
                      </button>}
                  </div>
                </div>)}
            </div>
            <Button variant="outline" onClick={addManualEmail} className="flex items-center mb-6">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Another Vendor
            </Button>
          </div> : <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Paste Email Addresses
            </label>
            <p className="text-sm text-gray-500 mb-2">
              One email address per line. You can copy and paste from a
              spreadsheet.
            </p>
            <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" rows={6} value={emailList} onChange={e => setEmailList(e.target.value)} placeholder="email1@example.com&#10;email2@example.com&#10;email3@example.com" />
            <div className="mt-4 flex items-center">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Vendor Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select vendor type...</option>
                  {vendorTypes.map(type => <option key={type} value={type}>
                      {type}
                    </option>)}
                </select>
              </div>
              <div className="ml-4 self-end">
                <Button variant="outline" className="flex items-center">
                  <UploadIcon className="h-4 w-4 mr-2" />
                  Upload CSV
                </Button>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              {parseEmailList().length > 0 ? <p>Found {parseEmailList().length} email addresses</p> : <p>No valid email addresses found</p>}
            </div>
          </div>}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h3 className="font-medium text-gray-900 mb-2">
            Customized Message (Optional)
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Add a personalized message to your invitation email.
          </p>
          <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" rows={4} value={customMessage} onChange={e => setCustomMessage(e.target.value)} placeholder="Enter any additional information you'd like to share with your vendors..." />
        </div>
        <div className="flex justify-between">
          <Link to="/dashboard">
            <Button variant="outline" className="flex items-center">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Events
            </Button>
          </Link>
          <Button variant="primary" className="flex items-center" onClick={() => setIsPreview(true)} disabled={getTotalEmails() === 0}>
            <MailIcon className="h-4 w-4 mr-2" />
            Preview & Send
          </Button>
        </div>
      </div>;
  };
  return <div className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-72 bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            Invite Vendors
          </h1>
          <VerticalStepIndicator steps={steps} currentStep={currentStep} onStepClick={goToStep} />
        </div>
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md p-8">
            {renderInviteForm()}
          </div>
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h3 className="font-medium text-gray-900 mb-4">About This Event</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-500">Event:</span>
                <span className="font-medium text-gray-900 ml-2">
                  {eventId}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Date:</span>
                <span className="font-medium text-gray-900 ml-2">
                  June 15-17, 2023
                </span>
              </div>
              <div>
                <span className="text-gray-500">Location:</span>
                <span className="font-medium text-gray-900 ml-2">
                  Central Park, New York
                </span>
              </div>
              <div>
                <span className="text-gray-500">Registration:</span>
                <span className="font-medium text-gray-900 ml-2">
                  Invite Only
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h3 className="font-medium text-gray-900 mb-4">
              Tips for Inviting Vendors
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <CircleIcon className="h-2 w-2 text-gray-400 mr-2 mt-1.5" />
                <span>
                  Personalize your message with specific event details
                </span>
              </li>
              <li className="flex items-start">
                <CircleIcon className="h-2 w-2 text-gray-400 mr-2 mt-1.5" />
                <span>Include important deadlines and requirements</span>
              </li>
              <li className="flex items-start">
                <CircleIcon className="h-2 w-2 text-gray-400 mr-2 mt-1.5" />
                <span>
                  Specify vendor types to streamline the registration process
                </span>
              </li>
              <li className="flex items-start">
                <CircleIcon className="h-2 w-2 text-gray-400 mr-2 mt-1.5" />
                <span>Follow up with vendors who haven't responded</span>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Button variant="outline" className="w-full flex items-center justify-center">
                <FileTextIcon className="h-4 w-4 mr-2" />
                View Vendor Portal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>;
}