import { Check, Clock, Plane } from 'lucide-react';

const TrackingStatus = ({ status }) => {
  const { departed, inTransit, arrived } = status;
  
  const steps = [
    {
      id: 'departed',
      name: 'Departed',
      description: 'Package has left origin',
      status: departed ? 'complete' : 'upcoming',
      icon: Plane
    },
    {
      id: 'inTransit',
      name: 'In Transit',
      description: 'Package is in flight',
      status: inTransit ? 'complete' : (departed ? 'current' : 'upcoming'),
      icon: Plane
    },
    {
      id: 'arrived',
      name: 'Arrived',
      description: 'Package has arrived at destination',
      status: arrived ? 'complete' : (inTransit ? 'current' : 'upcoming'),
      icon: Check
    }
  ];

  return (
    <div className="py-6">
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative flex items-center justify-center">
          {/* Line connecting icons - now centered vertically with the icons */}
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="h-0.5 w-full bg-gray-200"></div>
          </div>
          
          {/* Steps */}
          <div className="relative flex justify-between items-center w-full">
            {steps.map((step) => (
              <div key={step.id} className="relative flex flex-col items-center z-10">
                {/* Icon - smaller for mobile */}
                <div 
                  className={`h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center ${
                    step.status === 'complete' 
                      ? 'bg-green-500' 
                      : step.status === 'current' 
                        ? 'bg-blue-500' 
                        : 'bg-gray-300'
                  }`}
                >
                  {step.status === 'complete' ? (
                    <Check className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  ) : step.status === 'current' ? (
                    <Clock className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  ) : (
                    <step.icon className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  )}
                </div>
                
                {/* Label - improved for mobile */}
                <div className="mt-2 flex flex-col items-center">
                  <span 
                    className={`text-xs md:text-sm font-medium ${
                      step.status === 'complete' 
                        ? 'text-green-600' 
                        : step.status === 'current' 
                          ? 'text-blue-600' 
                          : 'text-gray-500'
                    }`}
                  >
                    {step.name}
                  </span>
                  <span className="text-xxs md:text-xs text-gray-500 text-center px-1 max-w-[90px] md:max-w-none">
                    {step.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingStatus;