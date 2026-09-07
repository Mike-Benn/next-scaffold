import { PageWrapper } from '@/components/PageWrapper';
import { auth } from '@/auth/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { LogoutButton } from '@/components/Buttons/LogoutButton';

export default async function HomePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/login');
  return (
    <PageWrapper wrapperClassName="p-6">
      <LogoutButton />
    </PageWrapper>
  );
}
