import Breadcrumb from '@/components/user/Breadcrumb';
import ContactInfo from '@/components/user/contact/ContactHero';
import ContactHero from '@/components/user/contact/ContactHero';
import ContactForm from '@/components/user/contact/ContactInfo';
import ContactMap from '@/components/user/contact/ContactMap';
import Newsletter from '@/components/user/Newsletter';
import { withPageLoading } from '@/hoc/withPageLoading';

function ContactPage() {
  const breadcrumbItems = [{ label: 'Liên hệ' }];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <ContactMap />
      <Newsletter />
    </div>
  );
}

export default withPageLoading(ContactPage);
