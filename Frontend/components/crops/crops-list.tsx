'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

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

// Mock data for crops
const cropsData: Crop[] = [
  {
    id: 1,
    name: 'Rice',
    category: 'Cereal',
    soilType: ['Clay', 'Loamy'],
    phRange: '5.5-6.5',
    climate: ['Tropical', 'Subtropical'],
    waterNeeds: 'High',
    growingSeason: 'Summer',
    imageUrl: 'https://images.pexels.com/photos/7457031/pexels-photo-7457031.jpeg',
    description: 'Rice is a staple food for over half of the world\'s population. It grows well in waterlogged conditions with high humidity.'
  },
  {
    id: 2,
    name: 'Wheat',
    category: 'Cereal',
    soilType: ['Loamy', 'Clay Loam'],
    phRange: '6.0-7.0',
    climate: ['Temperate', 'Subtropical'],
    waterNeeds: 'Moderate',
    growingSeason: 'Winter/Spring',
    imageUrl: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg',
    description: 'Wheat is a widely cultivated grass cereal grain. It requires moderate rainfall and grows well in cool conditions.'
  },
  {
    id: 3,
    name: 'Maize (Corn)',
    category: 'Cereal',
    soilType: ['Loamy', 'Sandy Loam'],
    phRange: '5.8-7.0',
    climate: ['Temperate', 'Tropical'],
    waterNeeds: 'Moderate',
    growingSeason: 'Summer',
    imageUrl: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg',
    description: 'Maize is a widely grown cereal grain that was domesticated in Mesoamerica. It prefers well-drained soils and warm conditions.'
  },
  {
    id: 4,
    name: 'Tomato',
    category: 'Vegetable',
    soilType: ['Loamy', 'Sandy Loam'],
    phRange: '6.0-6.8',
    climate: ['Temperate', 'Mediterranean'],
    waterNeeds: 'Moderate',
    growingSeason: 'Summer',
    imageUrl: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
    description: 'Tomatoes are a good source of vitamin C and lycopene. They grow best in well-drained soils with consistent moisture.'
  },
  {
    id: 5,
    name: 'Cotton',
    category: 'Fiber',
    soilType: ['Loamy', 'Black Cotton Soil'],
    phRange: '5.8-8.0',
    climate: ['Tropical', 'Subtropical'],
    waterNeeds: 'Moderate',
    growingSeason: 'Summer',
    imageUrl: 'https://images.pexels.com/photos/4752858/pexels-photo-4752858.jpeg',
    description: 'Cotton is a soft, fluffy staple fiber that grows in a protective case around the seeds of cotton plants. It requires a long, frost-free period.'
  },
  {
    id: 6,
    name: 'Potato',
    category: 'Vegetable',
    soilType: ['Sandy Loam', 'Loamy'],
    phRange: '5.0-6.5',
    climate: ['Temperate', 'Cool'],
    waterNeeds: 'Moderate',
    growingSeason: 'Spring/Summer',
    imageUrl: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg',
    description: 'Potatoes are starchy tubers that are a staple food in many parts of the world. They grow best in well-drained, loose soil.'
  },
];

export function CropsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const categories = ['All', 'Cereal', 'Vegetable', 'Fiber'];
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filteredCrops = cropsData.filter(crop => {
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
                className="w-full h-48 bg-cover bg-center" 
                style={{ backgroundImage: `url(${crop.imageUrl})` }}
              />
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