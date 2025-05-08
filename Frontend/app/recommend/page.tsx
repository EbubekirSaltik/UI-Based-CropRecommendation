'use client';

import { RecommendationForm } from '@/components/recommend/recommendation-form';
import { PageHeader } from '@/components/page-header';

export default function RecommendPage() {
  return (
    <div className="container mx-auto py-8">
      <PageHeader 
        title="Get Crop Recommendations" 
        description="Enter your soil parameters and environmental conditions to receive personalized crop recommendations."
      />
      <div className="my-8">
        <RecommendationForm />
      </div>
    </div>
  );
}