import React from 'react';
import ProductPage from '@/components/ProductPage';

const TorsionSpringsPage: React.FC = () => {
  return (
    <ProductPage 
      productKey="products.torsionsprings"
      image="/lovable-uploads/EnergyIndusty.jpeg"
      contentImage="/lovable-uploads/torsionspring.jpg"
      contentImagePosition="right"
      contentImageFit="contain"
      contentImageVAlign="top"
      rotateImage={false}
      imageScale={1.5}
      imagePosition="right"
    />
  );
};

export default TorsionSpringsPage;
