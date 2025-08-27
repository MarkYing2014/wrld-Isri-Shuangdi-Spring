import React from 'react';
import { useTranslation } from 'react-i18next';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

interface ProductPageProps {
  productKey: string;
  image: string;
  rotateImage?: boolean;
  imageScale?: number;
  imagePosition?: 'left' | 'center' | 'right' | 'top' | 'bottom';
  contentImage?: string;
  contentImagePosition?: 'left' | 'center' | 'right';
  contentImageFit?: 'cover' | 'contain';
  contentImageVAlign?: 'top' | 'center' | 'bottom';
}

interface Feature {
  title: string;
  description: string;
}

interface Stat {
  value: string;
  label: string;
}

const ProductPage: React.FC<ProductPageProps> = ({ productKey, image, rotateImage = false, imageScale = 1, imagePosition = 'center', contentImage, contentImagePosition = 'left', contentImageFit = 'cover', contentImageVAlign = 'center' }) => {
    const { t } = useTranslation();
    const features = (t(`${productKey}.features`, { returnObjects: true }) as Feature[]) || [];
    const stats = (t(`${productKey}.stats`, { returnObjects: true }) as Stat[]) || [];

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact-info');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <PageLayout>
      <section className="relative h-[400px] bg-gray-800 text-white flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={t(`${productKey}.title`)}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover opacity-40 ${rotateImage ? '-rotate-90' : ''}`}
          style={{
            width: `${imageScale * 100}%`,
            height: `${imageScale * 100}%`,
            objectPosition: imagePosition === 'left' ? 'left center' : imagePosition === 'right' ? 'right center' : imagePosition === 'top' ? 'center top' : imagePosition === 'bottom' ? 'center bottom' : 'center',
          }}
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold">{t(`${productKey}.title`)}</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">{t(`${productKey}.heroDescription`)}</p>
        </div>
      </section>

            <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-0 items-start">
            <div className="lg:col-span-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('products.featuresTitle')}</h2>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index}>
                    <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600 mt-2">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4">
              {contentImage && (
                <div className="w-full h-[360px] md:h-[420px] lg:h-[460px] overflow-hidden rounded-lg">
                  <img
                    src={contentImage}
                    alt={t(`${productKey}.title`)}
                    className={`w-full h-full ${contentImageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                    style={{
                      objectPosition: `${contentImagePosition === 'right' ? 'right' : contentImagePosition === 'center' ? 'center' : 'left'} ${contentImageVAlign === 'top' ? 'top' : contentImageVAlign === 'bottom' ? 'bottom' : 'center'}`
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg text-center shadow-sm">
                <p className="text-3xl md:text-4xl font-bold text-orange-500">{stat.value}</p>
                <p className="text-gray-600 mt-2 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('products.cta.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">{t('products.cta.description')}</p>
            <Button onClick={scrollToContact} className="inline-flex items-center px-8 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all group">
              {t('products.cta.button')}
              <MessageSquare className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
            </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default ProductPage;
