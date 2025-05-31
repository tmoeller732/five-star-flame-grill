
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, Settings } from 'lucide-react';
import ItemCustomizationModal from './ItemCustomizationModal';
import { useTrackViewedItem } from '../../hooks/useViewedItems';

export interface MenuItemProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  imageUrl?: string;
  category: string;
  popular?: boolean;
  isAvailable?: boolean;
  customizations?: {
    id: number;
    name: string;
    options: Array<{
      id: number;
      name: string;
      price: number;
    }>;
  }[];
}

interface MenuItemComponentProps {
  item: MenuItemProps;
}

const MenuItem: React.FC<MenuItemComponentProps> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(item.imageUrl || item.image);
  const { trackViewedItem } = useTrackViewedItem();

  useEffect(() => {
    // Use imageUrl if available, otherwise fall back to image
    const imageToUse = item.imageUrl || item.image;
    const img = new Image();
    img.src = imageToUse;
    img.onload = () => setSelectedImage(imageToUse);
    img.onerror = () => setSelectedImage("/placeholder.svg");
  }, [item.image, item.imageUrl]);

  const handleItemClick = async (e: React.MouseEvent) => {
    // Prevent modal from opening if clicking on buttons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    
    await trackViewedItem(item);
    setIsModalOpen(true);
  };

  const handleCustomize = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!item.isAvailable) return;
    
    await trackViewedItem(item);
    setIsModalOpen(true);
  };

  const handleImageError = () => {
    setSelectedImage("/placeholder.svg");
  };

  const isAvailable = item.isAvailable !== false;

  return (
    <>
      <Card 
        className="bg-card border-gray-700 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group" 
        onClick={handleItemClick}
      >
        <CardContent className="p-0">
          <AspectRatio ratio={16 / 9}>
            <img
              src={selectedImage}
              alt={item.name}
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
              onError={handleImageError}
            />
          </AspectRatio>
        </CardContent>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-grill-gold truncate pr-2 leading-tight">
              {item.name}
            </CardTitle>
            <span className="text-lg font-bold text-white whitespace-nowrap">${item.price.toFixed(2)}</span>
          </div>
          {item.popular && (
            <Badge className="w-fit bg-grill-gold text-grill-black">
              Popular
            </Badge>
          )}
        </CardHeader>
        <CardContent className="pt-0 pb-4">
          <CardDescription className="text-sm text-gray-400 line-clamp-2">{item.description}</CardDescription>
        </CardContent>
        <CardFooter className="flex items-center justify-center pt-0">
          <div className="flex items-center gap-2">
            {!isAvailable && (
              <Badge variant="destructive" className="opacity-80 hover:opacity-100 mb-2">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Unavailable
              </Badge>
            )}
          </div>
          <Button
            onClick={handleCustomize}
            disabled={!isAvailable}
            size="sm"
            className="bg-grill-gold hover:bg-grill-orange text-grill-black"
          >
            <Settings className="h-4 w-4 mr-1" />
            Customize
          </Button>
        </CardFooter>
      </Card>

      <ItemCustomizationModal
        item={item}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
};

export default MenuItem;
