import React, { useEffect, useState, useRef } from 'react';
import { FormField } from '../ui/FormField';
import { Button } from '../ui/Button';
import { PlusIcon, TrashIcon, InfoIcon, ChevronDownIcon, XIcon, SearchIcon } from 'lucide-react';
const vendorTypeCategories = [{
  name: '🍔 Food & Beverage Vendors',
  types: ['Food Trucks', 'Tent-Based Food Booths (BBQ, fried foods, etc.)', 'Packaged Food Sellers (jams, baked goods)', 'Beverage Stands (lemonade, smoothies)', 'Alcohol Vendors / Beer Gardens']
}, {
  name: '🎨 Craft & Artisan Vendors',
  types: ['Handmade Crafts (jewelry, candles, soaps)', 'Painters / Visual Artists', 'Clothing & Accessories', 'Pottery & Ceramics', 'Home Décor']
}, {
  name: '🛍️ Retail / Merchandise Vendors',
  types: ['Branded Apparel', 'Local Boutiques', 'Souvenir Stalls', 'Toy Sellers']
}, {
  name: '🐐 Experience & Activity Vendors',
  types: ['Petting Zoos & Pony Rides', 'Bounce Houses / Inflatables', 'Carnival Games', 'Face Painters / Henna Artists', 'Magicians / Entertainers', 'Photo Booths']
}, {
  name: '🛠️ Service Providers',
  types: ['Electricians / Audio-Visual Techs', 'Security Services', 'Cleaning Crews / Janitorial', 'Setup/Teardown Crews', 'Generators / Equipment Rentals']
}, {
  name: '📢 Sponsors & Exhibitors',
  types: ['Brand Activation Booths', 'Corporate Exhibitors', 'Product Demos', 'Sampling Stations']
}, {
  name: '🎶 Entertainment Vendors',
  types: ['Bands / Musicians', 'DJs', 'Staging Companies', 'Light & Sound Technicians', 'Emcees / Speakers']
}, {
  name: '🚐 Mobile Services',
  types: ['Mobile Boutiques', 'Mobile Pet Groomers', 'Mobile Barbershops', 'Mobile Art Studios']
}];
export function VendorCap({
  formData,
  updateFormData
}) {
  const [vendorTypes, setVendorTypes] = useState([{
    type: '',
    maxCount: ''
  }]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  useEffect(() => {
    // Initialize from formData if it exists
    if (formData.vendorCaps && formData.vendorCaps.length > 0) {
      setVendorTypes(formData.vendorCaps);
    }
  }, []);
  useEffect(() => {
    // Automatically update formData when vendorTypes change
    const validVendorTypes = vendorTypes.filter(vt => vt.type);
    updateFormData({
      vendorCaps: validVendorTypes
    });
  }, [vendorTypes]);
  const addVendorType = () => {
    setVendorTypes([...vendorTypes, {
      type: '',
      maxCount: ''
    }]);
  };
  const removeVendorType = index => {
    const updatedTypes = [...vendorTypes];
    updatedTypes.splice(index, 1);
    setVendorTypes(updatedTypes);
  };
  const handleVendorTypeChange = (index, field, value) => {
    const updatedTypes = [...vendorTypes];
    updatedTypes[index][field] = value;
    setVendorTypes(updatedTypes);
  };
  const openDropdown = index => {
    setActiveIndex(index);
    setIsDropdownOpen(true);
    setSearchTerm('');
    // Focus the search input when dropdown opens
    setTimeout(() => {
      if (searchRef.current) {
        searchRef.current.focus();
      }
    }, 10);
  };
  const selectVendorType = type => {
    handleVendorTypeChange(activeIndex, 'type', type);
    setIsDropdownOpen(false);
  };
  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };
  // Filter vendor types based on search term
  const filteredVendorTypes = searchTerm.trim() === '' ? vendorTypeCategories : vendorTypeCategories.map(category => {
    const matchingTypes = category.types.filter(type => type.toLowerCase().includes(searchTerm.toLowerCase()));
    if (matchingTypes.length > 0) {
      return {
        name: category.name,
        types: matchingTypes
      };
    }
    return null;
  }).filter(Boolean);
  // Add "Other" option to filtered results if search term exists
  const showOtherOption = searchTerm.trim() !== '';
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Vendor Types</h2>
      <div className="bg-teal-50 p-4 rounded-md flex items-start mb-6">
        <InfoIcon className="h-5 w-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-teal-700">
          <p className="font-medium mb-1">Important:</p>
          <p>
            In the next step, you'll set specific insurance requirements for
            each vendor type you define here. This helps ensure appropriate
            coverage based on vendor activities.
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Vendor Type
            </label>
          </div>
          <div className="w-32">
            <label className="block text-sm font-medium text-gray-700">
              Max Count (Optional)
            </label>
          </div>
          <div className="w-10"></div>
        </div>
        {vendorTypes.map((vendorType, index) => <div key={index} className="flex items-center gap-3">
            <div className="flex-1 relative">
              <div className="relative">
                <button type="button" className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-left focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white" onClick={() => openDropdown(index)}>
                  {vendorType.type || 'Select vendor type...'}
                </button>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {isDropdownOpen && activeIndex === index && <div ref={dropdownRef} className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md max-h-96 overflow-auto border border-gray-200">
                  <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
                    <div className="relative">
                      <input ref={searchRef} type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search vendor types..." className="w-full px-3 py-2 pl-9 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      {searchTerm && <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600" onClick={() => setSearchTerm('')}>
                          <XIcon className="h-4 w-4" />
                        </button>}
                    </div>
                  </div>
                  <div>
                    {filteredVendorTypes.map((category, catIndex) => <div key={catIndex}>
                        <div className="px-3 py-2 bg-gray-100 font-medium text-sm text-gray-700">
                          {category.name}
                        </div>
                        <div>
                          {category.types.map((type, typeIndex) => <button key={typeIndex} type="button" onClick={() => selectVendorType(type)} className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm">
                              {type}
                            </button>)}
                        </div>
                      </div>)}
                    {showOtherOption && <div>
                        <div className="px-3 py-2 bg-gray-100 font-medium text-sm text-gray-700">
                          Other
                        </div>
                        <button type="button" onClick={() => selectVendorType(searchTerm)} className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm">
                          {searchTerm}
                        </button>
                      </div>}
                    {filteredVendorTypes.length === 0 && !showOtherOption && <div className="p-4 text-center text-gray-500 text-sm">
                        No vendor types found. Type to add a custom type.
                      </div>}
                  </div>
                </div>}
            </div>
            <div className="w-32">
              <FormField id={`maxCount-${index}`} type="number" min="1" placeholder="No limit" value={vendorType.maxCount} onChange={e => handleVendorTypeChange(index, 'maxCount', e.target.value)} className="mb-0 h-10" />
            </div>
            {vendorTypes.length > 1 && <button className="p-2 text-gray-400 hover:text-red-500 w-10" onClick={() => removeVendorType(index)} aria-label="Remove vendor type">
                <TrashIcon className="h-5 w-5" />
              </button>}
          </div>)}
        <Button variant="outline" className="flex items-center mt-2" onClick={addVendorType}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Vendor Type
        </Button>
      </div>
    </div>;
}