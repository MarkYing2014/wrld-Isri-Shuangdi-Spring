import React from 'react';
import ProductPage from '@/components/ProductPage';

const BowSpringsPage: React.FC = () => {
  return (
    <ProductPage 
      productKey="products.bowsprings"
      image="/lovable-uploads/areospace.jpeg"
      contentImage="/lovable-uploads/bowspring.jpg"
      contentImagePosition="right"
      contentImageFit="contain"
      contentImageVAlign="top"
      rotateImage={false}
      imageScale={1.5}
      imagePosition="right"
    />
  );
};

export default BowSpringsPage;
