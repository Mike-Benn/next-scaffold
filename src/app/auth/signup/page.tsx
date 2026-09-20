import { PageWrapper } from '@/components/PageWrapper';
import { auth } from '@/auth/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignUpFlow } from '@/app/auth/signup/_components/SignUpFlow';
export default async function SignUpPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect('/');
  return (
    <PageWrapper>
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="border border-slate-300 rounded-md p-6 w-full shadow-lg max-w-100">
          <SignUpFlow />
        </div>
      </div>
    </PageWrapper>
  );
}
