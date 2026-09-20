import { PageWrapper } from '@/components/PageWrapper';
import { auth } from '@/auth/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { LogoutButton } from '@/components/Buttons/LogoutButton';
import { VerificationToast } from '@/app/_components/VerificationToast';

export default async function HomePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/auth/login');
  return (
    <PageWrapper wrapperClassName="p-6">
      <VerificationToast />
      <LogoutButton />
    </PageWrapper>
  );
}
