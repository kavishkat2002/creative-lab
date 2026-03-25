import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { motion, useScroll, useSpring } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden w-full relative">
      {!isAdminPage && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky to-star z-[100] origin-left"
          style={{ scaleX }}
        />
      )}
      {!isAdminPage && <Navbar />}
      <main className="flex-1 overflow-x-hidden w-full">{children}</main>
      {!isAdminPage && <Footer />}
    </div>
  );
}
