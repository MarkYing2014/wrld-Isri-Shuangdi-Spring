import { ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
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
              {t('about.backToHome')}
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl md:text-5xl font-bold mb-6"
                >
                  {t('about.title')}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg text-gray-600 mb-4"
                >
                  {t('about.subtitle')}
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-base text-gray-600 leading-relaxed"
                >
                  {t('about.description')}
                </motion.p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center lg:justify-end"
              >
                <img 
                  src="/lovable-uploads/Factory.png" 
                  alt="ISRI-Shuangdi Spring Factory"
                  className="w-full max-w-md rounded-xl shadow-lg"
                />
              </motion.div>
            </div>
            
            
            {/* Mission Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-16 text-center"
            >
              <h2 className="text-3xl font-bold mb-6">{t('about.mission.title')}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t('about.mission.description')}
              </p>
            </motion.div>
            
            {/* Capabilities Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-center mb-12">{t('about.capabilities.title')}</h2>
              <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm max-w-4xl mx-auto">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                  {(t('about.capabilities.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold text-center mb-12">{t('about.story.title')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center group"
                  >
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl font-bold text-orange-600">1919</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">{t('about.story.heritage.title')}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {t('about.story.heritage.description')}
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="text-center group"
                  >
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">🤝</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">{t('about.story.partnership.title')}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {t('about.story.partnership.description')}
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="text-center group"
                  >
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">{t('about.story.innovation.title')}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {t('about.story.innovation.description')}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold mb-6">{t('about.team.title')}</h2>
                <p className="text-gray-600 mb-6">
                  {t('about.team.description')}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      key: "christoph-krone",
                      image: "/lovable-uploads/krone.jpg"
                    },
                    {
                      key: "niek",
                      image: "/lovable-uploads/e502f601-c519-43a8-86f5-5fa89ae50d2f.png"
                    },
                    {
                      key: "chengjie",
                      image: "/lovable-uploads/3de85ddd-15e1-4216-9697-f91abb9a47ce.png"
                    },
                    {
                      key: "love",
                      image: "/lovable-uploads/a9bb9110-964a-43b0-a5ab-7162140cd133.png"
                    }
                  ].map((member, i) => (
                    <Card key={i} className="bg-gray-50 border border-gray-100 overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-32 h-32 relative mb-4 rounded-full overflow-hidden">
                            <img 
                              src={member.image} 
                              alt={t(`about.team.members.${member.key}.name`)} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-1">{t(`about.team.members.${member.key}.name`)}</h3>
                          <p className="text-sm text-orange-600 font-medium mb-3">{t(`about.team.members.${member.key}.role`)}</p>
                          <p className="text-sm text-gray-600 leading-relaxed">{t(`about.team.members.${member.key}.bio`)}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>

              {/* Address Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mb-16 bg-gray-50 p-8 rounded-xl"
              >
                <h2 className="text-3xl font-bold mb-6">{t('about.address.title')}</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {t('about.address.content')}
                </p>
              </motion.div>
            
            <div className="mt-16 pt-8 border-t border-gray-200">
              <Link to="/careers" className="inline-flex items-center px-5 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all group">
                {t('about.team.joinTeam')}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
