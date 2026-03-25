import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import * as LucideIcons from "lucide-react";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image_url: string | null;
  features: string[];
  display_order: number;
}

const ServiceImage3D = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full perspective-1000 group cursor-pointer"
    >
      <div 
        className="rounded-3xl overflow-hidden shadow-2xl shadow-oxford/10 border border-white/5 bg-muted/20 hover:shadow-sky/25 transition-shadow duration-500"
        style={{ transform: "translateZ(30px)" }}
      >
        {children}
      </div>
      {/* Deep 3D Glow */}
      <div 
        className="absolute inset-x-4 -bottom-4 h-3/4 bg-sky/30 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" 
        style={{ transform: "translateZ(-20px)" }} 
      />
    </motion.div>
  );
};

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getIconComponent = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon || LucideIcons.Code;
  };

  return (
    <>
      <SEO 
        title="Services | Creativex Technology"
        description="Explore our cutting-edge AI, Machine Learning, Custom Software, and Mobile App Development services designed for scalable business growth."
        url="https://creativexlab.online/services"
      />
      {/* Hero Section */}
      <section className="py-24 pt-32">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <p className="text-sky font-bold text-xs uppercase tracking-widest mb-3">What We Do</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">
              How we can <span className="gradient-text">help you</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We offer a range of services designed to meet you where you are
              and help you get where you want to go. No cookie-cutter solutions —
              just thoughtful work tailored to your needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {isLoading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Loading services...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No services available yet.</p>
            </div>
          ) : (
            <div className="space-y-32">
              {services.map((service, index) => {
                const IconComponent = getIconComponent(service.icon);
                
                const resolvedImageUrl = service.image_url 
                  || (service.title === "Custom Software Development" ? "/custom-software.png" : null)
                  || (service.title === "AI & Machine Learning" ? "/ai-machine-learning.png" : null)
                  || (service.title === "Mobile App Development" ? "/mobile-app-dev.png" : null)
                  || (service.title === "Web Development" ? "/web-dev.png" : null)
                  || (service.title === "Cloud & DevOps" ? "/cloud-devops.png" : null)
                  || (service.title === "Data & Analytics" ? "/data-analytics.png" : null);

                return (
                  <motion.div
                    key={service.id}
                    id={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? "" : "lg:flex-row-reverse"
                      }`}
                  >
                    <div className={index % 2 === 1 ? "" : "lg:order-2"}>
                      <div className="icon-ring mb-8 scale-110">
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <h2 className="font-display text-2xl md:text-4xl font-bold mb-6 text-foreground">
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                        {service.description}
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-3 text-sm group/feature">
                            <div className="w-5 h-5 rounded-full bg-sky/10 flex items-center justify-center shrink-0 group-hover/feature:bg-sky group-hover/feature:text-white transition-colors">
                              <LucideIcons.Check className="w-3 h-3" />
                            </div>
                            <span className="text-foreground font-medium">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link to="/contact">
                        <Button size="lg" className="rounded-full px-8 btn-gradient border-0 text-white shadow-xl shadow-sky/20 hover:scale-105 transition-all" variant="default">
                          Discuss your project
                          <LucideIcons.ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </Link>
                    </div>

                    <div className={index % 2 === 1 ? "" : "lg:order-1"}>
                      <ServiceImage3D>
                        {resolvedImageUrl ? (
                          <img
                            src={resolvedImageUrl}
                            alt={service.title}
                            className="w-full h-full object-cover aspect-[4/3] transform group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-primary/10 to-sky/10 group-hover:scale-110 transition-transform duration-700">
                            <IconComponent className="w-24 h-24 text-primary/20" />
                          </div>
                        )}
                      </ServiceImage3D>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 section-dark" />
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl font-bold mb-4 text-white">
              Not sure what you need?
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed">
              That's okay! Let's have a conversation about your goals and figure out
              the best path forward together. No pressure, no hard sell.
            </p>
            <Link to="/contact">
              <Button size="lg" className="rounded-full px-8 bg-white text-primary hover:bg-white/90 font-semibold">
                Let's talk
                <LucideIcons.ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;
