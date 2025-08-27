import React from 'react';
import ProductPage from '@/components/ProductPage';

const ValveSpringsPage: React.FC = () => {
  return (
    <ProductPage 
      productKey="products.valvesprings"
      image="/lovable-uploads/sportcar.jpeg"
      contentImage="/lovable-uploads/valvesprings.jpg"
      contentImagePosition="right"
      contentImageFit="contain"
      contentImageVAlign="top"
      rotateImage={false}
      imageScale={1.5}
      imagePosition="right"
    />
  );
};

export default ValveSpringsPage;
