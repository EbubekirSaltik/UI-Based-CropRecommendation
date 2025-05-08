import { CropsList } from '@/components/crops/crops-list';
import { CropsHero } from '@/components/crops/crops-hero';

export default function CropsPage() {
  return (
    <div className="container mx-auto py-8">
      <CropsHero />
      <CropsList />
    </div>
  );
}