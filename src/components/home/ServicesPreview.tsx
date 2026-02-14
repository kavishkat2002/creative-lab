import { motion } from "framer-motion";
import { Code2, Brain, Smartphone, Globe, BarChart3, Cog, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Code2,
    title: "Custom Software Development",
    description: "Build scalable, high-performance applications tailored to your business needs.",
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Leverage intelligent systems to automate processes and drive insights.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Create engaging iOS and Android apps that users love.",
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Get a fast, mobile-friendly & high-converting website.",
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    description: "Transform your data into actionable business intelligence.",
  },
  {
    icon: Cog,
    title: "DevOps & Cloud",
    description: "Streamline deployment and scale with modern infrastructure.",
  },
];

export function ServicesPreview() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-[1.2] py-2">
            Digital Solutions{" "}
            <span className="gradient-text !leading-normal">That Deliver Results</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From strategy to execution, we help businesses thrive in the digital landscape
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="modern-card card-hover p-10 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-sky/10 flex items-center justify-center mb-8 group-hover:bg-sky group-hover:rotate-6 transition-all duration-300">
                <service.icon className="w-7 h-7 text-sky group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display text-xl font-bold text-oxford mb-4 group-hover:text-star transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/services">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
            >
              Explore Our Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
