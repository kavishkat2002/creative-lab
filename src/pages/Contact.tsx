import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";

const formSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Please enter a subject"),
  message: z.string().min(20, "Please tell us a bit more about your project"),
  scheduled_date: z.string().optional(),
  scheduled_time: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const contactInfo = [
  {
    icon: Mail,
    label: "Email us",
    value: "info@creativexlab.online",
    description: "We'll respond within 24 hours",
    href: "mailto:info@creativexlab.online",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+94 76 234 5336",
    description: "Mon-Fri, 9am-6pm",
    href: "tel:+94762345336",
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: "16/B Perera mawatha Rajagiriya",
    description: "Sri Lanka",
    href: "#",
  },
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 300); // Small delay to ensure render is complete
      }
    }
  }, [location.hash]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      scheduled_date: "",
      scheduled_time: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        scheduled_date: data.scheduled_date || null,
        scheduled_time: data.scheduled_time || null,
      });

      if (error) throw error;

      setIsSuccess(true);
      form.reset();
      toast({
        title: "Message sent! 🎉",
        description: "We'll get back to you soon.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title="Contact Us | Creativex Technology"
        description="Ready to start a project? Contact Creativex Technology today to discuss custom software, AI development, and digital transformation."
        url="https://creativexlab.online/contact"
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
            <p className="text-sky font-bold text-xs uppercase tracking-widest mb-3">Get in Touch</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Let's start a <span className="gradient-text">conversation</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you have a project in mind or just want to explore ideas,
              we'd love to hear from you. No pressure, no hard sell — just a friendly chat.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <h2 className="font-display text-2xl font-bold mb-8 text-foreground">Contact Details</h2>

              <div className="space-y-4 mb-12">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-start gap-4 p-5 rounded-2xl hover:bg-sky/5 transition-all group border border-transparent hover:border-sky/10"
                  >
                    <div className="icon-ring shrink-0 scale-90">
                      <info.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-lg mb-0.5">{info.value}</p>
                      <p className="text-sm font-medium text-muted-foreground">{info.description}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Image */}
              <div className="rounded-3xl overflow-hidden hidden lg:block shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
                  alt="Our office"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              id="contact-form"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <div className="modern-card p-10 md:p-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-sky/10 transition-colors" />
                <div className="flex items-center gap-4 mb-10 relative z-10">
                  <div className="icon-ring">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-foreground">Send us a message</h2>
                    <p className="text-sm font-medium text-muted-foreground">We typically respond within a few hours</p>
                  </div>
                </div>

                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-2 text-foreground">Thank you!</h3>
                    <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                      We've received your message and will get back to you within 24 hours.
                    </p>
                    <Button onClick={() => setIsSuccess(false)} variant="outline" className="rounded-full">
                      Send another message
                    </Button>
                  </motion.div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Your name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} className="rounded-lg" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email address</FormLabel>
                              <FormControl>
                                <Input placeholder="john@example.com" type="email" {...field} className="rounded-lg" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="What's this about?" {...field} className="rounded-lg" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="scheduled_date"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Preferred Meeting Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} className="rounded-lg" min={new Date().toISOString().split('T')[0]} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="scheduled_time"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Preferred Meeting Time (7 PM - 11 PM)</FormLabel>
                              <FormControl>
                                <select 
                                  {...field} 
                                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <option value="">Select a time</option>
                                  <option value="07:00 PM">07:00 PM</option>
                                  <option value="07:30 PM">07:30 PM</option>
                                  <option value="08:00 PM">08:00 PM</option>
                                  <option value="08:30 PM">08:30 PM</option>
                                  <option value="09:00 PM">09:00 PM</option>
                                  <option value="09:30 PM">09:30 PM</option>
                                  <option value="10:00 PM">10:00 PM</option>
                                  <option value="10:30 PM">10:30 PM</option>
                                  <option value="11:00 PM">11:00 PM</option>
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your project, your challenges, or what you're hoping to achieve..."
                                rows={6}
                                {...field}
                                className="rounded-lg resize-none"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        size="lg"
                        className="w-full rounded-full btn-gradient border-0 text-white"
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            Send message
                            <Send className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
