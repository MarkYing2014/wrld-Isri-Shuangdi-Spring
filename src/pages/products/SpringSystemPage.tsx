import React from 'react';
import ProductPage from '@/components/ProductPage';

const SpringSystemPage: React.FC = () => {
  return (
    <ProductPage 
      productKey="products.springsystem"
      image="/lovable-uploads/RoboticPic.jpg"
      contentImage="/lovable-uploads/SpringSystem.jpg"
      contentImagePosition="right"
      contentImageFit="contain"
      contentImageVAlign="top"
      rotateImage={false}
      imageScale={1.5}
      imagePosition="right"
     
    />
  );
};

export default SpringSystemPage;
