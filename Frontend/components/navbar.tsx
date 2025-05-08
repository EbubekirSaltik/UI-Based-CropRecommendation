'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Menu, X, Sprout } from 'lucide-react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Sprout className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">CropSage</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/crops" className="text-foreground hover:text-primary transition-colors">
            Crops
          </Link>
          <Link href="/recommend" className="text-foreground hover:text-primary transition-colors">
            Get Recommendations
          </Link>
          <ThemeToggle />
          <Button asChild>
            <Link href="/recommend">Start Now</Link>
          </Button>
        </div>

        {/* Mobile Navigation Button */}
        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t p-4">
          <div className="flex flex-col space-y-4">
            <Link 
              href="/" 
              className="text-foreground hover:text-primary transition-colors px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/crops" 
              className="text-foreground hover:text-primary transition-colors px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Crops
            </Link>
            <Link 
              href="/recommend" 
              className="text-foreground hover:text-primary transition-colors px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Recommendations
            </Link>
            <Button asChild className="w-full">
              <Link 
                href="/recommend"
                onClick={() => setIsMenuOpen(false)}
              >
                Start Now
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}