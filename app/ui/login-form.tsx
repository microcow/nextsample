'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState } from 'react-dom';
import { signinAction } from '@/app/lib/actions';
import { ZodError } from '@/app/ui/zod-error'
import { ApiError } from '@/app/ui/api-error';
import { SubmitButton } from '@/app/ui/submit-button';

const initalState = {
  data: null,
};

export function LoginForm() {
  const [formState, formAction] = useFormState(signinAction, initalState);

  console.log("formState: ", formState);

  return (
    <form action={formAction} className="space-y-3">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                name="username"
                placeholder="username"
                required
              />
              <ZodError error={formState?.zodErrors?.username} />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" name="password" type="password" required />
              <ZodError error={formState?.zodErrors?.password} />
            </div>
            <SubmitButton className="w-full" text="Sign In" loadingText="Loading" />
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
            <ApiError error={formState?.apiErrors} />
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
