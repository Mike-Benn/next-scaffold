'use client';

import { authClient } from '@/auth/auth-client';
import { useAppForm } from '@/hooks/forms/useAppForm';
import { Form } from '@base-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';
import { CircleAlert } from 'lucide-react';
import { Separator } from '@base-ui/react';
import Link from 'next/link';
import { isSignInErrorCode } from '@/app/auth/login/_lib/signInErrors';

const emailSchema = z.email('Please enter a valid email.');
const passwordSchema = z
  .string()
  .min(12, 'Your password must contain between 12 and 64 characters.')
  .max(64, 'Your password must contain between 12 and 64 characters.');

interface SignInFormProps {
  onEmailNotVerified: (email: string) => void;
}
export function SignInForm({ onEmailNotVerified }: SignInFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [showInvalidCredentialsError, setShowInvalidCredentialsError] = useState(false);

  const router = useRouter();
  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: z.object({
        email: emailSchema,
        password: passwordSchema,
      }),
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
          callbackURL: '/',
        },
        {
          onRequest: () => {
            setIsPending(true);
          },
          onSuccess: () => {
            setIsPending(false);
            router.push('/');
          },
          onError: (ctx) => {
            if (ctx.error.status === 429) {
              toast.error('Too many attempts, please wait a minute and try again.');
            } else if (isSignInErrorCode(ctx.error.code)) {
              if (ctx.error.code === 'EMAIL_NOT_VERIFIED') {
                onEmailNotVerified(value.email);
              } else {
                setShowInvalidCredentialsError(true);
              }
            } else {
              if (process.env.NODE_ENV === 'development') {
                console.error(ctx.error);
              }
              toast.error('Something went wrong on our end. Please try again.');
            }
            setIsPending(false);
          },
        },
      );
    },
  });

  return (
    <>
      <div className="flex flex-col gap-5 pb-5">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <span className="text-sm">Sign in to continue</span>
        </div>
        <Form
          className="flex flex-col gap-8"
          onSubmit={(e) => e.preventDefault()}
          onChange={() => {
            if (showInvalidCredentialsError) {
              setShowInvalidCredentialsError(false);
            }
          }}
        >
          <form.AppField
            name="email"
            validators={{
              onBlur: emailSchema,
            }}
            children={(field) => (
              <field.TextField label="Email" placeholder="example@example.com" maxLength={128} />
            )}
          />
          <form.AppField
            name="password"
            validators={{
              onBlur: passwordSchema,
            }}
            children={(field) => (
              <field.TextField label="Password" isPassword={true} maxLength={64} />
            )}
          />
          <div className="flex flex-col gap-3">
            {showInvalidCredentialsError && (
              <div className="flex items-center gap-1">
                <CircleAlert color="red" size={16} />
                <span className="text-red-500 text-sm">Incorrect email or password.</span>
              </div>
            )}
            <form.AppForm>
              <form.SubmitButton
                className="w-full bg-indigo-700 py-3 rounded-sm text-white flex items-center justify-center gap-3"
                isPending={isPending}
                isPendingText="Signing in"
                textClassName="text-sm font-semibold"
                iconSize="h-4 w-4"
              >
                Sign in
              </form.SubmitButton>
            </form.AppForm>
          </div>
        </Form>
      </div>
      <div>
        <Separator orientation="horizontal" className="h-px w-full bg-slate-300" />
      </div>
      <div className="text-sm text-slate-400 pt-5 font-semibold">
        New user?{' '}
        <Link className="text-indigo-700" href="/auth/signup">
          Register
        </Link>{' '}
        for an account
      </div>
    </>
  );
}
