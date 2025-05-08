'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { ResultsDisplay } from '@/components/results/results-display';
import { RecommendationChart } from '@/components/results/recommendation-chart';
import { LoadingResults } from '@/components/results/loading-results';

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    // Simulate loading time for future API integration
    const timer = setTimeout(() => {
      // Mock data - in the future this would come from the Python model
      const mockResults = {
        recommended_crops: [
          { name: 'Rice', confidence: 0.89, imageUrl: 'https://images.pexels.com/photos/7457031/pexels-photo-7457031.jpeg' },
          { name: 'Wheat', confidence: 0.75, imageUrl: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg' },
          { name: 'Maize', confidence: 0.67, imageUrl: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg' },
        ],
        soil_analysis: {
          nitrogen: parseFloat(searchParams.get('nitrogen') || '0'),
          phosphorus: parseFloat(searchParams.get('phosphorus') || '0'),
          potassium: parseFloat(searchParams.get('potassium') || '0'),
          ph: parseFloat(searchParams.get('ph') || '0'),
          rainfall: parseFloat(searchParams.get('rainfall') || '0'),
          temperature: parseFloat(searchParams.get('temperature') || '0'),
          humidity: parseFloat(searchParams.get('humidity') || '0'),
        }
      };
      
      setResults(mockResults);
      setLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [searchParams]);

  return (
    <div className="container mx-auto py-8">
      <PageHeader 
        title="Your Crop Recommendations" 
        description="Based on your soil parameters and environmental conditions, here are our recommendations."
      />
      
      {loading ? (
        <LoadingResults />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-8">
          <div className="lg:col-span-2">
            <ResultsDisplay results={results} />
          </div>
          <div className="lg:col-span-1">
            <RecommendationChart results={results} />
          </div>
        </div>
      )}
    </div>
  );
}