import { Mail, Headphones, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ContactSidebarProps {
  trigger?: React.ReactNode;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
    },
  },
};

const socialContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.4,
    },
  },
};

const socialItemVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
};

export function ContactSidebar({ trigger }: ContactSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Address",
      value: "info@creativexlab.online",
      href: "mailto:info@creativexlab.online",
    },
    {
      icon: Headphones,
      title: "Phone Number",
      value: "+94 76 234 5336",
      href: "tel:+94762345336",
    },
    {
      icon: MapPin,
      title: "Address",
      value: "16/B Perera mawatha Rajagiriya",
      href: "#",
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon" className="rounded-full">
            <Mail className="w-5 h-5" />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="right" className="w-[320px] sm:w-[380px] bg-background border-l border-border p-0 overflow-y-auto">
        <SheetHeader className="sr-only">
          <SheetTitle>Contact Information</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full py-8 px-6">
          {/* Contact Info Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isOpen ? "visible" : "hidden"}
            className="flex-1 flex flex-col justify-center space-y-0"
          >
            {contactInfo.map((item, index) => (
              <motion.div key={item.title} variants={itemVariants}>
                <motion.a
                  href={item.href}
                  className="group block py-6 text-center transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-sky/5 border-2 border-sky/20 flex items-center justify-center group-hover:border-sky group-hover:bg-sky group-hover:shadow-lg group-hover:shadow-sky/20 transition-all duration-300"
                    whileHover={{
                      rotate: [0, -5, 5, -5, 0],
                      scale: 1.1,
                      transition: { duration: 0.4 }
                    }}
                  >
                    <item.icon className="w-6 h-6 text-star group-hover:text-white transition-colors" />
                  </motion.div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-star transition-colors">
                    {item.value}
                  </p>
                </motion.a>
                {index < contactInfo.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isOpen ? 1 : 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
                  >
                    <Separator className="my-0 opacity-50" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 15 }}
            transition={{ delay: 0.35, duration: 0.3 }}
            className="pt-8 border-t border-border"
          >
            <h4 className="font-display text-sm font-bold text-center uppercase tracking-widest text-muted-foreground mb-6">
              Stay Connected
            </h4>
            <motion.div
              variants={socialContainerVariants}
              initial="hidden"
              animate={isOpen ? "visible" : "hidden"}
              className="flex justify-center gap-4"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  variants={socialItemVariants}
                  whileHover={{
                    scale: 1.2,
                    y: -4,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="w-11 h-11 rounded-xl bg-star/5 border-2 border-star/20 flex items-center justify-center text-star hover:border-star hover:bg-star hover:text-white transition-all shadow-sm"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </SheetContent>
    </Sheet>
  );
}