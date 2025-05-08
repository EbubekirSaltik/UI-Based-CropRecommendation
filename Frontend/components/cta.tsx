import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-8 md:mb-0 md:max-w-lg">
            <h2 className="text-3xl font-bold mb-4">Start Optimizing Your Crop Selection Today</h2>
            <p className="text-primary-foreground/80">
              Enter your soil parameters and get instant recommendations tailored to your specific conditions.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link href="/recommend">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              <Link href="/crops">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}