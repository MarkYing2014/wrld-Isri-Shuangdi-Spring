
import { motion } from "framer-motion";
import { Database, Gauge, Cpu, Bluetooth, Battery, Server, ArrowRight, Smartphone, Code, Wifi, Cloud, MonitorSmartphone, FileText } from 'lucide-react';

const ProductPlatform = () => {
  return (
    <div className="w-full relative">
      {/* Product Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">产品</h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-4xl">
          5年投资于专注于技术的端到端平台，允许客户品牌拥有定价、品牌、营销和销售。Wrlds可以帮助所有方面的产品开发、认证、初始生产和应用开发。
        </p>
      </motion.div>

      {/* Platform Architecture - Three Column Layout for desktop, Vertical for mobile */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Physical Devices Column */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          <div className="bg-gray-200 rounded-xl p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-center mb-1">物理设备</h3>
            <p className="text-xs sm:text-sm text-center mb-4">数据输入</p>
            
            <div className="space-y-3">
              {[
                { icon: <Gauge className="text-black w-4 h-4 sm:w-5 sm:h-5" />, text: "运动传感器" },
                { icon: <Cpu className="text-black w-4 h-4 sm:w-5 sm:h-5" />, text: "心率传感器" },
                { icon: <Bluetooth className="text-black w-4 h-4 sm:w-5 sm:h-5" />, text: "无线连接" },
                { icon: <Battery className="text-black w-4 h-4 sm:w-5 sm:h-5" />, text: "电源管理" },
                { icon: <Database className="text-black w-4 h-4 sm:w-5 sm:h-5" />, text: "本地存储" },
                { icon: <Wifi className="text-black w-4 h-4 sm:w-5 sm:h-5" />, text: "蜂窝连接" }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-3 sm:p-4 flex items-center">
                  <div className="mr-3 sm:mr-4 flex-shrink-0">{item.icon}</div>
                  <span className="text-gray-800 font-medium text-xs sm:text-sm">{item.text}</span>
                </div>
              ))}
            </div>
            
            <p className="text-xs sm:text-sm text-center mt-4 sm:mt-6">
              收集数据的硬件
            </p>
          </div>
        </motion.div>

        {/* Flow Arrows - Mobile and Desktop have different appearance */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden lg:flex items-center justify-center"
        >
          <ArrowRight className="text-black w-8 h-8" />
        </motion.div>
        
        {/* Mobile Flow Indicator - Only visible on mobile/tablet */}
        <div className="flex lg:hidden items-center justify-center my-2">
          <ArrowRight className="text-black w-6 h-6 rotate-90" />
        </div>

        {/* WRLDS Platform Column */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex-[1.5]"
        >
          <div className="bg-gray-200 rounded-xl p-4 sm:p-6">
            <div className="flex flex-col items-center mb-3 sm:mb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-center mb-0">wrlds</h3>
              <p className="text-lg sm:text-xl font-medium text-center">平台</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {[
                { icon: <Database className="w-4 h-4 sm:w-5 sm:h-5" />, name: "云存储" },
                { icon: <Gauge className="w-4 h-4 sm:w-5 sm:h-5" />, name: "数据处理" },
                { icon: <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />, name: "AI & ML" },
                { icon: <Battery className="w-4 h-4 sm:w-5 sm:h-5" />, name: "电源优化" },
                { icon: <Code className="w-4 h-4 sm:w-5 sm:h-5" />, name: "软件" },
                { icon: <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />, name: "Demo Apps" },
                { icon: <Wifi className="w-4 h-4 sm:w-5 sm:h-5" />, name: "实时数据" },
                { icon: <Server className="w-4 h-4 sm:w-5 sm:h-5" />, name: "边缘计算" },
                { icon: <Code className="w-4 h-4 sm:w-5 sm:h-5" />, name: "APIs" },
                { icon: <Server className="w-4 h-4 sm:w-5 sm:h-5" />, name: "基础设施" },
                { icon: <Cloud className="w-4 h-4 sm:w-5 sm:h-5" />, name: "云" },
                { icon: <Code className="w-4 h-4 sm:w-5 sm:h-5" />, name: "Dev Tools" }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-2 sm:p-3 text-center flex flex-col items-center justify-center">
                  <div className="mb-1 sm:mb-2">{item.icon}</div>
                  <div className="text-[10px] sm:text-xs">{item.name}</div>
                </div>
              ))}
            </div>
            
            <p className="text-xs sm:text-sm text-center mt-4 sm:mt-6">
              我们的平台处理数据并<br />驱动智能应用
            </p>
          </div>
        </motion.div>

        {/* Flow Arrows - Desktop Only */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="hidden lg:flex items-center justify-center"
        >
          <ArrowRight className="text-black w-8 h-8" />
        </motion.div>
        
        {/* Mobile Flow Indicator - Only visible on mobile/tablet */}
        <div className="flex lg:hidden items-center justify-center my-2">
          <ArrowRight className="text-black w-6 h-6 rotate-90" />
        </div>

        {/* User Applications Column */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex-1"
        >
          <div className="bg-gray-200 rounded-xl p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-center mb-1">用户应用</h3>
            <p className="text-xs sm:text-sm text-center mb-4">数据输出</p>
            
            <div className="space-y-3">
              {[
                { icon: <MonitorSmartphone className="text-black w-4 h-4 sm:w-5 sm:h-5" />, text: "分析仪表板" },
                { icon: <Smartphone className="text-black w-4 h-4 sm:w-5 sm:h-5" />, text: "移动应用" },
                { icon: <FileText className="text-black w-4 h-4 sm:w-5 sm:h-5" />, text: "自定义报告" },
                { icon: <Code className="text-black w-4 h-4 sm:w-5 sm:h-5" />, text: "第三方集成" }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-3 sm:p-4 flex items-center">
                  <div className="mr-3 sm:mr-4 flex-shrink-0">{item.icon}</div>
                  <span className="text-gray-800 font-medium text-xs sm:text-sm">{item.text}</span>
                </div>
              ))}
            </div>
            
            <p className="text-xs sm:text-sm text-center mt-4 sm:mt-6">
              人们如何与和<br />受益于收集的数据
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductPlatform;
