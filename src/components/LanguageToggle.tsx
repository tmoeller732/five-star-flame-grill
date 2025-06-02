
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <ToggleGroup type="single" value={language} onValueChange={(value) => value && setLanguage(value as 'en' | 'es')}>
      <ToggleGroupItem value="en" className="text-white hover:text-grill-gold data-[state=on]:bg-grill-gold data-[state=on]:text-grill-black">
        EN
      </ToggleGroupItem>
      <ToggleGroupItem value="es" className="text-white hover:text-grill-gold data-[state=on]:bg-grill-gold data-[state=on]:text-grill-black">
        ES
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default LanguageToggle;
