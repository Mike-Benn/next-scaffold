'use client';
import { authClient } from '@/auth/auth-client';
import { Button } from '@base-ui/react';
import { toast } from 'sonner';

export function LogoutButton() {
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = '/auth/login';
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
