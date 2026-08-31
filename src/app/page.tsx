import { PageWrapper } from '@/components/PageWrapper';
import { auth } from '@/auth/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/login');
  return (
    <PageWrapper>
      <span>This is my home page</span>
    </PageWrapper>
  );
}
