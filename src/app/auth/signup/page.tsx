import { PageWrapper } from '@/components/PageWrapper';
import { auth } from '@/auth/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignUpForm } from '@/app/auth/signup/_components/SignUpForm';
import { Separator } from '@base-ui/react';
import Link from 'next/link';
export default async function SignUpPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect('/');
  return (
    <PageWrapper>
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="border border-slate-300 rounded-md p-6 w-full shadow-lg max-w-100">
          <SignUpForm />
          <div>
            <Separator orientation="horizontal" className="h-px w-full bg-slate-300" />
          </div>
          <div className="text-sm text-slate-400 pt-5 font-semibold">
            Have an account?{' '}
            <Link className="text-indigo-700" href="/auth/login">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
