
import { ArrowLeft, ArrowRight, FileText, Code, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import ProductPlatform from '@/components/ProductPlatform';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';

const TechDetails = () => {
  const isMobile = useIsMobile();
  const [progressValue, setProgressValue] = useState(0);

  // Animate progress bar on component mount
  useEffect(() => {
    const timer = setTimeout(() => setProgressValue(100), 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <PageLayout>
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回首页
            </Link>
            
            <motion.h1 initial={{
            opacity: 0,
            y: -10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }} className="text-3xl sm:text-4xl font-bold mb-6">
              技术深度解析
            </motion.h1>
            
            <div className="prose prose-lg max-w-none">
              <motion.p initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              duration: 0.5,
              delay: 0.2
            }} className="text-base sm:text-lg text-gray-600 mb-12">
                探索我们智能纺织传感技术背后的工程技术细节，了解我们的系统架构如何实现快速开发和部署。
              </motion.p>
              
              {/* System Architecture Section */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6
            }} className="mb-16">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-gray-700" />
                  <h2 className="text-2xl font-bold">系统架构</h2>
                </div>
                
                <p className="text-gray-600 mb-8 text-base max-w-3xl">
                  我们平台使用三层架构连接物理设备到我们的云服务和用户应用程序。 
                  下面的图表说明了数据如何通过我们的系统，从传感器收集到面向用户的应用程序。
                </p>

                {/* Progress bar showing flow */}
                <div className="w-full mb-6">
                  
                  
                </div>
                
                {/* Product Platform Architecture Diagram */}
                <Card className="bg-white rounded-lg mb-10 border border-gray-200 shadow-sm">
                  <CardContent className="p-4 lg:p-6">
                    <ProductPlatform />
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Our Approach Section */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              delay: 0.2
            }}>
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5 text-gray-700" />
                  <h2 className="text-2xl font-bold">我们的方法</h2>
                </div>
                
                <p className="text-gray-600 mb-8 text-base max-w-3xl">
                  在 WRLDS，我们开发了一套系统的方法来创建智能纺织解决方案，结合了技术创新与实际实施。 
                  我们综合的开发过程确保每个项目都能高效地从概念转变为市场准备就绪的产品。
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  {[{
                  title: "发现",
                  icon: <Cpu className="w-5 h-5 text-gray-700" />,
                  description: "我们开始进行彻底的市场研究和需求收集，以了解您的具体需求和机会。"
                }, {
                  title: "设计与原型制作",
                  icon: <Code className="w-5 h-5 text-gray-700" />,
                  description: "我们的团队创建初始设计和功能原型，以允许早期测试和迭代。"
                }, {
                  title: "开发与测试",
                  icon: <FileText className="w-5 h-5 text-gray-700" />,
                  description: "我们严格开发和测试所有组件，以确保它们符合性能和可靠性标准。"
                }].map((phase, i) => <motion.div key={phase.title} initial={{
                  opacity: 0,
                  y: 10
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.4,
                  delay: 0.3 + i * 0.1
                }} className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-2 mb-3">
                        {phase.icon}
                        <h3 className="font-semibold text-lg">{phase.title}</h3>
                      </div>
                      <p className="text-gray-600 text-base">{phase.description}</p>
                    </motion.div>)}
                </div>
              </motion.div>
            </div>
            
            <div className="mt-16 pt-8 border-t border-gray-200">
              <Link to="/development-process" className="inline-flex items-center px-5 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all group">
                探索我们的开发流程
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TechDetails;
