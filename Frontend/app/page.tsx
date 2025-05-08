import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { HowItWorks } from '@/components/how-it-works';
import { CTA } from '@/components/cta';

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
    </div>
  );
}