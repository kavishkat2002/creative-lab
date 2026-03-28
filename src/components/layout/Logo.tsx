import { motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";

interface LogoProps {
  className?: string;
  isLight?: boolean;
}

export function Logo({ className, isLight = false }: LogoProps) {
  const { theme } = useTheme();

  // Determine active theme (handling 'system')
  const activeTheme = theme === "system" 
    ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : theme;

  // Use the new Creativex Technology logo
  const logoSrc = "/creativex-logo.png";


  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <img 
        src={logoSrc} 
        alt="Creativex Technology Logo" 
        className="h-16 md:h-20 w-auto object-contain scale-110 md:scale-125 origin-left"
      />
    </div>
  );
}
