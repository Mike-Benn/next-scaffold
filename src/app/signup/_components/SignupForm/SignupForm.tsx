'use client';

import { useAppForm } from '@/hooks/forms/useAppForm';
import { Form } from '@base-ui/react';
import { Separator } from '@base-ui/react';

export function SignupForm() {
  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-semibold">Create account</h1>

      <Form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
        <form.AppField
          name="email"
          children={(field) => (
            <field.TextField label="Email" placeholder="example@example.com" maxLength={254} />
          )}
        />
        <form.AppField
          name="password"
          children={(field) => (
            <field.TextField label="Password" isPassword={true} maxLength={128} />
          )}
        />
        <button
          type="button"
          className="w-full bg-indigo-700 py-3 rounded-sm text-white flex items-center justify-center"
        >
          <span className="text-xs font-semibold">Register</span>
        </button>
      </Form>
      <div>
        <Separator orientation="horizontal" className="h-px w-full bg-slate-300" />
      </div>
      <span className="text-sm text-slate-400">
        Have an account? <u>Log in</u>
      </span>
    </div>
  );
}
