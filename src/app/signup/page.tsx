import { PageWrapper } from '@/components/PageWrapper';
import { auth } from '@/auth/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignupForm } from '@/app/signup/_components/SignupForm';
export default async function SignupPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect('/');
  return (
    <PageWrapper>
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="border border-slate-300 rounded-md p-6 w-full shadow-lg">
          <SignupForm />
        </div>
      </div>
    </PageWrapper>
  );
}
