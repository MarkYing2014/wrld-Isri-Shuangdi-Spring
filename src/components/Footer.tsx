
import { ArrowRight, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import emailjs from 'emailjs-com';

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: t('footer.toastError'),
        description: t('footer.emailRequired'),
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // EmailJS configuration
      const EMAILJS_SERVICE_ID = "service_dca804k";
      const EMAILJS_TEMPLATE_ID = "template_qsl8rhw";
      const EMAILJS_PUBLIC_KEY = "kX8Atk8WtRgGgR6IO";
      
      // Initialize EmailJS with your public key
      // Note: In emailjs-com, init is not required before send
      // The public key is passed directly to the send method
      
      const templateParams = {
        email: email, // The only variable used in the template
        to_email: 'yingwl@msn.com',
        reply_to: email
      };
      
      // Template variables:
      // - {{email}} - Subscriber's email address
      
      console.log('Template parameters:', templateParams);
      
      console.log('Sending email with params:', {
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        template_params: templateParams,
        user_id: EMAILJS_PUBLIC_KEY
      });
      
      // Use the send method with the service ID and template ID
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      
      console.log('EmailJS response:', response);
      
      toast({
        title: t('footer.toastSuccess'),
        description: t('footer.subscribeSuccess'),
        variant: "default"
      });
      
      setEmail("");
    } catch (error) {
      console.error("Detailed error:", {
        name: error?.name,
        message: error?.message,
        status: error?.status,
        response: error?.response,
        stack: error?.stack
      });
      
      let errorMessage = t('footer.subscribeError');
      
      // Add more specific error messages based on the error type
      if (error instanceof Error) {
        console.log('Error details:', {
          message: error.message,
          status: (error as any)?.status,
          response: (error as any)?.response?.data
        });
        
        if (error.message.includes('Network Error')) {
          errorMessage = '无法连接到邮件服务，请检查网络连接';
        } else if (error.message.includes('400')) {
          errorMessage = '请求格式错误，请检查邮箱地址是否正确';
        } else if (error.message.includes('401') || error.message.includes('403')) {
          errorMessage = '认证失败，请联系网站管理员';
        } else if (error.message.includes('429')) {
          errorMessage = '请求过于频繁，请稍后再试';
        } else if (error.message.includes('500')) {
          errorMessage = '服务器内部错误，请稍后再试';
        }
      }
      
      toast({
        title: t('footer.toastError'),
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="bg-black text-white pt-16 pb-8 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 pb-10 border-b border-gray-700">
          <div className="lg:col-span-2">
            <img 
              src="/lovable-uploads/logoFinal.png" 
              alt={t('footer.logoAlt')} 
              className="h-10 w-auto mb-6"
            />
            <p className="text-gray-300 mb-6">
              {t('footer.description1')}
            </p>
            <p className="text-gray-300 mb-6">
              {t('footer.description2')}
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/company/wrldstechnologies/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">{t('footer.company')}</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">{t('footer.aboutUs')}</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-white transition-colors">{t('footer.careers')}</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">{t('footer.privacyPolicy')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">{t('footer.contactUs')}</h3>
            <form className="space-y-4" onSubmit={handleSubscribe}>
              <div>
                <input 
                  type="email" 
                  placeholder={t('footer.emailPlaceholder')} 
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 text-white placeholder-gray-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <button 
                type="submit" 
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? t('footer.subscribing') : (
                  <>
                    {t('footer.subscribe')}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} {t('seo.companyName')}. {t('footer.copyright')}.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">{t('footer.privacyPolicy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
