'use client';

import { authClient } from '@/auth/auth-client';
import { useAppForm } from '@/hooks/forms/useAppForm';
import { Form } from '@base-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  signUpErrorCodesToFields,
  signUpErrorCodesToMessages,
} from '@/app/auth/signup/_types/errors';
import { toast } from 'sonner';
import { z } from 'zod';
('');
const emailSchema = z.email('Please enter a valid email.');
const passwordSchema = z
  .string()
  .min(12, 'Your password must contain between 12 and 64 characters.')
  .max(64, 'Your password must contain between 12 and 64 characters.');

export function SignUpForm() {
  const [isPending, setIsPending] = useState(false);
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
      const placeholderName = 'default';
      await authClient.signUp.email(
        {
          email: value.email,
          password: value.password,
          name: placeholderName,
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
            if (ctx.error.code in signUpErrorCodesToFields) {
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
            } else {
              toast.error('Something went wrong on our end. Please try again.');
            }
            setIsPending(false);
          },
        },
      );
    },
  });

  return (
    <div className="flex flex-col gap-5 pb-5">
      <h1 className="text-2xl font-semibold">Create account</h1>

      <Form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
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
  );
}
