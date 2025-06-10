import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MenuItemProps } from './MenuItem';
import { CartCustomization } from '../../types/cart';
import { useCart } from '../../contexts/CartContext';
import OrderDecisionModal from './OrderDecisionModal';

interface CustomizationOption {
  id: string;
  name: string;
  price: number;
  category: string;
  type?: 'radio' | 'checkbox';
}

interface ItemCustomizationModalProps {
  item: MenuItemProps;
  children: React.ReactNode;
}

// Updated customization options for specific breakfast and lunch items
const getCustomizationOptions = (item: MenuItemProps): Record<string, CustomizationOption[]> => {
  // Check if this is one of the specific breakfast items
  if (item.category === 'breakfast') {
    // #1 'CLASSIC' EGG & CHEESE
    if (item.id === 1) {
      return {
        'Bread Choice': [
          { id: 'hard-roll', name: 'Hard Roll', price: 0, category: 'Bread Choice' },
          { id: 'croissant', name: 'Croissant', price: 0, category: 'Bread Choice' },
          { id: 'bagel', name: 'Bagel', price: 0, category: 'Bread Choice' },
        ],
        'Make it a Meal': [
          { id: 'meal', name: 'Hash Brown + 20oz Coffee', price: 2.99, category: 'Make it a Meal', type: 'checkbox' },
        ],
        'Add-ons': [
          { id: 'hash-brown', name: 'Hash Brown', price: 1.50, category: 'Add-ons', type: 'checkbox' },
          { id: 'avocado', name: 'Avocado', price: 1.99, category: 'Add-ons', type: 'checkbox' },
        ]
      };
    }
    
    // #2 EGG & CHEESE W/MEAT
    if (item.id === 2) {
      return {
        'Meat Choice (Required)': [
          { id: 'bacon', name: 'Bacon', price: 0, category: 'Meat Choice (Required)' },
          { id: 'sausage', name: 'Sausage', price: 0, category: 'Meat Choice (Required)' },
          { id: 'chorizo', name: 'Chorizo', price: 0, category: 'Meat Choice (Required)' },
          { id: 'pork-roll', name: 'Pork Roll', price: 0, category: 'Meat Choice (Required)' },
        ],
        'Additional Meat': [
          { id: 'extra-bacon', name: 'Add Bacon', price: 1.99, category: 'Additional Meat', type: 'checkbox' },
          { id: 'extra-sausage', name: 'Add Sausage', price: 1.99, category: 'Additional Meat', type: 'checkbox' },
          { id: 'extra-chorizo', name: 'Add Chorizo', price: 1.99, category: 'Additional Meat', type: 'checkbox' },
          { id: 'extra-pork-roll', name: 'Add Pork Roll', price: 1.99, category: 'Additional Meat', type: 'checkbox' },
        ],
        'Bread Choice': [
          { id: 'hard-roll', name: 'Hard Roll', price: 0, category: 'Bread Choice' },
          { id: 'croissant', name: 'Croissant', price: 0, category: 'Bread Choice' },
          { id: 'bagel', name: 'Bagel', price: 0, category: 'Bread Choice' },
        ],
        'Make it a Meal': [
          { id: 'meal', name: 'Hash Brown + 20oz Coffee', price: 2.99, category: 'Make it a Meal', type: 'checkbox' },
        ],
        'Add-ons': [
          { id: 'hash-brown', name: 'Hash Brown', price: 1.50, category: 'Add-ons', type: 'checkbox' },
          { id: 'avocado', name: 'Avocado', price: 1.99, category: 'Add-ons', type: 'checkbox' },
        ]
      };
    }
    
    // #3 STEAK EGG & CHEESE
    if (item.id === 3) {
      return {
        'Bread Choice': [
          { id: 'hard-roll', name: 'Hard Roll', price: 0, category: 'Bread Choice' },
          { id: 'croissant', name: 'Croissant', price: 0, category: 'Bread Choice' },
          { id: 'bagel', name: 'Bagel', price: 0, category: 'Bread Choice' },
        ],
        'Make it a Meal': [
          { id: 'meal', name: 'Hash Brown + 20oz Coffee', price: 2.99, category: 'Make it a Meal', type: 'checkbox' },
        ],
        'Add-ons': [
          { id: 'hash-brown', name: 'Hash Brown', price: 1.50, category: 'Add-ons', type: 'checkbox' },
          { id: 'avocado', name: 'Avocado', price: 1.99, category: 'Add-ons', type: 'checkbox' },
        ]
      };
    }

    // #4 WESTERN OMELET SANDWICH
    if (item.id === 4) {
      return {
        'Bread Choice': [
          { id: 'hard-roll', name: 'Hard Roll', price: 0, category: 'Bread Choice' },
          { id: 'croissant', name: 'Croissant', price: 0, category: 'Bread Choice' },
          { id: 'bagel', name: 'Bagel', price: 0, category: 'Bread Choice' },
        ],
        'Make it a Meal': [
          { id: 'meal', name: 'Hash Brown + 20oz Coffee', price: 2.99, category: 'Make it a Meal', type: 'checkbox' },
        ],
        'Add-ons': [
          { id: 'hash-brown', name: 'Hash Brown', price: 1.50, category: 'Add-ons', type: 'checkbox' },
          { id: 'avocado', name: 'Avocado', price: 1.99, category: 'Add-ons', type: 'checkbox' },
        ]
      };
    }

    // #5 CLASSIC BREAKFAST PLATE
    if (item.id === 5) {
      return {
        'Make it a Meal': [
          { id: 'meal', name: 'Hash Brown + 20oz Coffee', price: 2.99, category: 'Make it a Meal', type: 'checkbox' },
        ],
        'Add-ons': [
          { id: 'hash-brown', name: 'Hash Brown', price: 1.50, category: 'Add-ons', type: 'checkbox' },
          { id: 'avocado', name: 'Avocado', price: 1.99, category: 'Add-ons', type: 'checkbox' },
        ]
      };
    }

    // #6 BREAKFAST PLATE W/MEAT
    if (item.id === 6) {
      return {
        'Meat Choice (Required)': [
          { id: 'bacon', name: 'Bacon', price: 0, category: 'Meat Choice (Required)' },
          { id: 'sausage', name: 'Sausage', price: 0, category: 'Meat Choice (Required)' },
          { id: 'chorizo', name: 'Chorizo', price: 0, category: 'Meat Choice (Required)' },
          { id: 'pork-roll', name: 'Pork Roll', price: 0, category: 'Meat Choice (Required)' },
        ],
        'Additional Meat': [
          { id: 'extra-bacon', name: 'Add Bacon', price: 1.99, category: 'Additional Meat', type: 'checkbox' },
          { id: 'extra-sausage', name: 'Add Sausage', price: 1.99, category: 'Additional Meat', type: 'checkbox' },
          { id: 'extra-chorizo', name: 'Add Chorizo', price: 1.99, category: 'Additional Meat', type: 'checkbox' },
          { id: 'extra-pork-roll', name: 'Add Pork Roll', price: 1.99, category: 'Additional Meat', type: 'checkbox' },
        ],
        'Make it a Meal': [
          { id: 'meal', name: 'Hash Brown + 20oz Coffee', price: 2.99, category: 'Make it a Meal', type: 'checkbox' },
        ],
        'Add-ons': [
          { id: 'hash-brown', name: 'Hash Brown', price: 1.50, category: 'Add-ons', type: 'checkbox' },
          { id: 'avocado', name: 'Avocado', price: 1.99, category: 'Add-ons', type: 'checkbox' },
        ]
      };
    }

    // #7 BAGEL WITH BUTTER - no meal option, no add-ons
    if (item.id === 7) {
      return {};
    }

    // #8 BAGEL WITH CREAM CHEESE - no meal option, no add-ons
    if (item.id === 8) {
      return {};
    }

    // #9 HOME FRIES - no options
    if (item.id === 9) {
      return {};
    }
  }

  // Check if this is one of the specific lunch items
  if (item.category === 'lunch') {
    // #1 Chorizo Tacos, #2 Chicken Tacos, #3 Steak Tacos (IDs 13, 14, 15)
    if (item.id === 13 || item.id === 14 || item.id === 15) {
      return {
        'Make it a Meal': [
          { id: 'lunch-meal', name: 'French Fries + 24oz Drink', price: 2.99, category: 'Make it a Meal', type: 'checkbox' },
        ],
        'Remove Items': [
          { id: 'no-onions', name: 'NO Onions', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-cilantro', name: 'NO Cilantro', price: 0, category: 'Remove Items', type: 'checkbox' },
        ]
      };
    }

    // #4 Chorizo Burrito, #5 Chicken Burrito, #6 Steak Burrito (IDs 16, 17, 18)
    if (item.id === 16 || item.id === 17 || item.id === 18) {
      return {
        'Make it a Meal': [
          { id: 'lunch-meal', name: 'French Fries + 24oz Drink', price: 2.99, category: 'Make it a Meal', type: 'checkbox' },
        ],
        'Remove Items': [
          { id: 'no-lettuce', name: 'NO Lettuce', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-tomato', name: 'NO Tomato', price: 0, category: 'Remove Items', type: 'checkbox' },
        ]
      };
    }

    // #7 Smash Burger, #8 Beef Burger (IDs 19, 20) - #20 is excluded from meal option
    if (item.id === 19) {
      return {
        'Make it a Meal': [
          { id: 'lunch-meal', name: 'French Fries + 24oz Drink', price: 2.99, category: 'Make it a Meal', type: 'checkbox' },
        ],
        'Remove Items': [
          { id: 'no-lettuce', name: 'NO Lettuce', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-onions', name: 'NO Onions', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-tomato', name: 'NO Tomato', price: 0, category: 'Remove Items', type: 'checkbox' },
        ]
      };
    }

    if (item.id === 20) {
      return {
        'Remove Items': [
          { id: 'no-lettuce', name: 'NO Lettuce', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-onions', name: 'NO Onions', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-tomato', name: 'NO Tomato', price: 0, category: 'Remove Items', type: 'checkbox' },
        ]
      };
    }

    // #9 Chicken Sandwich (ID 21)
    if (item.id === 21) {
      return {
        'Make it a Meal': [
          { id: 'lunch-meal', name: 'French Fries + 24oz Drink', price: 2.99, category: 'Make it a Meal', type: 'checkbox' },
        ],
        'Remove Items': [
          { id: 'no-lettuce', name: 'NO Lettuce', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-tomato', name: 'NO Tomato', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-mayo', name: 'NO Mayo', price: 0, category: 'Remove Items', type: 'checkbox' },
        ]
      };
    }

    // #10 Steak Quesadilla, #11 Chicken Quesadilla, #12 Steak Torta, #13 Chorizo Torta, #14 Chicken Torta (IDs 22, 23, 24, 25, 26)
    if (item.id === 22 || item.id === 23) {
      return {
        'Make it a Meal': [
          { id: 'lunch-meal', name: 'French Fries + 24oz Drink', price: 2.99, category: 'Make it a Meal', type: 'checkbox' },
        ],
        'Remove Items': [
          { id: 'no-lettuce', name: 'NO Lettuce', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-tomato', name: 'NO Tomato', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-pico', name: 'NO Pico', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-sour-cream', name: 'NO Sour Cream', price: 0, category: 'Remove Items', type: 'checkbox' },
        ]
      };
    }

    // Excluded items: #24, #25, #26 (IDs 24, 25, 26) - no meal option
    if (item.id === 24 || item.id === 25 || item.id === 26) {
      return {
        'Remove Items': [
          { id: 'no-lettuce', name: 'NO Lettuce', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-tomato', name: 'NO Tomato', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-pico', name: 'NO Pico', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-sour-cream', name: 'NO Sour Cream', price: 0, category: 'Remove Items', type: 'checkbox' },
        ]
      };
    }

    // #15 Philly Cheesesteak, #16 Chicken Cheesesteak, #17 California Cheesesteak (IDs 27, 28, 29)
    if (item.id === 27 || item.id === 28 || item.id === 29) {
      return {
        'Make it a Meal': [
          { id: 'lunch-meal', name: 'French Fries + 24oz Drink', price: 2.99, category: 'Make it a Meal', type: 'checkbox' },
        ],
        'Remove Items': [
          { id: 'no-onions', name: 'NO Onions', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-peppers', name: 'NO Peppers', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-mushrooms', name: 'NO Mushrooms', price: 0, category: 'Remove Items', type: 'checkbox' },
        ]
      };
    }

    // #18 Chicken Wings, #19 Chicken Nuggets (IDs 30, 31) - add meal option
    if (item.id === 30 || item.id === 31) {
      return {
        'Make it a Meal': [
          { id: 'lunch-meal', name: 'French Fries + 24oz Drink', price: 2.99, category: 'Make it a Meal', type: 'checkbox' },
        ],
      };
    }

    // #20 Chicken Fingers (ID 32) - excluded from meal option
    if (item.id === 32) {
      return {};
    }

    // #21 Turkey & Cheese, #22 Ham & Cheese (IDs 33, 34)
    if (item.id === 33 || item.id === 34) {
      return {
        'Make it a Meal': [
          { id: 'lunch-meal', name: 'French Fries + 24oz Drink', price: 2.99, category: 'Make it a Meal', type: 'checkbox' },
        ],
        'Remove Items': [
          { id: 'no-lettuce', name: 'NO Lettuce', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-tomato', name: 'NO Tomato', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-mayo', name: 'NO Mayo', price: 0, category: 'Remove Items', type: 'checkbox' },
        ]
      };
    }

    // #23 Roast Beef (ID 35)
    if (item.id === 35) {
      return {
        'Make it a Meal': [
          { id: 'lunch-meal', name: 'French Fries + 24oz Drink', price: 2.99, category: 'Make it a Meal', type: 'checkbox' },
        ],
        'Remove Items': [
          { id: 'no-lettuce', name: 'NO Lettuce', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-tomato', name: 'NO Tomato', price: 0, category: 'Remove Items', type: 'checkbox' },
        ]
      };
    }

    // #24 French Fries, #25 Cheese Fries, #26 Onion Rings (IDs 36, 37, 38) - excluded from meal option
    if (item.id === 36 || item.id === 37 || item.id === 38) {
      return {};
    }
  }

  // Check if this is one of the specific bowls & salads items
  if (item.category === 'bowls') {
    // #1 CHICKEN BURRITO BOWL, #2 CHORIZO BURRITO BOWL, #3 STEAK BURRITO BOWL (IDs 39, 40, 41)
    if (item.id === 39 || item.id === 40 || item.id === 41) {
      return {
        'Remove Items': [
          { id: 'no-beans', name: 'NO Beans', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-lettuce', name: 'NO Lettuce', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-tomato', name: 'NO Tomato', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-pico', name: 'NO Pico de Gallo', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-sour-cream', name: 'NO Sour Cream', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-cheese', name: 'NO Cheese', price: 0, category: 'Remove Items', type: 'checkbox' },
        ]
      };
    }

    // #4 ICEBERG SALAD, #5 ROMAINE SALAD, #6 GARDEN SALAD, #7 CAESAR SALAD (IDs 42, 43, 44, 45) - no options
    if (item.id === 42 || item.id === 43 || item.id === 44 || item.id === 45) {
      return {};
    }

    // #8 CHICKEN TACO SALAD, #9 CHORIZO TACO SALAD, #10 STEAK TACO SALAD (IDs 46, 47, 48)
    if (item.id === 46 || item.id === 47 || item.id === 48) {
      return {
        'Remove Items': [
          { id: 'no-beans', name: 'NO Beans', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-lettuce', name: 'NO Lettuce', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-tomato', name: 'NO Tomato', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-pico', name: 'NO Pico de Gallo', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-sour-cream', name: 'NO Sour Cream', price: 0, category: 'Remove Items', type: 'checkbox' },
          { id: 'no-cheese', name: 'NO Cheese', price: 0, category: 'Remove Items', type: 'checkbox' },
        ]
      };
    }
  }

  // Default options for other items
  const baseOptions = {
    'Cooking Style': [
      { id: 'rare', name: 'Rare', price: 0, category: 'Cooking Style' },
      { id: 'medium-rare', name: 'Medium Rare', price: 0, category: 'Cooking Style' },
      { id: 'medium', name: 'Medium', price: 0, category: 'Cooking Style' },
      { id: 'well-done', name: 'Well Done', price: 0, category: 'Cooking Style' },
    ],
    'Extras': [
      { id: 'extra-cheese', name: 'Extra Cheese', price: 1.50, category: 'Extras' },
      { id: 'bacon', name: 'Add Bacon', price: 2.50, category: 'Extras' },
      { id: 'avocado', name: 'Add Avocado', price: 2.00, category: 'Extras' },
    ]
  };

  return baseOptions;
};

const ItemCustomizationModal = ({ item, children }: ItemCustomizationModalProps) => {
  const [selectedCustomizations, setSelectedCustomizations] = useState<Record<string, CustomizationOption>>({});
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<Record<string, boolean>>({});
  const [quantity, setQuantity] = useState(1);
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);
  const { addItem } = useCart();

  const customizationOptions = getCustomizationOptions(item);

  // Set default selections when modal opens
  React.useEffect(() => {
    if (isCustomizationOpen) {
      const defaults: Record<string, CustomizationOption> = {};
      
      // Set hard roll as default for bread choice
      if (customizationOptions['Bread Choice']) {
        const hardRoll = customizationOptions['Bread Choice'].find(opt => opt.id === 'hard-roll');
        if (hardRoll) {
          defaults['Bread Choice'] = hardRoll;
        }
      }
      
      setSelectedCustomizations(defaults);
    }
  }, [isCustomizationOpen, customizationOptions]);

  const handleCustomizationChange = (category: string, option: CustomizationOption) => {
    setSelectedCustomizations(prev => ({
      ...prev,
      [category]: option
    }));
  };

  const handleCheckboxChange = (optionId: string, option: CustomizationOption, checked: boolean) => {
    setSelectedCheckboxes(prev => ({
      ...prev,
      [optionId]: checked
    }));
  };

  const calculateTotalPrice = () => {
    const customizationsPrice = Object.values(selectedCustomizations).reduce((sum, option) => sum + option.price, 0);
    const checkboxPrice = Object.entries(selectedCheckboxes)
      .filter(([_, checked]) => checked)
      .reduce((sum, [optionId]) => {
        // Find the option in customizationOptions to get its price
        for (const options of Object.values(customizationOptions)) {
          const option = options.find(opt => opt.id === optionId);
          if (option) return sum + option.price;
        }
        return sum;
      }, 0);
    return (item.price + customizationsPrice + checkboxPrice) * quantity;
  };

  const isValidToAddToCart = () => {
    // Check if required meat selection is made for items that require it
    const hasMeatRequirement = Object.keys(customizationOptions).some(key => key.includes('(Required)'));
    if (hasMeatRequirement) {
      const hasSelectedRequiredMeat = Object.keys(selectedCustomizations).some(key => key.includes('(Required)'));
      return hasSelectedRequiredMeat;
    }
    return true;
  };

  const handleAddToCart = () => {
    if (!isValidToAddToCart()) {
      return; // Don't add to cart if validation fails
    }

    const radioCustomizations: CartCustomization[] = Object.values(selectedCustomizations).map(option => ({
      id: option.id,
      name: option.name,
      price: option.price,
      category: option.category,
    }));

    const checkboxCustomizations: CartCustomization[] = Object.entries(selectedCheckboxes)
      .filter(([_, checked]) => checked)
      .map(([optionId]) => {
        for (const options of Object.values(customizationOptions)) {
          const option = options.find(opt => opt.id === optionId);
          if (option) {
            return {
              id: option.id,
              name: option.name,
              price: option.price,
              category: option.category,
            };
          }
        }
        return null;
      })
      .filter(Boolean) as CartCustomization[];

    const allCustomizations = [...radioCustomizations, ...checkboxCustomizations];

    addItem({
      menuItemId: item.id,
      name: item.name,
      description: item.description,
      basePrice: item.price,
      quantity,
      customizations: allCustomizations,
      category: item.category,
    });

    // Reset form
    setSelectedCustomizations({});
    setSelectedCheckboxes({});
    setQuantity(1);
    
    // Close customization modal and open decision modal
    setIsCustomizationOpen(false);
    setIsDecisionModalOpen(true);
  };

  return (
    <>
      <Dialog open={isCustomizationOpen} onOpenChange={setIsCustomizationOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{item.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <p className="text-lg font-semibold">${item.price.toFixed(2)}</p>
            </div>

            {Object.entries(customizationOptions).map(([categoryName, options]) => (
              <div key={categoryName}>
                <h4 className="font-medium mb-3">
                  {categoryName}
                  {categoryName.includes('(Required)') && <span className="text-red-500 ml-1">*</span>}
                </h4>
                
                {/* Check if this category should use checkboxes */}
                {options.some(opt => opt.type === 'checkbox') ? (
                  <div className="space-y-2">
                    {options.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={selectedCheckboxes[option.id] || false}
                          onCheckedChange={(checked) => handleCheckboxChange(option.id, option, checked as boolean)}
                        />
                        <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                          <div className="flex justify-between">
                            <span>{option.name}</span>
                            {option.price > 0 && (
                              <span className="text-sm text-gray-500">+${option.price.toFixed(2)}</span>
                            )}
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <RadioGroup
                    value={selectedCustomizations[categoryName]?.id || ''}
                    onValueChange={(value) => {
                      const option = options.find(opt => opt.id === value);
                      if (option) {
                        handleCustomizationChange(categoryName, option);
                      }
                    }}
                  >
                    {options.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.id} id={option.id} />
                        <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                          <div className="flex justify-between">
                            <span>{option.name}</span>
                            {option.price > 0 && (
                              <span className="text-sm text-gray-500">+${option.price.toFixed(2)}</span>
                            )}
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </div>
            ))}

            <Separator />

            <div>
              <h4 className="font-medium mb-3">Quantity</h4>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-8 w-8 p-0"
                >
                  -
                </Button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-8 w-8 p-0"
                >
                  +
                </Button>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <span className="font-medium">Total:</span>
              <span className="font-bold text-lg">${calculateTotalPrice().toFixed(2)}</span>
            </div>

            <Button 
              onClick={handleAddToCart}
              disabled={!isValidToAddToCart()}
              className="w-full bg-grill-gold hover:bg-grill-orange text-grill-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart
            </Button>
            {!isValidToAddToCart() && (
              <p className="text-red-500 text-sm text-center">Please select required options</p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <OrderDecisionModal
        isOpen={isDecisionModalOpen}
        onClose={() => setIsDecisionModalOpen(false)}
        itemName={item.name}
      />
    </>
  );
};

export default ItemCustomizationModal;
