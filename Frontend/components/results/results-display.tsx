'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

interface ResultsDisplayProps {
  results: {
    recommended_crops: {
      name: string;
      confidence: number;
      imageUrl: string;
    }[];
    soil_analysis: {
      nitrogen: number;
      phosphorus: number;
      potassium: number;
      ph: number;
      rainfall: number;
      temperature: number;
      humidity: number;
    };
  };
}

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  return (
    <div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold mb-4">Top Recommendations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.recommended_crops.map((crop, index) => (
            <motion.div
              key={crop.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow relative">
                {index === 0 && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground py-1 px-3 text-sm font-medium">
                    Best Match
                  </div>
                )}
                <div 
                  className="w-full h-48 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${crop.imageUrl})` }}
                />
                <CardHeader className="pb-2">
                  <CardTitle>{crop.name}</CardTitle>
                  <CardDescription>
                    Match Confidence: {Math.round(crop.confidence * 100)}%
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={crop.confidence * 100} className="h-2" />
                  <div className="flex mt-4 gap-2 flex-wrap">
                    <Badge variant="outline" className="bg-primary/10">
                      {getPHRating(results.soil_analysis.ph)}
                    </Badge>
                    <Badge variant="outline" className="bg-primary/10">
                      {getWaterRating(results.soil_analysis.rainfall)}
                    </Badge>
                    <Badge variant="outline" className="bg-primary/10">
                      {getTemperatureRating(results.soil_analysis.temperature)}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="mr-2 h-5 w-5 text-muted-foreground" />
              Soil Analysis Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">NPK Values</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Nitrogen (N)</p>
                    <Progress value={(results.soil_analysis.nitrogen / 140) * 100} className="h-2" />
                    <p className="text-sm text-muted-foreground">{results.soil_analysis.nitrogen} mg/kg</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Phosphorus (P)</p>
                    <Progress value={(results.soil_analysis.phosphorus / 140) * 100} className="h-2" />
                    <p className="text-sm text-muted-foreground">{results.soil_analysis.phosphorus} mg/kg</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Potassium (K)</p>
                    <Progress value={(results.soil_analysis.potassium / 140) * 100} className="h-2" />
                    <p className="text-sm text-muted-foreground">{results.soil_analysis.potassium} mg/kg</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Environmental Factors</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">{results.soil_analysis.ph.toFixed(1)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">pH Level</p>
                      <p className="text-xs text-muted-foreground">{getPHDescription(results.soil_analysis.ph)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">{results.soil_analysis.rainfall}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Rainfall (mm)</p>
                      <p className="text-xs text-muted-foreground">{getRainfallDescription(results.soil_analysis.rainfall)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">{results.soil_analysis.temperature}°C</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Temperature</p>
                      <p className="text-xs text-muted-foreground">{getTemperatureDescription(results.soil_analysis.temperature)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 border-t">
            <div className="flex items-start gap-2 w-full">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">Optimization Tips</p>
                <p className="text-sm text-muted-foreground">
                  {getOptimizationTips(results.soil_analysis)}
                </p>
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

// Helper functions for descriptive text
function getPHRating(ph: number) {
  if (ph < 5.5) return 'Acidic Soil';
  if (ph > 7.5) return 'Alkaline Soil';
  return 'Neutral pH';
}

function getWaterRating(rainfall: number) {
  if (rainfall < 50) return 'Low Water';
  if (rainfall > 150) return 'High Water';
  return 'Moderate Water';
}

function getTemperatureRating(temp: number) {
  if (temp < 15) return 'Cool Climate';
  if (temp > 30) return 'Hot Climate';
  return 'Moderate Climate';
}

function getPHDescription(ph: number) {
  if (ph < 5.5) return 'Acidic - may need lime';
  if (ph > 7.5) return 'Alkaline - may need sulfur';
  return 'Optimal range for most crops';
}

function getRainfallDescription(rainfall: number) {
  if (rainfall < 50) return 'Low - irrigation needed';
  if (rainfall > 150) return 'High - good drainage needed';
  return 'Moderate - suitable for many crops';
}

function getTemperatureDescription(temp: number) {
  if (temp < 15) return 'Cool - suitable for cool season crops';
  if (temp > 30) return 'Hot - suitable for heat-loving crops';
  return 'Moderate - suitable for many crops';
}

function getOptimizationTips(soil: any) {
  if (soil.ph < 5.5) {
    return 'Consider adding agricultural lime to raise your soil pH for better nutrient availability.';
  }
  if (soil.ph > 7.5) {
    return 'Consider adding agricultural sulfur to lower your soil pH for better nutrient availability.';
  }
  if (soil.nitrogen < 30) {
    return 'Your soil is low in nitrogen. Consider nitrogen-rich fertilizers or planting nitrogen-fixing legumes.';
  }
  if (soil.phosphorus < 30) {
    return 'Your soil is low in phosphorus. Consider adding phosphate fertilizers for better root development.';
  }
  if (soil.potassium < 30) {
    return 'Your soil is low in potassium. Consider adding potash fertilizers for improved plant health and stress resistance.';
  }
  return 'Your soil parameters are within optimal ranges for many crops. Focus on maintaining current conditions.';
}