"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { userLoginSchema } from "@/lib/zod/zod.user";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };
    // data validation(zod)
    const validate = userLoginSchema.safeParse(payload);

    if (validate.success) {
      // console.log("Data validated", validate.data)
      try {
        await authClient.signIn.email({
          email: validate.data.email, // required
          password: validate.data.password, // required
          rememberMe: true,
        });
      } catch (error) {
        toast.error(`Something went wrong! please try again`);
        console.error("Error while log-in: ", error);
      }
      toast.success("Log in success");
      router.push("/dashboard");
    } else {
      console.log("Data validation Failed", validate.error);
      toast.error(`Check your credential: ${validate.error.issues[0].message}`);
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <FieldGroup>
        {/* email */}
        <Field>
          <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
          <Input
            id="fieldgroup-email"
            type="email"
            name="email"
            placeholder="your_email@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="email"
            required
          />
        </Field>
        {/* password */}
        <Field>
          <FieldLabel htmlFor="fieldgroup-password">Password</FieldLabel>
          <Input
            id="fieldgroup-password"
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="password"
            required
          />
          <FieldDescription>
            Contact the administrator if you have trouble logging in.
          </FieldDescription>
        </Field>
        {/* role selection */}
        {/* Buttons */}
        <Field orientation="horizontal">
          <Button type="reset" variant="outline">
            Reset
          </Button>
          <Button type="submit">submit</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
