import React from 'react';
import { CheckIcon } from 'lucide-react';
export function VerticalStepIndicator({
  steps,
  currentStep,
  onStepClick = null
}) {
  return <ol className="relative border-l border-gray-200 ml-3">
      {steps.map(step => {
      // Determine the status of this step
      const isCompleted = step.number < currentStep;
      const isCurrent = step.number === currentStep;
      const isPending = step.number > currentStep;
      return <li key={step.number} className="mb-6 ml-6">
            <div className={`absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 
              ${isCompleted ? 'bg-blue-600 text-white' : isCurrent ? 'bg-blue-100 border-2 border-blue-600 text-blue-600' : 'bg-gray-100 text-gray-400'}`} onClick={onStepClick ? () => onStepClick(step.number) : undefined} style={onStepClick && (isCompleted || isCurrent) ? {
          cursor: 'pointer'
        } : {}}>
              {isCompleted ? <CheckIcon className="w-5 h-5" /> : <span>{step.number}</span>}
            </div>
            <h3 className={`${isCompleted || isCurrent ? 'text-gray-900 font-medium' : 'text-gray-400'}`} onClick={onStepClick && (isCompleted || isCurrent) ? () => onStepClick(step.number) : undefined} style={onStepClick && (isCompleted || isCurrent) ? {
          cursor: 'pointer'
        } : {}}>
              {step.title}
              {isCurrent && <span className="ml-2 text-xs font-normal text-blue-600">
                  (Current)
                </span>}
            </h3>
          </li>;
    })}
    </ol>;
}