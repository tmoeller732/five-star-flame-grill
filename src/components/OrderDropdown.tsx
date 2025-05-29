
import React from 'react';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const OrderDropdown = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Order</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="bg-card w-[500px] p-6 flex flex-col gap-6">
              <h3 className="text-xl font-playfair text-grill-gold text-center mb-2">Choose how to order</h3>
              
              <div className="grid grid-cols-3 gap-6">
                {/* Order Pickup - First Position */}
                <div className="flex flex-col items-center">
                  <div className="h-24 w-24 flex items-center justify-center mb-4">
                    <img 
                      src="/lovable-uploads/1769fc8b-f400-416e-ad38-c763a0dfa09a.png" 
                      alt="5 Star Direct" 
                      className="h-20 object-contain"
                    />
                  </div>
                  <NavigationMenuLink asChild>
                    <Button 
                      asChild
                      className="w-full bg-grill-gold hover:bg-grill-orange text-grill-black"
                    >
                      <Link to="/menu">
                        Order Pickup
                      </Link>
                    </Button>
                  </NavigationMenuLink>
                </div>

                {/* GrubHub - Second Position */}
                <div className="flex flex-col items-center">
                  <div className="h-24 w-24 flex items-center justify-center mb-4">
                    <img 
                      src="/lovable-uploads/328cfcfd-602a-46f6-83d2-88419ec75beb.png" 
                      alt="GrubHub Logo" 
                      className="h-20 object-contain"
                    />
                  </div>
                  <Button 
                    asChild
                    className="w-full bg-grill-gold hover:bg-grill-orange text-grill-black"
                  >
                    <a href="#" className="flex items-center justify-center">
                      Order on GrubHub
                    </a>
                  </Button>
                </div>

                {/* DoorDash - Third Position */}
                <div className="flex flex-col items-center">
                  <div className="h-24 w-24 flex items-center justify-center mb-4">
                    <img 
                      src="/lovable-uploads/3023517f-db29-4fe3-a755-849d2a497738.png" 
                      alt="DoorDash Logo" 
                      className="h-20 object-contain" 
                    />
                  </div>
                  <Button 
                    asChild
                    className="w-full bg-grill-gold hover:bg-grill-orange text-grill-black"
                  >
                    <a href="#" className="flex items-center justify-center">
                      Order on DoorDash
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default OrderDropdown;
