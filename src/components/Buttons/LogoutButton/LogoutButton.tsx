'use client';
import { authClient } from '@/auth/auth-client';
import { Button } from '@base-ui/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login');
          router.refresh();
        },
        onError: (error) => {
          toast.error(error.error.message);
        },
      },
    });
  };
  return (
    <Button
      type="button"
      onClick={handleLogout}
      className="border border-red cursor-pointer self-start"
    >
      Logout
    </Button>
  );
}
