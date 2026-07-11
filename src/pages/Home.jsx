import Hero from '../components/Hero';
import AdsCarousel from '../components/AdsCarousel';
import GlobalNetwork from '../components/GlobalNetwork';
import MembershipBenefits from '../components/MembershipBenefits';
import NewsSection from '../components/NewsSection';
import StatsSection from '../components/StatsSection';
import SocialSection from '../components/SocialSection';
import CTASection from '../components/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <AdsCarousel />
      <NewsSection />
      <GlobalNetwork />
      <MembershipBenefits />
      <StatsSection />
      <SocialSection />
      <CTASection />
    </>
  );
}
