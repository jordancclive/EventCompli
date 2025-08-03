import React from 'react';
import { CheckIcon } from 'lucide-react';
export function StepIndicator({
  steps,
  currentStep
}) {
  return <div className="md:hidden overflow-x-auto pb-2">
      <div className="flex justify-between items-center min-w-max">
        {steps.map(step => <div key={step.number} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step.number < currentStep ? 'bg-blue-600 text-white' : step.number === currentStep ? 'bg-blue-100 border-2 border-blue-600 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
              {step.number < currentStep ? <CheckIcon className="w-5 h-5" /> : <span>{step.number}</span>}
            </div>
            <span className={`ml-2 text-sm ${step.number <= currentStep ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
              {step.title}
            </span>
            {step.number < steps.length && <div className={`w-12 h-0.5 mx-2 ${step.number < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />}
          </div>)}
      </div>
    </div>;
}