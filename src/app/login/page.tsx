import { PageWrapper } from '@/components/PageWrapper';
import { auth } from '@/auth/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { LoginForm } from '@/app/login/_components/LoginForm';
export default async function LoginPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect('/');
  return (
    <PageWrapper>
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="border border-slate-300 rounded-md p-6 w-full shadow-lg">
          <LoginForm />
        </div>
      </div>
    </PageWrapper>
  );
}
