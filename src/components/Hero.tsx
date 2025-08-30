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
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // Function to handle video play with multiple fallback attempts
  const playVideoWithFallback = async () => {
    if (!videoRef.current) return;

    // Ensure video is muted (required for autoplay)
    videoRef.current.muted = true;
    
    // Try to play immediately
    try {
      await videoRef.current.play();
    } catch (e) {
      console.log('Initial play failed, trying fallback...');
      
      // Fallback 1: Try with a small delay
      setTimeout(async () => {
        try {
          await videoRef.current?.play();
        } catch (e) {
          console.log('First fallback failed, trying second fallback...');
          
          // Fallback 2: Try with a longer delay
          setTimeout(async () => {
            try {
              await videoRef.current?.play();
            } catch (e) {
              console.log('All autoplay attempts failed');
            }
          }, 1000);
        }
      }, 500);
    }
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
      
      if (videoRef.current) {
        playVideoWithFallback();
      }
    };
    
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isMobile]);
  
  // Initialize audio context to help with autoplay
  useEffect(() => {
    // Create an audio context to help with autoplay restrictions
    const initAudioContext = async () => {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContext) {
          const audioContext = new AudioContext();
          if (audioContext.state === 'suspended') {
            await audioContext.resume();
          }
        }
      } catch (e) {
        console.log('AudioContext error:', e);
      }
    };

    // Initialize audio context on user interaction
    const handleInteraction = () => {
      initAudioContext();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };

    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('touchstart', handleInteraction, { once: true });

    // Also try to initialize immediately
    initAudioContext();
  }, []);

  // Try to autoplay when component mounts
  useEffect(() => {
    if (!videoRef.current) return;

    // Set up video attributes for autoplay
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

    // First attempt to play
    playVideoWithFallback();

    // Try again when page becomes visible (e.g., after tab switch)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        playVideoWithFallback();
      }
    };

    // Try again when the video is scrolled into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          playVideoWithFallback();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(video);
    
    // Add a one-time touch event listener as last resort
    const handleFirstTouch = () => {
      playVideoWithFallback();
      document.removeEventListener('touchstart', handleFirstTouch);
    };
    
    document.addEventListener('touchstart', handleFirstTouch, { once: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Cleanup
    return () => {
      observer.disconnect();
      document.removeEventListener('touchstart', handleFirstTouch);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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
            <video 
              ref={videoRef}
              autoPlay={true}
              loop
              muted
              playsInline
              webkit-playsinline="true"
              x5-playsinline="true"
              x5-video-player-type="h5"
              x5-video-player-fullscreen="true"
              x5-video-orientation="portrait"
              preload="auto"
              disablePictureInPicture
              className="w-full h-full object-cover opacity-70 grayscale object-center"
              poster="/lovable-uploads/logoFinal.png"
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
              onLoadedData={async () => {
                // Force play when video is loaded
                if (videoRef.current) {
                  try {
                    // Try to play immediately
                    await videoRef.current.play();
                    
                    // If we get here, play was successful
                    console.log('Video is playing!');
                    
                  } catch (e) {
                    console.log('Autoplay prevented, will try with audio context');
                    
                    // Try to create and resume audio context
                    try {
                      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
                      if (AudioContext) {
                        const audioContext = new AudioContext();
                        if (audioContext.state === 'suspended') {
                          await audioContext.resume();
                        }
                      }
                      
                      // Try to play again after audio context is ready
                      await videoRef.current.play();
                      console.log('Video started after audio context resume');
                      
                    } catch (e2) {
                      console.log('Second attempt failed, will try one more time');
                      
                      // Final attempt with a delay
                      setTimeout(async () => {
                        try {
                          await videoRef.current?.play();
                          console.log('Video started after delay');
                        } catch (e3) {
                          console.error('All autoplay attempts failed:', e3);
                        }
                      }, 1000);
                    }
                  }
                }
              }}
            >
              <source src="/lovable-uploads/SpringManu.mp4" type="video/mp4" />
              {/* Fallback image if video fails to load */}
              <img 
                src="/lovable-uploads/logoFinal.png" 
                alt={t('hero.feature2.title')} 
                className={`w-full h-full object-cover opacity-70 grayscale ${isMobile ? 'object-right' : 'object-center'}`} 
              />
            </video>
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
