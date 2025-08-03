import React from 'react';
import { CheckIcon } from 'lucide-react';
export function VerticalStepIndicator({
  steps,
  currentStep,
  onStepClick = null
}) {
  return <ol className="relative border-l border-gray-200 ml-3">
      {steps.map(step => <li key={step.number} className="mb-6 ml-6">
          <div className={`absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 
              ${step.number < currentStep ? 'bg-blue-600 text-white' : step.number === currentStep ? 'bg-blue-100 border-2 border-blue-600 text-blue-600' : 'bg-gray-100 text-gray-400'}`} onClick={onStepClick ? () => onStepClick(step.number) : undefined} style={onStepClick ? {
        cursor: 'pointer'
      } : {}}>
            {step.number < currentStep ? <CheckIcon className="w-5 h-5" /> : <span>{step.number}</span>}
          </div>
          <h3 className={`${step.number <= currentStep ? 'text-gray-900 font-medium' : 'text-gray-400'}`} onClick={onStepClick ? () => onStepClick(step.number) : undefined} style={onStepClick ? {
        cursor: 'pointer'
      } : {}}>
            {step.title}
          </h3>
        </li>)}
    </ol>;
}