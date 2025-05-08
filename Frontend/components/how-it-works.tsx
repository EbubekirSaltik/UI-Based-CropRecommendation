'use client';

import { motion } from 'framer-motion';
import { Droplets, Ruler, MailIcon , Thermometer, Upload } from 'lucide-react';

function SoilIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20h16" />
      <path d="M8 16a2 2 0 0 1-2-2" />
      <path d="M6 4v10" />
      <path d="M18 10a2 2 0 0 1-2 2" />
      <path d="M18 4v6" />
      <path d="M12 2v16" />
      <path d="M12 12a2 2 0 0 0 2 2" />
      <path d="M12 18a2 2 0 0 1 2-2" />
    </svg>
  );
}

export function HowItWorks() {
  const steps = [
    {
      icon: <SoilIcon className="h-12 w-12 text-primary" />,
      title: 'Input Soil Data',
      description: 'Enter your soils NPK values, pH level, and other key parameters.'
    },
    {
      icon: <Thermometer className="h-12 w-12 text-primary" />,
      title: 'Add Environmental Factors',
      description: 'Provide information about temperature, humidity, and rainfall in your region.'
    },
    {
      icon: <Upload className="h-12 w-12 text-primary" />,
      title: 'Submit for Analysis',
      description: 'Our machine learning algorithm processes your data against our agricultural database.'
    },
    {
      icon: <Droplets className="h-12 w-12 text-primary" />,
      title: 'Get Recommendations',
      description: 'Receive a list of crops best suited for your specific conditions and expected yields.'
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple four-step process to get personalized crop recommendations for your land.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="bg-background p-6 rounded-full border-2 border-primary mb-6 relative">
                  {step.icon}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">Ready to Find Your Perfect Crop Match?</h3>
            <div className="max-w-3xl mx-auto px-6 py-8 bg-muted rounded-lg">
              <p className="text-lg mb-4">
                Our recommendation system uses advanced algorithms to analyze your input data and provide suggestions with up to 95% accuracy.
              </p>
              <p className="text-muted-foreground">
                The system will continue to improve as it learns from more data and feedback.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}