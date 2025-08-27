import React from 'react';
import ProductPage from '@/components/ProductPage';

const TensionSpringsPage: React.FC = () => {
  return (
    <ProductPage 
      productKey="products.tensionsprings"
      image="/lovable-uploads/Robot.jpeg"
      contentImage="/lovable-uploads/tensionsprings.jpg"
      contentImagePosition="right"
      contentImageFit="contain"
      contentImageVAlign="top"
      rotateImage={false}
      imageScale={1.5}
      imagePosition="right"
    />
  );
};

export default TensionSpringsPage;
