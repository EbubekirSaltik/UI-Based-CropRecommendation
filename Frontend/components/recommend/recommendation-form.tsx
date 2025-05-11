'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import axios from 'axios'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePredictionStore } from '@/stores/predictionStores';

const formSchema = z.object({
  nitrogen: z.number().min(0).max(140),
  phosphorus: z.number().min(0).max(140),
  potassium: z.number().min(0).max(140),
  ph: z.number().min(0).max(14),
  rainfall: z.number().min(0).max(300),
  temperature: z.number().min(0).max(50),
  humidity: z.number().min(0).max(100),
});

type FormValues = z.infer<typeof formSchema>;

export function RecommendationForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {setInputData}=usePredictionStore()

  const defaultValues: FormValues = {
    nitrogen: 50,
    phosphorus: 50,
    potassium: 50,
    ph: 7,
    rainfall: 100,
    temperature: 25,
    humidity: 50,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

 async  function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    setTimeout(() => {
      const params = new URLSearchParams();
      Object.entries(data).forEach(([key, value]) => {
        params.append(key, value.toString());
      });
     const values = form.getValues();
       setInputData(values);
      router.push(`/results?${params.toString()}`);
    }, 500);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Tabs defaultValue="soil" className="w-full">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="soil">Soil Parameters</TabsTrigger>
          <TabsTrigger value="environment">Environmental Factors</TabsTrigger>
        </TabsList>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <TabsContent value="soil" className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="nitrogen"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nitrogen (N) mg/kg</FormLabel>
                          <div className="flex items-center gap-4">
                            <FormControl>
                              <Slider
                                min={0}
                                max={140}
                                step={1}
                                value={[field.value]}
                                onValueChange={(value) => field.onChange(value[0])}
                                className="flex-1"
                              />
                            </FormControl>
                            <span className="w-12 text-right">{field.value}</span>
                          </div>
                          <FormDescription>
                            Typical range: 10-100 mg/kg
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phosphorus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phosphorus (P) mg/kg</FormLabel>
                          <div className="flex items-center gap-4">
                            <FormControl>
                              <Slider
                                min={0}
                                max={140}
                                step={1}
                                value={[field.value]}
                                onValueChange={(value) => field.onChange(value[0])}
                                className="flex-1"
                              />
                            </FormControl>
                            <span className="w-12 text-right">{field.value}</span>
                          </div>
                          <FormDescription>
                            Typical range: 10-100 mg/kg
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="potassium"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Potassium (K) mg/kg</FormLabel>
                          <div className="flex items-center gap-4">
                            <FormControl>
                              <Slider
                                min={0}
                                max={140}
                                step={1}
                                value={[field.value]}
                                onValueChange={(value) => field.onChange(value[0])}
                                className="flex-1"
                              />
                            </FormControl>
                            <span className="w-12 text-right">{field.value}</span>
                          </div>
                          <FormDescription>
                            Typical range: 10-100 mg/kg
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="ph"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>pH Level</FormLabel>
                          <div className="flex items-center gap-4">
                            <FormControl>
                              <Slider
                                min={0}
                                max={14}
                                step={0.1}
                                value={[field.value]}
                                onValueChange={(value) => field.onChange(value[0])}
                                className="flex-1"
                              />
                            </FormControl>
                            <span className="w-12 text-right">{field.value.toFixed(1)}</span>
                          </div>
                          <FormDescription>
                            Most crops prefer 6.0-7.5
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="environment" className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="rainfall"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Annual Rainfall (mm)</FormLabel>
                          <div className="flex items-center gap-4">
                            <FormControl>
                              <Slider
                                min={0}
                                max={300}
                                step={1}
                                value={[field.value]}
                                onValueChange={(value) => field.onChange(value[0])}
                                className="flex-1"
                              />
                            </FormControl>
                            <span className="w-12 text-right">{field.value}</span>
                          </div>
                          <FormDescription>
                            Average annual rainfall in mm
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="temperature"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Temperature (°C)</FormLabel>
                          <div className="flex items-center gap-4">
                            <FormControl>
                              <Slider
                                min={0}
                                max={50}
                                step={0.5}
                                value={[field.value]}
                                onValueChange={(value) => field.onChange(value[0])}
                                className="flex-1"
                              />
                            </FormControl>
                            <span className="w-12 text-right">{field.value.toFixed(1)}</span>
                          </div>
                          <FormDescription>
                            Average temperature in your region
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="humidity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Humidity (%)</FormLabel>
                          <div className="flex items-center gap-4">
                            <FormControl>
                              <Slider
                                min={0}
                                max={100}
                                step={1}
                                value={[field.value]}
                                onValueChange={(value) => field.onChange(value[0])}
                                className="flex-1"
                              />
                            </FormControl>
                            <span className="w-12 text-right">{field.value}</span>
                          </div>
                          <FormDescription>
                            Average humidity percentage
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <div className="flex justify-end">
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Get Recommendations'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  );
}