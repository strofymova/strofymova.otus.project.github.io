import React from 'react';
import Layout from '../../widgets/layout/Layout';
import ProductLayoutContainer from '../../widgets/product/product_layout/ProductLayoutContainer';

const Products: React.FC = React.memo(() => (
  <Layout>
    <ProductLayoutContainer infinityScroll={false} />
  </Layout>
));
Products.displayName = 'Products';
export default Products;
