"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { userLoginSchema } from "@/lib/zod/zod.user";
import { authClient } from "@/lib/auth-client";

// Standard Shadcn UI imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Credentials from "./Credentials";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = {
      email,
      password,
    };

    // Data validation (zod)
    const validate = userLoginSchema.safeParse(payload);

    if (validate.success) {
      try {
        await authClient.signIn.email({
          email: validate.data.email,
          password: validate.data.password,
          rememberMe: true,
        });
        toast.success("Log in successful");
        router.push("/dashboard");
      } catch (error) {
        toast.error("Something went wrong! Please try again");
        console.error("Error while log-in: ", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      toast.error(`Check your credential: ${validate.error.issues[0].message}`);
    }
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                disabled={isLoading}
              />
              {/* Using standard Shadcn muted text for the description */}
              <p className="text-[0.8rem] text-muted-foreground">
                Contact the administrator if you have trouble logging in.
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleReset}
              disabled={isLoading}
            >
              Reset
            </Button>
            <Credentials />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
