'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import  { CropData } from '@/constant';
import Image from 'next/image';

type Crop = {
  id: number;
  name: string;
  category: string;
  soilType: string[];
  phRange: string;
  climate: string[];
  waterNeeds: string;
  growingSeason: string;
  imageUrl: string;
  description: string;
};



export function CropsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const categories = ['All', 'Cereal', 'Vegetable', 'Fiber'];
  const [activeCategory, setActiveCategory] = useState('All');
  // console.log(CropData);
  
  const filteredCrops =CropData.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          crop.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || crop.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search crops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Tabs 
          value={activeCategory} 
          onValueChange={setActiveCategory}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid grid-cols-4">
            {categories.map(category => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      
      {filteredCrops.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <h3 className="text-lg font-medium">No crops found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map(crop => (
            <Card key={crop.id} className="overflow-hidden flex flex-col h-full">
              <div 
                className="w-full relative h-48 bg-cover bg-center" 
              
              >
                 <Image alt='name-crop' src={crop.imageUrl} fill className="object-cover"/>
              </div>
             
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>{crop.name}</CardTitle>
                  <Badge>{crop.category}</Badge>
                </div>
                <CardDescription>
                  Growing Season: {crop.growingSeason}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground mb-4">
                  {crop.description}
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">Soil Type:</span>
                    <p className="text-muted-foreground">{crop.soilType.join(', ')}</p>
                  </div>
                  <div>
                    <span className="font-medium">pH Range:</span>
                    <p className="text-muted-foreground">{crop.phRange}</p>
                  </div>
                  <div>
                    <span className="font-medium">Climate:</span>
                    <p className="text-muted-foreground">{crop.climate.join(', ')}</p>
                  </div>
                  <div>
                    <span className="font-medium">Water Needs:</span>
                    <p className="text-muted-foreground">{crop.waterNeeds}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full">
                  Detailed Info
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}