import { motion } from "framer-motion";
import { Heart, Users, Lightbulb, Target, ArrowRight } from "lucide-react";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

const values = [
  {
    icon: Heart,
    title: "Human First",
    description: "Technology should serve people, not the other way around. We design for real humans with real needs.",
  },
  {
    icon: Users,
    title: "True Partnership",
    description: "We don't just take orders — we collaborate, challenge assumptions, and invest in your success.",
  },
  {
    icon: Lightbulb,
    title: "Thoughtful Innovation",
    description: "We embrace new technologies, but only when they genuinely solve problems. No buzzwords for buzzwords' sake.",
  },
  {
    icon: Target,
    title: "Deliver What Matters",
    description: "We focus on outcomes, not just outputs. Success means making a real difference for your business.",
  },
];

const About = () => {
  return (
    <>
      <SEO 
        title="About Us | Creativex Technology"
        description="Learn about the elite engineers and AI strategists behind Creativex Technology. We build human-first, innovative software solutions."
        url="https://creativexlab.online/about"
      />
      {/* Hero Section */}
      <section className="py-24 pt-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sky font-bold text-xs uppercase tracking-widest mb-3">Who We Are</p>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">
                We're the people behind the <span className="gradient-text">pixels</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Creativex Technology started with a simple belief: technology should feel human.
                Too often, we saw companies frustrated by software that didn't understand
                their needs, built by teams that didn't listen.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                So we built something different — a team that genuinely cares about the
                people we work with and the problems we solve together.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="Our team"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-sky/5">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mb-16"
          >
            <p className="text-sky font-bold text-xs uppercase tracking-widest mb-3">Our values</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-foreground">
              What we <span className="gradient-text">believe in</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              These aren't just words on a wall — they guide how we work every day.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="modern-card card-hover p-8"
              >
                <div className="icon-ring mb-6">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2 text-foreground">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-star via-indigo-deep to-oxford" />
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-white">
              Want to work with us?
            </h2>
            <p className="text-white/80 mb-10 leading-relaxed text-lg">
              Whether you have a project in mind or just want to chat about ideas,
              we'd love to hear from you.
            </p>
            <Link to="/contact">
              <Button
                size="lg"
                className="rounded-full px-10 py-7 bg-white text-oxford hover:bg-white/90 font-bold shadow-2xl hover:scale-105 transition-all"
              >
                Get in touch
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
