'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/user/Hero';
import FeaturedProducts from '@/components/user/FeaturedProducts';
import PromotionBanner from '@/components/user/PromotionBanner';
import LazyLoad from '@/components/common/LazyLoad';
import { withPageLoading } from '@/hoc/withPageLoading';

const Categories = dynamic(() => import('@/components/user/Categories'), {
  ssr: false,
});
const Testimonials = dynamic(() => import('@/components/user/Testimonials'), {
  ssr: false,
});
const Newsletter = dynamic(() => import('@/components/user/Newsletter'), {
  ssr: false,
});

function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <PromotionBanner />
      <LazyLoad>
        <Categories />
      </LazyLoad>
      <LazyLoad>
        <Testimonials />
      </LazyLoad>
      <LazyLoad>
        <Newsletter />
      </LazyLoad>
    </>
  );
}

export default withPageLoading(HomePage);
