import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  isLight?: boolean;
}

export function Logo({ className, isLight = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <img 
        src="/0ffedcda-b46e-419f-97a1-afb3ab0bda2d.png" 
        alt="Creative Lab Logo" 
        className="h-10 w-auto object-contain rounded-xl"
      />
    </div>
  );
}
