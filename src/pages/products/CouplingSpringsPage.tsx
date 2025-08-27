import React from 'react';
import ProductPage from '@/components/ProductPage';

const CouplingSpringsPage: React.FC = () => {
  return (
    <ProductPage 
      productKey="products.couplingsprings"
      image="/lovable-uploads/automotiveIndustry.jpeg"
      contentImage="/lovable-uploads/couplings.jpg"
      contentImagePosition="right"
      contentImageFit="contain"
      contentImageVAlign="top"
      rotateImage={false}
      imageScale={1.5}
      imagePosition="right"
    />
  );
};

export default CouplingSpringsPage;
