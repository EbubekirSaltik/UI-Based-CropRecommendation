import Link from 'next/link';
import { Sprout } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <Sprout className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">CropSage</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Intelligent crop recommendations using data science and agricultural expertise.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/crops" className="text-muted-foreground hover:text-primary transition-colors">
                  Crops
                </Link>
              </li>
              <li>
                <Link href="/recommend" className="text-muted-foreground hover:text-primary transition-colors">
                  Get Recommendations
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Crop Database
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Soil Guide
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Seasonal Calendar
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">
                Email: info@cropsage.com
              </li>
              <li className="text-muted-foreground">
                Phone: (123) 456-7890
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} CropSage. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}