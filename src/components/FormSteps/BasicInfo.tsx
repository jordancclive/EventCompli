import React, { useState } from 'react';
import { FormField } from '../ui/FormField';
import { CalendarIcon, MapPinIcon, AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/Button';
export function BasicInfo({
  formData,
  updateFormData
}) {
  const [isUploading, setIsUploading] = useState(false);
  const handleChange = e => {
    updateFormData({
      [e.target.name]: e.target.value
    });
  };
  const handleImageUpload = url => {
    // In a real app, this would be an actual upload function
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      updateFormData({
        eventImage: url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      });
      setIsUploading(false);
    }, 1000);
  };
  const removeImage = () => {
    updateFormData({
      eventImage: ''
    });
  };
  return <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Event Basics</h2>
      <div className="space-y-6">
        <FormField label="Event Name" id="eventName" name="eventName" required value={formData.eventName} onChange={handleChange} helperText="This name must be unique for your account" />
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <FormField label="Event Date(s)" id="eventDates" name="eventDates" value={formData.eventDates} onChange={handleChange} icon={<CalendarIcon className="h-5 w-5 text-gray-400" />} placeholder="e.g., June 15-17, 2023" />
          </div>
          <div className="flex-1">
            <FormField label="Location" id="location" name="location" value={formData.location} onChange={handleChange} icon={<MapPinIcon className="h-5 w-5 text-gray-400" />} placeholder="e.g., Central Park, New York" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Image
          </label>
          {formData.eventImage ? <div className="relative rounded-md overflow-hidden border border-gray-200">
              <img src={formData.eventImage} alt="Event" className="w-full h-48 object-cover" />
              <button onClick={removeImage} className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white p-1.5 rounded-full hover:bg-opacity-90">
                <XIcon className="h-4 w-4" />
              </button>
            </div> : <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">
              <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-4 text-center">
                Upload an image for your event.
                <br />
                This will be displayed on the vendor portal.
              </p>
              <Button variant="outline" className="flex items-center" onClick={() => handleImageUpload()} disabled={isUploading}>
                {isUploading ? 'Uploading...' : <>
                    <UploadIcon className="h-4 w-4 mr-2" />
                    Upload Image
                  </>}
              </Button>
            </div>}
        </div>
        <FormField label="Event Summary" id="eventSummary" name="eventSummary" type="textarea" value={formData.eventSummary} onChange={handleChange} helperText="Optional. For internal use only - vendors won't see this." rows={4} placeholder="Add any notes or details about this event that might be helpful for your team." />
        <div className="bg-teal-50 p-4 rounded-md flex items-start mt-6">
          <AlertCircleIcon className="h-5 w-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-teal-700">
            <strong>Tip:</strong> Choose a clear, specific event name to avoid
            creating duplicates. For recurring events, consider including the
            year or season (e.g., "Farmers Market - Summer 2023").
          </p>
        </div>
      </div>
    </div>;
}