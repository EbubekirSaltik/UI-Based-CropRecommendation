'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function LoadingResults() {
  return (
    <div className="my-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center text-center"
      >
        <div className="relative mb-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-primary/10 animate-ping" />
        </div>
        
        <h3 className="text-xl font-medium mb-2">Analyzing Your Data</h3>
        <p className="text-muted-foreground mb-8 max-w-md">
          Our algorithm is processing your soil parameters and environmental conditions to find the best crop matches.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="w-full">
              <CardContent className="pt-6">
                <Skeleton className="h-32 w-full rounded-md mb-4" />
                <Skeleton className="h-4 w-3/4 rounded-md mb-2" />
                <Skeleton className="h-4 w-1/2 rounded-md" />
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}