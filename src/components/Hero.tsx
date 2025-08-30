import { ArrowRight, Code, Cpu, Layers, MessageSquare } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useRef, useEffect, useState } from 'react';

const Hero = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Function to handle play button click
  const handlePlayClick = () => {
    setShowVideo(true);
    // Small delay to ensure state updates before playing
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.play().catch(e => {
          console.error('Failed to play video:', e);
          setShowVideo(false);
        });
      }
    }, 50);
  };
  
  // Listen for cookie acceptance to trigger video play
  useEffect(() => {
    const handleCookieAccept = () => {
      if (isMobile && videoRef.current) {
        videoRef.current.play().catch(console.error);
      }
    };
    
    // Listen for clicks on the cookie accept button
    const cookieButton = document.querySelector('.cookie-consent__agree');
    if (cookieButton) {
      cookieButton.addEventListener('click', handleCookieAccept);
    }
    
    // Cleanup
    return () => {
      if (cookieButton) {
        cookieButton.removeEventListener('click', handleCookieAccept);
      }
    };
  }, [isMobile]);
  
  // Handle document click for mobile
  useEffect(() => {
    if (!isMobile) return;
    
    const handleDocumentClick = (e: MouseEvent) => {
      // Don't handle clicks on interactive elements
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, select, textarea')) {
        return;
      }
      
      // This will be handled by the play button now
    };
    
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isMobile]);
  
  // Try to autoplay on desktop, show play button on mobile
  useEffect(() => {
    if (!isMobile && videoRef.current) {
      // On desktop, try to autoplay
      const playVideo = async () => {
        try {
          videoRef.current!.muted = true;
          await videoRef.current!.play();
          setShowVideo(true);
        } catch (e) {
          console.log('Desktop autoplay failed, showing play button');
          setShowVideo(false);
        }
      };
      
      playVideo();
    } else {
      // On mobile, show play button by default
      setShowVideo(false);
    }
  }, [isMobile]);

  // Set up video attributes
  useEffect(() => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('x5-playsinline', 'true');
    video.setAttribute('x5-video-player-type', 'h5');
    video.setAttribute('x5-video-player-fullscreen', 'true');
    video.setAttribute('x5-video-orientation', 'portrait');
    video.preload = 'auto';
    
    // Try to play on desktop
    if (!isMobile) {
      video.play().catch(console.error);
    }
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !isMobile) {
        video.play().catch(console.error);
      }
    };

    // Try again when the video is scrolled into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isMobile) {
          videoRef.current?.play().catch(console.error);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(video);
    
    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
    };
  }, []);
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        duration: 0.8
      }
    }
  };
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };
  
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  
  return <motion.div className="relative w-full" initial="hidden" animate="visible" variants={containerVariants}>
      <div className="banner-container bg-black relative overflow-hidden h-[50vh] sm:h-[60vh] md:h-[500px] lg:h-[550px] xl:h-[600px] w-full">
        <div className="absolute inset-0 bg-black w-full">
          <div className="relative w-full h-full">
            {showVideo ? (
              <video 
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                webkit-playsinline="true"
                x5-playsinline="true"
                x5-video-player-type="h5"
                x5-video-player-fullscreen="true"
                x5-video-orientation="portrait"
                className="w-full h-full object-cover opacity-70 grayscale object-center"
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 1,
                  backgroundColor: 'black',
                  WebkitUserSelect: 'none',
                  WebkitTouchCallout: 'none',
                  WebkitTapHighlightColor: 'transparent'
                }}
                onPlay={() => setShowVideo(true)}
                onPause={() => !isMobile && setShowVideo(false)}
                onClick={!isMobile ? () => videoRef.current?.paused ? videoRef.current?.play() : videoRef.current?.pause() : undefined}
              >
                <source src="/lovable-uploads/SpringManu.mp4" type="video/mp4" />
                <img 
                  src="/lovable-uploads/logoFinal.png" 
                  alt={t('hero.feature2.title')} 
                  className={`w-full h-full object-cover opacity-70 grayscale ${isMobile ? 'object-right' : 'object-center'}`} 
                />
              </video>
            ) : (
              <div 
                className="relative w-full h-full cursor-pointer"
                onClick={handlePlayClick}
                onMouseEnter={() => !isMobile && setIsHovered(true)}
                onMouseLeave={() => !isMobile && setIsHovered(false)}
              >
                <img 
                  src="/lovable-uploads/logoFinal.png" 
                  alt={t('hero.feature2.title')} 
                  className="w-full h-full object-cover opacity-70 grayscale"
                  style={{
                    objectPosition: isMobile ? 'right' : 'center',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300"
                  style={{ opacity: isHovered ? 1 : 0.8 }}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg 
                      className="w-8 h-8 sm:w-10 sm:h-10 text-white" 
                      fill="currentColor" 
                      viewBox="0 0 20 20" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-white"></div>
        </div>
        
        <div className="banner-overlay bg-transparent pt-20 sm:pt-24 md:pt-32 w-full">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full">
            <motion.div className="w-full max-w-4xl text-center" variants={itemVariants}>
              <motion.h1 className="banner-title text-orange-500" variants={itemVariants}>{t('hero.title')}</motion.h1>
              <motion.p className="banner-subtitle text-gray-300 mt-4 sm:mt-6" variants={itemVariants}>
                {t('hero.subtitle')}
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center items-center" variants={itemVariants}>
                {/* Styled as a button but using an anchor tag for project navigation */}
                <button 
                  className="w-full sm:w-auto min-h-[44px] px-6 sm:px-8 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all shadow-lg hover:shadow-xl hover:shadow-gray-300/20 flex items-center justify-center group text-sm sm:text-base font-medium"
                  onClick={e => {
                    e.preventDefault();
                    const projectsSection = document.getElementById('projects');
                    if (projectsSection) {
                      projectsSection.scrollIntoView({
                        behavior: 'smooth'
                      });
                    }
                  }}
                >
                  {t('hero.exploreProjects')}
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                {/* Using the Button component from shadcn but with custom styling to match the explore button */}
                <button 
                  className="w-full sm:w-auto min-h-[44px] px-6 sm:px-8 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:shadow-gray-300/20 flex items-center justify-center group text-sm sm:text-base font-medium"
                  onClick={scrollToContact}
                >
                  {t('hero.contactUs')}
                  <MessageSquare className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4" variants={containerVariants} initial="hidden" animate="visible" transition={{
        delay: 0.6
      }}>
          <motion.div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-100 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md" variants={itemVariants}>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 flex items-center justify-center rounded-lg text-gray-500 mb-2 md:mb-3">
              <Cpu className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-orange-400">{t('hero.feature1.title')}</h3>
            <p className="text-gray-600 text-xs md:text-sm">{t('hero.feature1.description')}</p>
          </motion.div>
          
          <motion.div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-100 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md" variants={itemVariants}>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 flex items-center justify-center rounded-lg text-gray-500 mb-2 md:mb-3">
              <Code className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-orange-400">{t('hero.feature2.title')}</h3>
            <p className="text-gray-600 text-xs md:text-sm">{t('hero.feature2.description')}</p>
          </motion.div>
          
          <motion.div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-100 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md" variants={itemVariants}>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 flex items-center justify-center rounded-lg text-gray-500 mb-2 md:mb-3">
              <Layers className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-orange-400">{t('hero.feature3.title')}</h3>
            <p className="text-gray-600 text-xs md:text-sm">{t('hero.feature3.description')}</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>;
};

export default Hero;
