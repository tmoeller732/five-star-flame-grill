
import runwareService from '../../services/RunwareService';
import { MenuItemProps } from './MenuItem';
import { toast } from "sonner";

export const generateMenuImages = async (menuItems: MenuItemProps[]) => {
  try {
    const updatedItems = [...menuItems];
    
    for (let i = 0; i < updatedItems.length; i++) {
      const item = updatedItems[i];
      if (!item.imageUrl) {
        try {
          console.log(`Generating image for ${item.name}...`);
          const result = await runwareService.generateImage({
            positivePrompt: `Professional food photography of ${item.name}, ${item.description}, gourmet restaurant quality, extreme close-up, bokeh background, high definition`,
            width: 512,
            height: 512
          });
          
          if (result.imageURL) {
            console.log(`Image generated for ${item.name}: ${result.imageURL}`);
            updatedItems[i] = {
              ...item,
              imageUrl: result.imageURL
            };
          }
        } catch (err) {
          console.error("Failed to generate image for:", item.name, err);
          // Continue with other items even if one fails
        }
      }
    }
    
    return updatedItems;
  } catch (error) {
    console.error("Error generating images:", error);
    toast.error("Failed to generate some menu images");
    return menuItems;
  }
};
