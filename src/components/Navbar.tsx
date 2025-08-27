
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(true);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLanguageDropdownOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
        const tryPlayVideo = async () => {
            try {
                await video.play();
                console.log('Video playing successfully');
                setNeedsInteraction(false);
            } catch (error) {
                console.log('Video autoplay prevented, needs user interaction');
                setNeedsInteraction(true);
            }
        };

        const handleCanPlay = () => {
            tryPlayVideo();
        };

        const handleLoadedData = () => {
            tryPlayVideo();
        };

        // Global click handler to enable video after any user interaction
        const handleUserInteraction = () => {
            if (needsInteraction) {
                tryPlayVideo();
            }
        };

        // Try to play immediately
        tryPlayVideo();

        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('canplay', handleCanPlay);
        
        // Listen for any user interaction on the document
        document.addEventListener('click', handleUserInteraction);
        document.addEventListener('touchstart', handleUserInteraction);

        // Cleanup
        return () => {
            video.removeEventListener('loadeddata', handleLoadedData);
            video.removeEventListener('canplay', handleCanPlay);
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('touchstart', handleUserInteraction);
        };
    }
}, [needsInteraction]);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full", isScrolled ? "bg-white shadow-sm" : "bg-black")} initial={{
      opacity: 1,
      y: 0
    }} animate={{
      opacity: 1,
      y: 0
    }}>
      <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src="/lovable-uploads/logoFinal.png" alt="ISRI Shuangdi Springs Logo" className={cn("h-8 w-auto rounded px-2 py-1", isScrolled ? "" : "bg-black")} />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu className={cn(isScrolled ? "" : "text-white")}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                      {t('nav.home')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/about">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                      {t('nav.about')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn(isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                    {t('nav.products')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px]">
                      <li>
                        <Link to="/products/coupling-springs" className="block p-3 space-y-1 rounded-md hover:bg-gray-100">
                          <div className="font-medium">{t('products.couplingsprings.title')}</div>
                          <p className="text-sm text-gray-500">{t('products.couplingsprings.description')}</p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/products/bow-springs" className="block p-3 space-y-1 rounded-md hover:bg-gray-100">
                          <div className="font-medium">{t('products.bowsprings.title')}</div>
                          <p className="text-sm text-gray-500">{t('products.bowsprings.description')}</p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/products/torsion-springs" className="block p-3 space-y-1 rounded-md hover:bg-gray-100">
                          <div className="font-medium">{t('products.torsionsprings.title')}</div>
                          <p className="text-sm text-gray-500">{t('products.torsionsprings.description')}</p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/products/tension-springs" className="block p-3 space-y-1 rounded-md hover:bg-gray-100">
                          <div className="font-medium">{t('products.tensionsprings.title')}</div>
                          <p className="text-sm text-gray-500">{t('products.tensionsprings.description')}</p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/products/spring-system" className="block p-3 space-y-1 rounded-md hover:bg-gray-100">
                          <div className="font-medium">{t('products.springsystem.title')}</div>
                          <p className="text-sm text-gray-500">{t('products.springsystem.description')}</p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/products/valve-springs" className="block p-3 space-y-1 rounded-md hover:bg-gray-100">
                          <div className="font-medium">{t('products.valvesprings.title')}</div>
                          <p className="text-sm text-gray-500">{t('products.valvesprings.description')}</p>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/careers">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                      {t('nav.careers')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <button onClick={() => scrollToSection('contact')} className={cn(navigationMenuTriggerStyle(), isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                    {t('nav.contact')}
                  </button>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/blog">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), isScrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-100 hover:text-white bg-transparent hover:bg-gray-800")}>
                      {t('nav.blog')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                {/* Language Switcher - Custom Dropdown */}
                <div className="relative" ref={languageDropdownRef}>
                  <button
                    onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isScrolled ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100" : "text-gray-100 hover:text-white hover:bg-gray-800"
                    )}
                  >
                    <Globe className="w-4 h-4" />
                    {t('nav.language')}
                    <ChevronDown className={cn("w-4 h-4 transition-transform", isLanguageDropdownOpen ? "rotate-180" : "")} />
                  </button>
                  
                  {isLanguageDropdownOpen && (
                    <div className={cn(
                      "absolute right-0 top-full mt-1 w-32 rounded-md shadow-lg z-50",
                      isScrolled ? "bg-white border border-gray-200" : "bg-gray-800 border border-gray-700"
                    )}>
                      <div className="py-1">
                        <button
                          onClick={() => changeLanguage('zh')}
                          className={cn(
                            "w-full text-left px-3 py-2 text-sm transition-colors",
                            i18n.language === 'zh' 
                              ? (isScrolled ? "bg-gray-100 text-gray-900" : "bg-gray-700 text-white")
                              : (isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-700")
                          )}
                        >
                          {t('languages.chinese')}
                        </button>
                        <button
                          onClick={() => changeLanguage('en')}
                          className={cn(
                            "w-full text-left px-3 py-2 text-sm transition-colors",
                            i18n.language === 'en' 
                              ? (isScrolled ? "bg-gray-100 text-gray-900" : "bg-gray-700 text-white")
                              : (isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-700")
                          )}
                        >
                          {t('languages.english')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className={cn("focus:outline-none", isScrolled ? "text-gray-700" : "text-white")}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Reduced height and simplified */}
      <div className={cn("md:hidden transition-all duration-300 overflow-hidden w-full", isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0")}>
        <div className={cn("px-3 pt-2 pb-3 space-y-1 shadow-sm overflow-y-auto max-h-80", isScrolled ? "bg-white" : "bg-black")}>
          <Link to="/" className={cn("block px-3 py-1.5 rounded-md text-sm", isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-900")} onClick={() => {
            setIsMenuOpen(false);
            window.scrollTo(0, 0);
          }}>
            {t('nav.home')}
          </Link>
          
          <Link to="/about" className={cn("block px-3 py-1.5 rounded-md text-sm", isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-900")} onClick={() => {
            setIsMenuOpen(false);
            window.scrollTo(0, 0);
          }}>
            {t('nav.about')}
          </Link>
          
          {/* Products - simplified for mobile */}
          <div className={cn("px-3 py-1.5 text-sm", isScrolled ? "text-gray-700" : "text-gray-200")}>
            <div className="font-medium mb-1">{t('nav.products')}</div>
            <div className="ml-2 space-y-1">
              <Link to="/products/coupling-springs" className={cn("block px-2 py-1 rounded text-xs", isScrolled ? "text-gray-600 hover:bg-gray-50" : "text-gray-300 hover:bg-gray-800")} onClick={() => {
                setIsMenuOpen(false);
                window.scrollTo(0, 0);
              }}>
                {t('products.couplingsprings.title')}
              </Link>
              <Link to="/products/bow-springs" className={cn("block px-2 py-1 rounded text-xs", isScrolled ? "text-gray-600 hover:bg-gray-50" : "text-gray-300 hover:bg-gray-800")} onClick={() => {
                setIsMenuOpen(false);
                window.scrollTo(0, 0);
              }}>
                {t('products.bowsprings.title')}
              </Link>
              <Link to="/products/torsion-springs" className={cn("block px-2 py-1 rounded text-xs", isScrolled ? "text-gray-600 hover:bg-gray-50" : "text-gray-300 hover:bg-gray-800")} onClick={() => {
                setIsMenuOpen(false);
                window.scrollTo(0, 0);
              }}>
                {t('products.torsionsprings.title')}
              </Link>
              <Link to="/products/tension-springs" className={cn("block px-2 py-1 rounded text-xs", isScrolled ? "text-gray-600 hover:bg-gray-50" : "text-gray-300 hover:bg-gray-800")} onClick={() => {
                setIsMenuOpen(false);
                window.scrollTo(0, 0);
              }}>
                {t('products.tensionsprings.title')}
              </Link>
              <Link to="/products/spring-system" className={cn("block px-2 py-1 rounded text-xs", isScrolled ? "text-gray-600 hover:bg-gray-50" : "text-gray-300 hover:bg-gray-800")} onClick={() => {
                setIsMenuOpen(false);
                window.scrollTo(0, 0);
              }}>
                {t('products.springsystem.title')}
              </Link>
              <Link to="/products/valve-springs" className={cn("block px-2 py-1 rounded text-xs", isScrolled ? "text-gray-600 hover:bg-gray-50" : "text-gray-300 hover:bg-gray-800")} onClick={() => {
                setIsMenuOpen(false);
                window.scrollTo(0, 0);
              }}>
                {t('products.valvesprings.title')}
              </Link>
            </div>
          </div>
          
          <Link to="/careers" className={cn("block px-3 py-1.5 rounded-md text-sm", isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-900")} onClick={() => {
            setIsMenuOpen(false);
            window.scrollTo(0, 0);
          }}>
            {t('nav.careers')}
          </Link>
          
          <button onClick={() => scrollToSection('contact')} className={cn("block w-full text-left px-3 py-1.5 rounded-md text-sm", isScrolled ? "text-gray-700 bg-gray-200 hover:bg-gray-300" : "text-white bg-gray-700 hover:bg-gray-600")}>
            {t('nav.contact')}
          </button>
          
          <Link to="/blog" className={cn("block px-3 py-1.5 rounded-md text-sm", isScrolled ? "text-gray-700 hover:bg-gray-50" : "text-gray-200 hover:bg-gray-900")} onClick={() => {
            setIsMenuOpen(false);
            window.scrollTo(0, 0);
          }}>
            {t('nav.blog')}
          </Link>
          
          {/* Mobile Language Switcher */}
          <div className={cn("px-3 py-1.5 text-sm", isScrolled ? "text-gray-700" : "text-gray-200")}>
            <div className="font-medium mb-1">{t('nav.language')}</div>
            <div className="flex gap-2">
              <button 
                onClick={() => changeLanguage('zh')}
                className={cn("px-2 py-1 rounded text-xs", 
                  isScrolled ? "bg-gray-100 hover:bg-gray-200" : "bg-gray-800 hover:bg-gray-700",
                  i18n.language === 'zh' ? (isScrolled ? 'bg-gray-200' : 'bg-gray-600') : ''
                )}
              >
                {t('languages.chinese')}
              </button>
              <button 
                onClick={() => changeLanguage('en')}
                className={cn("px-2 py-1 rounded text-xs", 
                  isScrolled ? "bg-gray-100 hover:bg-gray-200" : "bg-gray-800 hover:bg-gray-700",
                  i18n.language === 'en' ? (isScrolled ? 'bg-gray-200' : 'bg-gray-600') : ''
                )}
              >
                {t('languages.english')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
