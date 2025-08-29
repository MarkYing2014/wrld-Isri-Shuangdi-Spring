import { ArrowLeft, CheckCircle, Clock, FileSearch, Settings, Cpu, Code, Truck, BarChart, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import PageLayout from '@/components/PageLayout';
const DevelopmentProcess = () => {
  const [activeProcess, setActiveProcess] = useState(1);
  const processRef = useRef<HTMLDivElement>(null);
  const processSectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { t } = useTranslation();
  
  // Get process steps from translations
  type ProcessStep = {
    id: number;
    title: string;
    description: string;
    steps: string[];
  };
  
  const processes = t('process.steps', { returnObjects: true }) as ProcessStep[];
  
  useEffect(() => {
    processSectionsRef.current = processes.map((_, i) => processSectionsRef.current[i] || null);
  }, [processes]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        entries[0].target.classList.add('animate-fade-in');
        (entries[0].target as HTMLElement).style.opacity = '1';
        observer.unobserve(entries[0].target);
      }
    }, {
      threshold: 0.1
    });
    if (processRef.current) {
      observer.observe(processRef.current);
    }
    return () => observer.disconnect();
  }, []);
  // Update active process based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      let closestSection = null;
      let closestDistance = Infinity;
      
      processSectionsRef.current.forEach((section, index) => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + (rect.height / 2);
        const distance = Math.abs(sectionCenter - viewportCenter);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestSection = index + 1; // Process IDs start from 1
        }
      });
      
      if (closestSection !== null && closestSection !== activeProcess) {
        setActiveProcess(closestSection);
      }
    };
    
    // Throttle scroll events for better performance
    let scrollTimeout: NodeJS.Timeout;
    const throttledScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          handleScroll();
          scrollTimeout = null as any;
        }, 100);
      }
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [activeProcess]);
  const developmentSteps = [{
    icon: <FileSearch className="h-6 w-6" />,
    title: "1. Discovery & Requirements",
    description: "We begin by understanding your needs, market opportunities, and technical requirements to establish clear project parameters and goals."
  }, {
    icon: <Settings className="h-6 w-6" />,
    title: "2. Concept & Design",
    description: "Our experts craft initial designs and technical specifications, ensuring alignment with your brand identity and user experience goals."
  }, {
    icon: <Cpu className="h-6 w-6" />,
    title: "3. Hardware Development",
    description: "We select, design, and integrate sensor components, creating optimized hardware solutions that balance performance and efficiency."
  }, {
    icon: <Code className="h-6 w-6" />,
    title: "4. Software Development",
    description: "Our development team builds robust firmware, apps, and cloud platforms tailored to your product's unique requirements and user needs."
  }, {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "5. Testing & Iteration",
    description: "Rigorous testing protocols ensure reliability, durability, and optimal performance across all conditions and use cases."
  }, {
    icon: <Truck className="h-6 w-6" />,
    title: "6. Production & Deployment",
    description: "We support the transition from prototype to manufacturing, ensuring quality standards and seamless deployment."
  }, {
    icon: <BarChart className="h-6 w-6" />,
    title: "7. Continuous Improvement",
    description: "Post-launch analytics and feedback loops drive ongoing improvements, updates, and potential new features."
  }];
  return (
    <PageLayout>
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
              {t('process.title')}
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              {t('process.description')}
            </p>

            <div className="prose prose-lg max-w-none text-left">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                {t('process.principles.title')}
              </h3>
              <ul className="space-y-3 mb-12">
                {(t('process.principles.items', { returnObjects: true }) as string[]).map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-0 left-1/2 w-0.5 h-full bg-gray-200 -translate-x-1/2"></div>

            <div className="space-y-10 relative">
              {processes.map((process, index) => (
                <div 
                  key={process.id} 
                  ref={el => processSectionsRef.current[index] = el} 
                  className={cn(
                    "relative flex flex-col md:flex-row md:items-center gap-6",
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  <div className="md:w-1/2">
                    <div 
                      className={cn(
                        "md:absolute top-0 left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-300 cursor-pointer shadow-md text-lg font-bold",
                        activeProcess === process.id 
                          ? "bg-orange-500 text-white border-orange-500 scale-110" 
                          : "bg-white text-orange-600 border-2 border-orange-500"
                      )} 
                      onClick={() => setActiveProcess(process.id)}
                      aria-current={activeProcess === process.id ? 'step' : undefined}
                    >
                      {process.id}
                    </div>

                    <div className={index % 2 === 0 ? "md:pr-16" : "md:pl-16"}>
                      <h3 className="text-xl font-bold mb-2 mt-3 md:mt-0">{process.title}</h3>
                      <p className="text-gray-600 mb-3 text-sm">{process.description}</p>

                      <button 
                        onClick={() => setActiveProcess(process.id)} 
                        className={cn(
                          "text-sm font-medium transition-colors",
                          activeProcess === process.id 
                            ? "text-gray-700" 
                            : "text-gray-500 hover:text-gray-700"
                        )}
                      >
                        {activeProcess === process.id 
                          ? t('currentlyViewing') 
                          : t('viewDetails')}
                      </button>
                    </div>
                  </div>

                  <div 
                    className={cn(
                      "md:w-1/2 bg-white rounded-xl p-5 shadow-sm border-2 transition-all duration-300",
                      activeProcess === process.id 
                        ? "opacity-100 translate-y-0 shadow-lg border-orange-300" 
                        : "opacity-50 md:opacity-40 hover:opacity-70 cursor-pointer border-transparent"
                    )} 
                    onClick={() => setActiveProcess(process.id)}
                  >
                    <h4 className="font-semibold mb-3 text-gray-700">
                      {t('keyActivities')}
                    </h4>
                    <ul className="space-y-2">
                      {process.steps.map((step: string, stepIndex: number) => (
                        <li key={stepIndex} className="flex items-start">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5 mr-2">
                            <Check className="w-3 h-3 text-gray-700" />
                          </span>
                          <span className="text-gray-700 text-sm">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
              <Link 
                to="/tech-details" 
                className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all group"
              >
                {t('exploreTechnology')}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
export default DevelopmentProcess;

// Helper icon component for later
const ArrowRight = ({
  className = "w-4 h-4"
}: {
  className?: string;
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>;