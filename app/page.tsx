import { MarketingNav } from '@/components/marketing/nav';
import { Hero } from '@/components/marketing/hero';
import { Features } from '@/components/marketing/features';
import { Workflow } from '@/components/marketing/workflow';
import { Pricing } from '@/components/marketing/pricing';
import { Testimonials } from '@/components/marketing/testimonials';
import { Faq } from '@/components/marketing/faq';
import { CtaBanner } from '@/components/marketing/cta-banner';
import { Footer } from '@/components/marketing/footer';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <MarketingNav />
      <main>
        <Hero />
        <Features />
        <Workflow />
        <Pricing />
        <Testimonials />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
