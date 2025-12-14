import AboutHero from '@/components/user/about/AboutHero';
import BrandStory from '@/components/user/about/BrandStory';
import TeamSection from '@/components/user/about/TeamSection';
import Milestones from '@/components/user/about/Milestones';
import AboutCTA from '@/components/user/about/AboutCTA';
import Breadcrumb from '@/components/user/Breadcrumb';
import Testimonials from '@/components/user/Testimonials';
import { withPageLoading } from '@/hoc/withPageLoading';

function AboutPage() {
  const breadcrumbItems = [{ label: 'Giới thiệu' }];

  return (
    <div className="min-h-screen bg-gray-50">
      <AboutHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <BrandStory />
      <TeamSection />
      <Milestones />
      <Testimonials />
      <AboutCTA />
    </div>
  );
}

export default withPageLoading(AboutPage);
