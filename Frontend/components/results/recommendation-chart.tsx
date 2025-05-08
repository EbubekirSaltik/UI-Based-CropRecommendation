'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface RecommendationChartProps {
  results: {
    recommended_crops: {
      name: string;
      confidence: number;
    }[];
  };
}

export function RecommendationChart({ results }: RecommendationChartProps) {
  const data = results.recommended_crops.map(crop => ({
    name: crop.name,
    confidence: Math.round(crop.confidence * 100),
  }));

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Crop Confidence Scores</CardTitle>
        <CardDescription>
          Match confidence percentage for recommended crops
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
              layout="vertical"
            >
              <XAxis type="number" domain={[0, 100]} />
              <YAxis type="category" dataKey="name" />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '0.5rem',
                }}
              />
              <Bar dataKey="confidence" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-1">What These Scores Mean</h4>
            <p className="text-sm text-muted-foreground">
              Higher confidence scores indicate crops that are better suited to your specific soil and environmental conditions.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">How Scores Are Calculated</h4>
            <p className="text-sm text-muted-foreground">
              Our algorithm analyzes your input data against optimal growing conditions for hundreds of crops to determine the best matches.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}