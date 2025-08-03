import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon, UploadIcon, FileTextIcon, ArrowRightIcon, InfoIcon, CheckIcon, FileIcon, XIcon, AlertCircleIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { FormField } from '../ui/FormField';
export function VendorRegistration() {
  const {
    eventId
  } = useParams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    vendorType: '',
    description: '',
    acceptTerms: false
  });
  const [documents, setDocuments] = useState({
    coi: null,
    w9: null,
    agreement: null,
    healthPermit: null
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPrivateEvent, setIsPrivateEvent] = useState(true);
  const [validInvite, setValidInvite] = useState(true);
  const [emailValidated, setEmailValidated] = useState(false);
  // Sample vendor types
  const vendorTypes = [{
    id: 'food',
    name: 'Food Vendor',
    requiresHealthPermit: true
  }, {
    id: 'craft',
    name: 'Craft Vendor',
    requiresHealthPermit: false
  }, {
    id: 'retail',
    name: 'Retail Vendor',
    requiresHealthPermit: false
  }, {
    id: 'service',
    name: 'Service Provider',
    requiresHealthPermit: false
  }];
  // Get selected vendor type object
  const selectedVendorType = vendorTypes.find(vt => vt.id === formData.vendorType);
  const handleChange = e => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  const handleFileUpload = (type, e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        setDocuments({
          ...documents,
          [type]: {
            name: file.name,
            size: file.size,
            type: file.type,
            url: URL.createObjectURL(file)
          }
        });
        setIsUploading(false);
      }, 1000);
    }
  };
  const removeFile = type => {
    setDocuments({
      ...documents,
      [type]: null
    });
  };
  const validateEmail = () => {
    // Simulate email validation for invite-only events
    setEmailValidated(true);
  };
  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };
  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmitted(true);
  };
  // For demo: Check if required documents are uploaded
  const requiredDocumentsUploaded = () => {
    // Always require COI and W9
    const required = ['coi', 'w9'];
    // Add health permit if vendor type requires it
    if (selectedVendorType?.requiresHealthPermit) {
      required.push('healthPermit');
    }
    return required.every(docType => documents[docType] !== null);
  };
  // Render email validation step for private events
  if (isPrivateEvent && !emailValidated && step === 1) {
    return <div className="flex-1 px-6">
      <div className="container mx-auto py-8 max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-6">
            <img src="/CompliBot.png" alt="EventCompli" className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{eventId}</h1>
            <p className="text-gray-600">
              This is a private event. Please enter your email to verify your
              invitation.
            </p>
          </div>
          {!validInvite ? <div className="bg-red-50 p-4 rounded-md mb-6">
              <div className="flex">
                <XCircleIcon className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">
                    Invalid Invitation
                  </h3>
                  <p className="text-sm text-red-700 mt-1">
                    The email you entered has not been invited to this event.
                    Please contact the event organizer for assistance.
                  </p>
                </div>
              </div>
            </div> : null}
          <form onSubmit={e => {
          e.preventDefault();
          validateEmail();
        }}>
            <div className="mb-6">
              <FormField label="Email Address" id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="your@email.com" />
            </div>
            <Button variant="primary" type="submit" className="w-full">
              Verify Email
            </Button>
          </form>
        </div>
      </div>
    </div>;
  }
  // Render submission confirmation
  if (isSubmitted) {
    return <div className="flex-1 px-6">
      <div className="container mx-auto py-8 max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <CheckIcon className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="mt-3 text-lg font-medium text-gray-900">
              Application Submitted
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Thank you for submitting your vendor application for {eventId}. We
              are reviewing your documents and will be in touch soon.
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-md text-left mb-6">
            <div className="flex">
              <InfoIcon className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-blue-800">
                  What happens next?
                </h3>
                <ul className="mt-2 text-sm text-blue-700 list-disc list-inside space-y-1">
                  <li>
                    Our system is automatically reviewing your Certificate of
                    Insurance
                  </li>
                  <li>
                    You'll receive an email notification when your documents
                    have been reviewed
                  </li>
                  <li>
                    If any issues are found, we'll contact you with specific
                    details
                  </li>
                  <li>
                    Once approved, you'll receive your vendor confirmation
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Link to="/">
              <Button variant="outline" className="mr-4">
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>;
  }
  return <div className="flex-1 px-6">
      <div className="container mx-auto py-8 max-w-3xl">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Vendor Registration: {eventId}
          </h1>
          <p className="text-gray-600">
            Complete the following steps to register as a vendor for this event.
          </p>
        </div>
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === 1 ? 'bg-blue-600 text-white' : 'bg-green-500 text-white'}`}>
                {step > 1 ? <CheckIcon className="h-5 w-5" /> : 1}
              </div>
              <div className="ml-2">
                <p className={`text-sm font-medium ${step === 1 ? 'text-blue-600' : 'text-gray-900'}`}>
                  Basic Info
                </p>
              </div>
            </div>
            <div className="flex-1 border-t border-gray-300 mx-4"></div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === 2 ? 'bg-blue-600 text-white' : step > 2 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
                {step > 2 ? <CheckIcon className="h-5 w-5" /> : 2}
              </div>
              <div className="ml-2">
                <p className={`text-sm font-medium ${step === 2 ? 'text-blue-600' : step > 2 ? 'text-gray-900' : 'text-gray-500'}`}>
                  Documents
                </p>
              </div>
            </div>
            <div className="flex-1 border-t border-gray-300 mx-4"></div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === 3 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'}`}>
                {step > 3 ? <CheckIcon className="h-5 w-5" /> : 3}
              </div>
              <div className="ml-2">
                <p className={`text-sm font-medium ${step === 3 ? 'text-blue-600' : 'text-gray-500'}`}>
                  Review
                </p>
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Information */}
          {step === 1 && <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Vendor Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <FormField label="Business Name" id="businessName" name="businessName" required value={formData.businessName} onChange={handleChange} placeholder="Your Business Name" />
                <FormField label="Contact Name" id="contactName" name="contactName" required value={formData.contactName} onChange={handleChange} placeholder="Full Name" />
                <FormField label="Email Address" id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com" />
                <FormField label="Phone Number" id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="(123) 456-7890" />
              </div>
              <div className="mb-6">
                <label htmlFor="vendorType" className="block text-sm font-medium text-gray-700 mb-1">
                  Vendor Type
                </label>
                <select id="vendorType" name="vendorType" required value={formData.vendorType} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select vendor type...</option>
                  {vendorTypes.map(type => <option key={type.id} value={type.id}>
                      {type.name}
                    </option>)}
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Description
                </label>
                <textarea id="description" name="description" rows={3} value={formData.description} onChange={handleChange} placeholder="Briefly describe your business and what you'll be selling or promoting at the event" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div className="flex justify-end">
                <Button variant="primary" type="button" onClick={nextStep} className="flex items-center" disabled={!formData.businessName || !formData.email || !formData.vendorType}>
                  Continue to Documents
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>}
          {/* Step 2: Document Upload */}
          {step === 2 && <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Required Documents
              </h2>
              <div className="bg-blue-50 p-4 rounded-md mb-6">
                <div className="flex">
                  <InfoIcon className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-blue-800">
                      Document Requirements
                    </h3>
                    <p className="mt-1 text-sm text-blue-700">
                      Please upload the following required documents. All
                      documents must be in PDF format and clearly legible.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6 mb-8">
                {/* COI Upload */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Certificate of Insurance (COI)
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Upload your Certificate of Insurance showing required
                        coverage levels
                      </p>
                    </div>
                    <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Required
                    </div>
                  </div>
                  {documents.coi ? <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                      <div className="flex items-center">
                        <FileTextIcon className="h-5 w-5 text-blue-500 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {documents.coi.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {Math.round(documents.coi.size / 1024)} KB
                          </p>
                        </div>
                      </div>
                      <button type="button" onClick={() => removeFile('coi')} className="text-gray-400 hover:text-red-500">
                        <XIcon className="h-4 w-4" />
                      </button>
                    </div> : <div>
                      <label className="flex items-center justify-center w-full h-24 px-6 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-blue-400 focus:outline-none">
                        <span className="flex items-center space-x-2">
                          <UploadIcon className="w-6 h-6 text-gray-500" />
                          <span className="font-medium text-gray-600">
                            {isUploading ? 'Uploading...' : 'Drop files to upload or Browse'}
                          </span>
                        </span>
                        <input type="file" onChange={e => handleFileUpload('coi', e)} className="hidden" accept=".pdf,.doc,.docx" disabled={isUploading} />
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, DOC, or DOCX up to 5MB
                      </p>
                    </div>}
                </div>
                {/* W-9 Upload */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">W-9 Form</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Upload a completed and signed W-9 tax form
                      </p>
                    </div>
                    <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Required
                    </div>
                  </div>
                  {documents.w9 ? <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                      <div className="flex items-center">
                        <FileTextIcon className="h-5 w-5 text-green-500 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {documents.w9.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {Math.round(documents.w9.size / 1024)} KB
                          </p>
                        </div>
                      </div>
                      <button type="button" onClick={() => removeFile('w9')} className="text-gray-400 hover:text-red-500">
                        <XIcon className="h-4 w-4" />
                      </button>
                    </div> : <div>
                      <label className="flex items-center justify-center w-full h-24 px-6 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-blue-400 focus:outline-none">
                        <span className="flex items-center space-x-2">
                          <UploadIcon className="w-6 h-6 text-gray-500" />
                          <span className="font-medium text-gray-600">
                            {isUploading ? 'Uploading...' : 'Drop files to upload or Browse'}
                          </span>
                        </span>
                        <input type="file" onChange={e => handleFileUpload('w9', e)} className="hidden" accept=".pdf,.doc,.docx" disabled={isUploading} />
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, DOC, or DOCX up to 5MB
                      </p>
                    </div>}
                </div>
                {/* Health Permit (conditional based on vendor type) */}
                {selectedVendorType?.requiresHealthPermit && <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Health Permit
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Upload your current health department permit
                        </p>
                      </div>
                      <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Required
                      </div>
                    </div>
                    {documents.healthPermit ? <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                        <div className="flex items-center">
                          <FileTextIcon className="h-5 w-5 text-orange-500 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {documents.healthPermit.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {Math.round(documents.healthPermit.size / 1024)}{' '}
                              KB
                            </p>
                          </div>
                        </div>
                        <button type="button" onClick={() => removeFile('healthPermit')} className="text-gray-400 hover:text-red-500">
                          <XIcon className="h-4 w-4" />
                        </button>
                      </div> : <div>
                        <label className="flex items-center justify-center w-full h-24 px-6 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-blue-400 focus:outline-none">
                          <span className="flex items-center space-x-2">
                            <UploadIcon className="w-6 h-6 text-gray-500" />
                            <span className="font-medium text-gray-600">
                              {isUploading ? 'Uploading...' : 'Drop files to upload or Browse'}
                            </span>
                          </span>
                          <input type="file" onChange={e => handleFileUpload('healthPermit', e)} className="hidden" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" disabled={isUploading} />
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                          PDF, DOC, DOCX, JPG, or PNG up to 5MB
                        </p>
                      </div>}
                  </div>}
                {/* Signed Agreement Upload (optional) */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Signed Vendor Agreement
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Download, sign, and upload the vendor agreement
                      </p>
                    </div>
                    <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Optional
                    </div>
                  </div>
                  <div className="mb-4">
                    <Button variant="outline" size="sm" className="flex items-center">
                      <FileIcon className="h-4 w-4 mr-2" />
                      Download Agreement Template
                    </Button>
                  </div>
                  {documents.agreement ? <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                      <div className="flex items-center">
                        <FileTextIcon className="h-5 w-5 text-purple-500 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {documents.agreement.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {Math.round(documents.agreement.size / 1024)} KB
                          </p>
                        </div>
                      </div>
                      <button type="button" onClick={() => removeFile('agreement')} className="text-gray-400 hover:text-red-500">
                        <XIcon className="h-4 w-4" />
                      </button>
                    </div> : <div>
                      <label className="flex items-center justify-center w-full h-24 px-6 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-blue-400 focus:outline-none">
                        <span className="flex items-center space-x-2">
                          <UploadIcon className="w-6 h-6 text-gray-500" />
                          <span className="font-medium text-gray-600">
                            {isUploading ? 'Uploading...' : 'Drop files to upload or Browse'}
                          </span>
                        </span>
                        <input type="file" onChange={e => handleFileUpload('agreement', e)} className="hidden" accept=".pdf,.doc,.docx" disabled={isUploading} />
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, DOC, or DOCX up to 5MB
                      </p>
                    </div>}
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" type="button" onClick={prevStep}>
                  Back
                </Button>
                <Button variant="primary" type="button" onClick={nextStep} disabled={!requiredDocumentsUploaded()} className="flex items-center">
                  Review Application
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>}
          {/* Step 3: Review and Submit */}
          {step === 3 && <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Review Your Application
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="font-medium text-gray-900 mb-4">
                  Vendor Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Business Name</p>
                    <p className="font-medium">{formData.businessName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact Name</p>
                    <p className="font-medium">{formData.contactName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{formData.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Vendor Type</p>
                    <p className="font-medium">{selectedVendorType?.name}</p>
                  </div>
                </div>
                <h3 className="font-medium text-gray-900 mb-4">
                  Business Description
                </h3>
                <p className="text-gray-700 mb-6">
                  {formData.description || 'No description provided.'}
                </p>
                <h3 className="font-medium text-gray-900 mb-4">
                  Uploaded Documents
                </h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>Certificate of Insurance</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>W-9 Form</span>
                  </li>
                  {selectedVendorType?.requiresHealthPermit && documents.healthPermit && <li className="flex items-center">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Health Permit</span>
                      </li>}
                  {documents.agreement ? <li className="flex items-center">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span>Signed Vendor Agreement</span>
                    </li> : <li className="flex items-center">
                      <AlertCircleIcon className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="text-gray-500">
                        Vendor Agreement (not uploaded)
                      </span>
                    </li>}
                </ul>
              </div>
              <div className="mb-6">
                <div className="flex items-center">
                  <input id="acceptTerms" name="acceptTerms" type="checkbox" checked={formData.acceptTerms} onChange={handleChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                      terms and conditions
                    </a>{' '}
                    and certify that the information provided is accurate and
                    complete.
                  </label>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" type="button" onClick={prevStep}>
                  Back
                </Button>
                <Button variant="primary" type="submit" disabled={!formData.acceptTerms}>
                  Submit Application
                </Button>
              </div>
            </div>}
        </form>
      </div>
    </div>
  </div>;
}