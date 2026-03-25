import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What services does Creativex Technology offer?",
    answer: "We offer comprehensive digital solutions including custom software development, AI/ML solutions, web and mobile app development, cloud infrastructure, data analytics, and ongoing technical support.",
  },
  {
    question: "Do you work with startups or small businesses?",
    answer: "Absolutely! We work with businesses of all sizes, from early-stage startups to established enterprises. We tailor our approach to match your specific needs and budget.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on complexity and scope. A simple website might take 4-6 weeks, while a complex software solution could take 3-6 months. We provide detailed timelines during our discovery phase.",
  },
  {
    question: "What technologies do you specialize in?",
    answer: "We work with modern tech stacks including React, Node.js, Python, AWS, Azure, and various AI/ML frameworks. We choose the best technology based on your specific project requirements.",
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer: "Yes! We offer comprehensive maintenance and support packages to ensure your solution runs smoothly. This includes bug fixes, updates, monitoring, and feature enhancements.",
  },
  {
    question: "How do we get started with a project?",
    answer: "Simply reach out through our contact form or schedule a call. We'll have a discovery session to understand your needs, provide a proposal, and once approved, kick off the project.",
  },
  {
    question: "What is your pricing model?",
    answer: "We offer flexible pricing models including fixed-price projects, time & materials, and dedicated team arrangements. We'll recommend the best model based on your project type and requirements.",
  },
  {
    question: "Can you help modernize our legacy systems?",
    answer: "Definitely! We have extensive experience in legacy modernization, helping businesses migrate to modern, scalable architectures while minimizing disruption to operations.",
  },
];

export function FAQSection() {
  const leftFaqs = faqs.slice(0, 4);
  const rightFaqs = faqs.slice(4);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What You <span className="gradient-text">Need to Know</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Learn more about how we work, what we offer, and how we can support your business goals.
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {leftFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`left-${index}`}
                  className="border border-border rounded-xl px-6 data-[state=open]:border-sky/30 transition-colors"
                >
                  <AccordionTrigger className="hover:no-underline py-6">
                    <span className="text-left font-display font-bold text-foreground group-data-[state=open]:text-star transition-colors">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.slice(3).map((faq) => (
                <AccordionItem
                  key={faq.question}
                  value={faq.question}
                  className="border border-border rounded-xl px-6 data-[state=open]:border-sky/30 transition-colors"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
