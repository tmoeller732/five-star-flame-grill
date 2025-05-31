
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle } from 'lucide-react';
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
    img.onerror = () => setSelectedImage("/placeholder.svg"); // Fallback image
  }, [item.image, item.imageUrl]);

  const handleItemClick = async () => {
    // Track that the user viewed this item
    await trackViewedItem(item);
    setIsModalOpen(true);
  };

  const handleImageError = () => {
    setSelectedImage("/placeholder.svg");
  };

  // Default to available if isAvailable is not specified
  const isAvailable = item.isAvailable !== false;

  return (
    <>
      <Card 
        className="bg-card border-gray-700 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group" 
        onClick={handleItemClick}
      >
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-grill-gold">{item.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <AspectRatio ratio={16 / 9}>
            <img
              src={selectedImage}
              alt={item.name}
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
              onError={handleImageError}
            />
          </AspectRatio>
          <div className="p-4">
            <CardDescription className="text-sm text-gray-400 line-clamp-3">{item.description}</CardDescription>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white">${item.price.toFixed(2)}</span>
            {!isAvailable && (
              <Badge variant="destructive" className="opacity-80 hover:opacity-100">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Unavailable
              </Badge>
            )}
          </div>
          {isAvailable && (
            <CheckCircle2 className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
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
