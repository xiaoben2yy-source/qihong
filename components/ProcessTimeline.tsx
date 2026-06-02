'use client'

import { useState } from 'react'

interface Step {
  id: string
  labelEn: string
  labelZh: string
  icon: string
}

interface ProcessTimelineProps {
  steps: Step[]
  isZh: boolean
}

export default function ProcessTimeline({ steps, isZh }: ProcessTimelineProps) {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="relative">
      <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 transform -translate-y-1/2" />
      <div className="flex justify-between overflow-hidden pt-8 md:pt-0">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex flex-col items-center flex-1 transition-all duration-300 cursor-pointer group ${
              activeStep === index ? 'scale-110' : ''
            }`}
            onMouseEnter={() => setActiveStep(index)}
          >
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 shadow-lg ${
                activeStep === index
                  ? 'bg-amber-500 text-white scale-110'
                  : 'bg-white text-slate-700 group-hover:bg-amber-400 group-hover:text-white'
              }`}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={step.icon} />
              </svg>
            </div>
            <span
              className={`text-sm font-medium transition-colors duration-300 ${
                activeStep === index ? 'text-amber-600' : 'text-gray-600 group-hover:text-amber-500'
              }`}
            >
              {isZh ? step.labelZh : step.labelEn}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
