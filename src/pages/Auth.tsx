import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "@/components/layout/Logo";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters").max(50, "Username must be less than 50 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin, isCheckingRole } = useAuth();

  useEffect(() => {
    // Wait until we're sure about the user's role
    if (user && !isCheckingRole) {
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [user, isAdmin, isCheckingRole, navigate]);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { username: "", email: "", password: "", confirmPassword: "" },
  });

  const onLogin = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          throw new Error("Email or password was incorrect. Please try again.");
        }
        if (error.message.includes("Email not confirmed")) {
          throw new Error("Please verify your email before signing in.");
        }
        throw error;
      }

      toast({
        title: "Welcome back! 👋",
        description: "You've successfully signed in.",
      });
      // The useEffect will handle the redirection once the admin status is verified
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSignup = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;

      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            username: data.username,
          },
        },
      });

      if (error) {
        if (error.message.includes("User already registered")) {
          throw new Error("This email is already registered. Please sign in instead.");
        }
        throw error;
      }

      toast({
        title: "Account created! 🎉",
        description: "Please check your email to verify your account.",
      });
      signupForm.reset();
      setActiveTab("login");
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="py-24 pt-32 min-h-screen relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="vibrant-blob top-1/4 -left-20 w-80 h-80 bg-sky/20" />
        <div className="vibrant-blob bottom-1/4 -right-20 w-80 h-80 bg-star/20" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto"
          >
            <div className="text-center mb-10">
              <Link to="/" className="inline-block mb-10">
                <Logo className="scale-150 origin-center" />
              </Link>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-sky/10 text-sky text-xs font-black uppercase tracking-widest mb-6">
                Secure Access
              </div>
              <h1 className="font-display text-4xl font-bold mb-4 text-foreground">
                Join <span className="gradient-text">CLab</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Your journey to innovation starts here.
              </p>
            </div>

            <div className="modern-card p-1">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 p-1 bg-transparent h-14">
                  <TabsTrigger
                    value="login"
                    className="rounded-2xl data-[state=active]:bg-sky data-[state=active]:text-white data-[state=active]:shadow-lg transition-all font-bold"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="rounded-2xl data-[state=active]:bg-sky data-[state=active]:text-white data-[state=active]:shadow-lg transition-all font-bold"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <div className="p-8">
                  <TabsContent value="login" className="mt-0 focus-visible:outline-none">
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                        <FormField
                          control={loginForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                  <Input
                                    placeholder="you@example.com"
                                    type="email"
                                    className="pl-10 rounded-lg"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                  <Input
                                    placeholder="••••••••"
                                    type="password"
                                    className="pl-10 rounded-lg"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full rounded-full btn-gradient border-0 text-white"
                        >
                          {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              Sign In
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>

                  <TabsContent value="signup">
                    <Form {...signupForm}>
                      <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4">
                        <FormField
                          control={signupForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                  <Input
                                    placeholder="johndoe"
                                    className="pl-10 rounded-lg"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={signupForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                  <Input
                                    placeholder="you@example.com"
                                    type="email"
                                    className="pl-10 rounded-lg"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={signupForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                  <Input
                                    placeholder="••••••••"
                                    type="password"
                                    className="pl-10 rounded-lg"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={signupForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                  <Input
                                    placeholder="••••••••"
                                    type="password"
                                    className="pl-10 rounded-lg"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full rounded-full btn-gradient border-0 text-white"
                        >
                          {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              Create Account
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Auth;
