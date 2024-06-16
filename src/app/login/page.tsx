"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../appwrite";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export default function LoginForm() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    toast({
      title: "Logging you it🔐",
      description: "Please wait ",
    });
    event.preventDefault();
    if (!email) {
      toast({
        title: "Email Required✅",
        description: "Please input email",
      });
      return;
    }

    if (!password) {
      toast({
        title: "Password Required✅",
        description: "Please input password",
      });
      return;
    }

    login(email, password)
      .then((account) => {
        console.log(account);
        toast({
          title: "Logged in 🔐✅",
          description: `Welcome back, ${account.providerUid.split("@")[0]}`,
        });
      })
      .finally(() => router.push("/dashboard"));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="form" onSubmit={handleSubmit}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Sign in
            </Button>
          </CardFooter>
          <div className="mb-3 text-center">
            <a>
              {"Don't have an account?"}
              <Link href="/signup" className="hover:underline">
                {" "}
                Sign up
              </Link>
            </a>
          </div>
        </Card>
      </form>
    </div>
  );
}
