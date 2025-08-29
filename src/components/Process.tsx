
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Check } from "lucide-react";
import { useTranslation } from 'react-i18next';

const processes = [{
  id: 1,
  title: "精密弹簧设计",
  description: "我们从为您的行业和用例设计定制的精密弹簧开始，选择合适的材料、线径和结构。",
  steps: ["行业特定需求分析", "弹簧类型和材料选择", "原型弹簧开发", "初始测试和校准"]
}, {
  id: 2,
  title: "弹簧集成",
  description: "我们的工程团队将弹簧无缝集成到您的产品中，同时保持其功能性、耐久性和可靠性。",
  steps: ["功能性优化", "非侵入式集成技术", "耐久性与疲劳测试", "功能和性能验证"]
}, {
  id: 3,
  title: "AI与数据分析",
  description: "我们开发专门的算法，将弹簧性能数据转化为可操作的洞察，以满足您的行业需求。",
  steps: ["行业特定算法开发", "机器学习模型训练与领域数据", "实时性能分析", "实现洞察交付优化"]
}, {
  id: 4,
  title: "生产与认证",
  description: "我们负责制造、质量控制，并确保所有精密弹簧产品符合相关的行业标准和认证。",
  steps: ["制造合作伙伴选择", "质量保证流程", "行业特定认证获取", "初始生产监督"]
}, {
  id: 5,
  title: "部署与支持",
  description: "我们提供全面的培训、实施协助和持续支持，以确保成功应用和持续改进。",
  steps: ["用户培训和入门", "数据解读指导", "性能监控", "持续改进迭代"]
}];

const Process = () => {
  const { t } = useTranslation();
  const [activeProcess, setActiveProcess] = useState(1);
  const processRef = useRef<HTMLDivElement>(null);
  const processSectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const processes = t('process.steps', { returnObjects: true }) as Array<{
    id: number;
    title: string;
    description: string;
    steps: string[];
  }>;
  
  useEffect(() => {
    processSectionsRef.current = processes.map((_, i) => processSectionsRef.current[i] || null);
  }, []);
  
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
  
  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      
      let closestSection = null;
      let closestDistance = Infinity;
      
      processSectionsRef.current.forEach((section, index) => {
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestSection = index;
        }
      });
      
      if (closestSection !== null) {
        setActiveProcess(closestSection + 1);
      }
    };
    
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    
    setTimeout(handleScroll, 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="process" className="bg-white py-16">
      <div className="container mx-auto px-4" ref={processRef}>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-center mb-4">{t('process.title')}</h2>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
            {t('process.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Process Navigation */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="sticky top-24 space-y-2">
              {processes.map((process) => (
                <button
                  key={process.id}
                  onClick={() => {
                    setActiveProcess(process.id);
                    const el = document.getElementById(`process-${process.id}`);
                    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={cn(
                    "w-full text-left p-4 rounded-lg transition-all",
                    activeProcess === process.id
                      ? "bg-gray-100 shadow-sm"
                      : "hover:bg-gray-50"
                  )}
                >
                  <div className="flex items-center">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-all",
                      activeProcess === process.id
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-500"
                    )}>
                      {activeProcess > process.id ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <span>{process.id}</span>
                      )}
                    </div>
                    <span className={cn(
                      "font-medium",
                      activeProcess === process.id ? "text-gray-900" : "text-gray-600"
                    )}>
                      {process.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Process Details */}
          <div className="md:col-span-8 lg:col-span-9">
            <div className="space-y-16">
              {processes.map((process) => (
                <div
                  id={`process-${process.id}`}
                  key={process.id}
                  className="scroll-mt-24 transition-all duration-500"
                  ref={el => processSectionsRef.current[process.id - 1] = el}
                >
                  <h3 className="text-2xl font-bold mb-4">{process.title}</h3>
                  <p className="text-gray-700 mb-6">{process.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {process.steps.map((step, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-3 text-sm">
                            {idx + 1}
                          </div>
                          <span>{step}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
