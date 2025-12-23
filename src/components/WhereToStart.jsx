import { Link, Store, Database } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const WhereToStart = ({
  title,
  description,
  buttonText,
  steps
}) => {
  const { t } = useTranslation();
  
  // Use translations as defaults if props are not provided
  const defaultTitle = title || t('zambeel3PL.whereToStart.title');
  const defaultDescription = description || t('zambeel3PL.whereToStart.description');
  const defaultButtonText = buttonText || t('common.talkToAgent');
  
  const defaultSteps = steps || [
    {
      number: 1,
      title: t('zambeel360.whereToStart.steps.bookConsultation.title'),
      description: t('zambeel360.whereToStart.steps.bookConsultation.desc'),
      Icon: Link
    },
    {
      number: 2,
      title: t('zambeel360.whereToStart.steps.sendInventory.title'),
      description: t('zambeel360.whereToStart.steps.sendInventory.desc'),
      Icon: Store
    },
    {
      number: 3,
      title: t('zambeel360.whereToStart.steps.connectStore.title'),
      description: t('zambeel360.whereToStart.steps.connectStore.desc'),
      Icon: Database
    },
    {
      number: 4,
      title: t('zambeel360.whereToStart.steps.startSelling.title'),
      description: t('zambeel360.whereToStart.steps.startSelling.desc'),
      Icon: Link
    }
  ];
  
  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalButtonText = buttonText || defaultButtonText;
  const finalSteps = steps || defaultSteps;

  const StepItem = ({ step, isLast }) => (
    <>
      <div className="md:hidden relative pb-2 last:pb-0">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#fbbf24] rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-gray-900 font-bold text-lg">{step.number}</span>
            </div>
            <h3 className="text-lg font-bold text-[#3b4a7c]">{step.title}</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
        </div>
        {!isLast && (
          <div className="flex justify-center py-2">
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-4 border-l-2 border-dashed border-gray-300"></div>
              <div className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center my-1">
                <step.Icon className="w-4 h-4 text-[#3b4a7c]" />
              </div>
              <div className="w-0.5 h-4 border-l-2 border-dashed border-gray-300"></div>
            </div>
          </div>
        )}
      </div>
      <div className="hidden md:block relative">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-[#fbbf24] rounded-full flex items-center justify-center shadow-lg z-10 mb-6">
            <span className="text-gray-900 font-bold text-2xl">{step.number}</span>
          </div>
          {!isLast && (
            <div className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center -mt-3">
              <step.Icon className="w-5 h-5 text-[#3b4a7c]" />
            </div>
          )}
        </div>
        <div className="text-center">
          <h3 className="text-base font-bold text-[#3b4a7c] mb-3">{step.title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
        </div>
      </div>
    </>
  );

  return (
    <section className="relative py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-14">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#3b4a7c] mb-4">
              {finalTitle}
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {finalDescription}
            </p>
          </div>
          <div className="text-center mb-12">
            <button className="inline-flex items-center px-8 py-3.5 bg-[#3d4a7c] text-white text-base font-semibold rounded-full hover:bg-[#2d3a6c] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              <span>{finalButtonText}</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="md:hidden">
              {finalSteps.map((step, index) => (
                <StepItem key={step.number} step={step} isLast={index === finalSteps.length - 1} />
              ))}
            </div>
            <div className="hidden md:block">
              <div className="relative mb-12">
                {/* Horizontal dotted line with step numbers and icons */}
                <div className="flex items-center justify-center mb-16">
                  {finalSteps.map((step, index) => (
                    <div key={step.number} className="flex items-center">
                      {/* Step number circle */}
                      <div className="w-14 h-14 bg-[#fbbf24] rounded-full flex items-center justify-center shadow-lg z-10 relative">
                        <span className="text-gray-900 font-bold text-2xl">{step.number}</span>
                      </div>
                      {/* Dotted line and icon (except for last step) */}
                      {index < finalSteps.length - 1 && (
                        <div className="flex items-center mx-4" style={{ minWidth: '120px' }}>
                          <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>
                          <div className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center mx-2">
                            <step.Icon className="w-5 h-5 text-[#3b4a7c]" />
                          </div>
                          <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {/* Step content below */}
                <div className="grid grid-cols-4 gap-4">
                  {finalSteps.map((step) => (
                    <div key={step.number} className="text-center">
                      <h3 className="text-base font-bold text-[#3b4a7c] mb-3">{step.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhereToStart;

