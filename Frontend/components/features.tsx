'use client';

import { motion } from 'framer-motion';
import { Check, Cloud, Database, LineChart, Maximize2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function Features() {
  const features = [
    {
      icon: <Database className="h-12 w-12 text-primary" />,
      title: 'Smart Data Processing',
      description: 'Our system analyzes soil composition, weather patterns, and historical data to provide accurate recommendations.'
    },
    {
      icon: <LineChart className="h-12 w-12 text-primary" />,
      title: 'Yield Predictions',
      description: 'Get estimated crop yields based on your input parameters and historical agricultural data.'
    },
    {
      icon: <Cloud className="h-12 w-12 text-primary" />,
      title: 'Weather Integration',
      description: 'Real-time weather data integration helps predict optimal planting times and irrigation needs.'
    },
    {
      icon: <Maximize2 className="h-12 w-12 text-primary" />,
      title: 'Scalable Solutions',
      description: 'Whether youre a small farmer or large agricultural business, our recommendations scale to your needs.'
    }
  ];

  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose CropSage?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our intelligent system combines agricultural science with machine learning to provide you with the most accurate crop recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  {feature.icon}
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground/80">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-card shadow-lg rounded-lg p-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold mb-4">Advanced Machine Learning Algorithm</h3>
              <p className="text-foreground/80 mb-6">
                Our recommendation engine uses sophisticated machine learning algorithms trained on extensive agricultural datasets to provide accurate, location-specific crop suggestions.
              </p>
              <ul className="space-y-2">
                {[
                  'Soil composition analysis',
                  'Climate pattern recognition',
                  'Region-specific recommendations',
                  'Seasonal variations consideration'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 mt-1 text-primary">
                      <Check className="h-5 w-5" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <img 
                src="https://images.pexels.com/photos/1446115/pexels-photo-1446115.jpeg" 
                alt="Data Analysis"
                className="rounded-lg shadow-md max-w-full h-auto"
                style={{ maxHeight: '250px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}