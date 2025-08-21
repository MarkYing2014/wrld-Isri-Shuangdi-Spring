import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import { useScrollHijack } from '../hooks/useScrollHijack';

const Products = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isHijacked, currentIndex } = useScrollHijack(sectionRef, 6);

  const containerVariant = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        duration: 0.3,
      },
    },
  };

  const itemVariant = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeInOut' as const,
      },
    },
  };

  const progressVariant = {
    hidden: { width: '0%' },
    visible: {
      width: '100%',
      transition: {
        duration: 2,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      ref={sectionRef}
      className="min-h-screen bg-gray-50 py-20"
      initial="hidden"
      animate="visible"
      variants={containerVariant}
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12"
          variants={itemVariant}
        >
          产品中心
        </motion.h1>

        {isHijacked && (
          <div className="text-center text-red-500 mb-4">
            Scrolling is hijacked!
          </div>
        )}

        <div className="text-center text-gray-500 mb-4">
          Current Index: {currentIndex}
        </div>

        <motion.div
          className="h-1 bg-blue-500 mb-8"
          variants={progressVariant}
        />

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariant}
        >
          {[
            {
              title: '智能借阅系统',
              description: '基于AI技术的智能借阅管理系统，支持人脸识别、自动借还书等功能',
              features: ['人脸识别借书', '自动归还提醒', '智能推荐'],
              icon: <Cpu className="w-5 h-5 md:w-6 md:h-6" />,
              bgColor: 'from-blue-200 to-cyan-200',
              image: '/asset/borrowAI.jpeg',
            },
            {
              title: '智能图书管理平台',
              description: '全面的图书馆管理平台，包含图书采购、编目、流通等全流程管理',
              features: ['图书编目', '库存管理', '数据分析'],
              icon: '📚',
              bgColor: 'from-green-200 to-emerald-200',
              image: '/asset/library.jpeg',
            },
            {
              title: '智能校园一卡通集成',
              description: '与校园一卡通系统无缝集成，实现统一身份认证和消费管理',
              features: ['身份认证', '消费记录', '权限管理'],
              icon: <Cpu className="w-5 h-5 md:w-6 md:h-6" />,
              bgColor: 'from-purple-200 to-violet-200',
              image: '/asset/oneCard.jpeg',
            },
            {
              title: '智能移动端应用',
              description: '支持iOS和Android的移动应用，方便用户随时查询和预约图书',
              features: ['在线预约', '续借服务', '消息推送'],
              icon: '📱',
              bgColor: 'from-pink-200 to-rose-200',
              image: '/asset/mobile.jpeg',
            },
            {
              title: '智能数据分析系统',
              description: '强大的数据分析功能，为图书馆决策提供科学依据',
              features: ['借阅统计', '用户画像', '趋势分析'],
              icon: '📊',
              bgColor: 'from-indigo-200 to-blue-200',
              image: '/asset/data.jpeg',
            },
            {
              title: '智能云端备份服务',
              description: '安全可靠的云端数据备份服务，确保数据安全和业务连续性',
              features: ['自动备份', '灾难恢复', '数据同步'],
              icon: '☁️',
              bgColor: 'from-teal-200 to-cyan-200',
              image: '/asset/cloud.jpeg',
            },
          ].map((product, index) => (
            <motion.div
              key={index}
              className="bg-blue-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out transform"
              variants={itemVariant}
            >
              <div
                className={`h-48 bg-gradient-to-br ${product.bgColor} flex items-center justify-center transition-all duration-300 relative overflow-hidden`}
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white text-6xl transition-transform duration-300 hover:scale-110">
                    {product.icon}
                  </span>
                )}
              </div>
              <motion.div
                className="h-1 bg-blue-500"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {product.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {product.description}
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    主要功能：
                  </h4>
                  <ul className="space-y-1">
                    {product.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-600 flex items-center"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
                  了解更多
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Products;
