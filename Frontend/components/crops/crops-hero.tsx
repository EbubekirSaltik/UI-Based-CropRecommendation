import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function CropsHero() {
  return (
    <div className="mb-8">
      <PageHeader 
        title="Crop Information Database" 
        description="Learn about different crops and their optimal growing conditions."
        className="mb-8"
      />
      
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Find the Perfect Crop for Your Land</CardTitle>
          <CardDescription>
            Browse our extensive crop database to learn about various crops and their ideal growing conditions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Our database includes information on soil requirements, climate preferences, growing seasons, and expected yields for a wide variety of crops. Use this information to make informed decisions about what to plant on your land.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}