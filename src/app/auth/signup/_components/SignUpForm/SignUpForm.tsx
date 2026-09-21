'use client';

import { authClient } from '@/auth/auth-client';
import { useAppForm } from '@/hooks/forms/useAppForm';
import { Form } from '@base-ui/react';
import { useState } from 'react';
import {
  signUpErrorCodesToFields,
  signUpErrorCodesToMessages,
} from '@/app/auth/signup/_types/errors';
import { toast } from 'sonner';
import { z } from 'zod';
import Link from 'next/link';
import { Separator } from '@base-ui/react';
import { revalidateLogic } from '@tanstack/react-form';

const emailSchema = z.email('Please enter a valid email.');
const passwordSchema = z
  .string()
  .min(12, 'Must be 12-64 characters')
  .max(64, 'Must be 12-64 characters');

interface SignUpFormProps {
  onFormSuccess: (email: string) => void;
}

export function SignUpForm({ onFormSuccess }: SignUpFormProps) {
  const [isPending, setIsPending] = useState(false);

  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validationLogic: revalidateLogic({ mode: 'submit', modeAfterSubmission: 'change' }),
    validators: {
      onDynamic: z.object({ email: emailSchema, password: passwordSchema }),
    },
    onSubmit: async ({ value }) => {
      const placeholderName = 'default';
      await authClient.signUp.email(
        {
          email: value.email,
          password: value.password,
          name: placeholderName,
          callbackURL: '/?verified=true',
        },
        {
          onRequest: () => {
            setIsPending(true);
          },
          onSuccess: () => {
            setIsPending(false);
            onFormSuccess(value.email);
          },
          onError: (ctx) => {
            if (ctx.error.status === 429) {
              toast.error('Too many attempts, please wait a minute and try again.');
            } else if (ctx.error.code in signUpErrorCodesToFields) {
              const fieldName =
                signUpErrorCodesToFields[ctx.error.code as keyof typeof signUpErrorCodesToFields];
              if (fieldName === 'invalid') {
                toast.error('Please check that your email and password are filled in correctly.');
              } else {
                const errorMessage =
                  ctx.error.code in signUpErrorCodesToMessages
                    ? signUpErrorCodesToMessages[
                        ctx.error.code as keyof typeof signUpErrorCodesToMessages
                      ]
                    : ctx.error.message;
                form.setErrorMap({
                  onSubmit: {
                    fields: {
                      [fieldName]: errorMessage,
                    },
                  },
                });
              }
              setIsPending(false);
            } else {
              toast.error('Something went wrong on our end. Please try again.');
              if (process.env.NODE_ENV === 'development') console.error(ctx.error.code);
            }
            console.log(ctx.error);
            setIsPending(false);
          },
        },
      );
    },
  });

  return (
    <>
      <div className="flex flex-col gap-5 pb-5">
        <h1 className="text-2xl font-semibold">Create account</h1>

        <Form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
          <form.AppField
            name="email"

            children={(field) => (
              <field.TextField label="Email" placeholder="example@example.com" maxLength={128} />
            )}
          />
          <form.AppField
            name="password"

            children={(field) => (
              <field.TextField label="Password" isPassword={true} maxLength={64} />
            )}
          />
          <form.AppForm>
            <form.SubmitButton
              className="w-full bg-indigo-700 py-3 rounded-sm text-white flex items-center justify-center gap-3"
              isPending={isPending}
              isPendingText="Registering"
              textClassName="text-sm font-semibold"
              iconSize="h-4 w-4"
            >
              Register
            </form.SubmitButton>
          </form.AppForm>
        </Form>
      </div>
      <div>
        <Separator orientation="horizontal" className="h-px w-full bg-slate-300" />
      </div>
      <div className="text-sm text-slate-400 pt-5 font-semibold">
        Have an account?{' '}
        <Link className="text-indigo-700" href="/auth/login">
          Log in
        </Link>
      </div>
    </>
  );
}
