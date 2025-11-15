import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Update document direction for RTL support
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="gap-2 px-3 py-2.5 rounded-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100/50 text-slate-600 hover:text-blue-700 transition-all duration-500 shadow-sm hover:shadow-md"
        >
          <Globe size={20} strokeWidth={2.5} />
          <span className="text-sm font-semibold">
            {i18n.language === 'ar' ? 'عربي' : 'English'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem 
          onClick={() => changeLanguage('ar')}
          className={`cursor-pointer font-semibold ${i18n.language === 'ar' ? 'bg-blue-50 text-blue-700' : ''}`}
        >
          <span className="ml-2">🇸🇦</span>
          العربية
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('en')}
          className={`cursor-pointer font-semibold ${i18n.language === 'en' ? 'bg-blue-50 text-blue-700' : ''}`}
        >
          <span className="ml-2">🇬🇧</span>
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
