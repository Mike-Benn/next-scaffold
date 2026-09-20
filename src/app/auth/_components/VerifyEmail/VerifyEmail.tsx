import { MailCheck } from 'lucide-react';

interface VerifyEmailProps {
  email: string;
}

export function VerifyEmail({ email }: VerifyEmailProps) {
  return (
    <div className="flex flex-col items-center gap-5 max-w-125 w-full">
      <div className="flex flex-col items-center text-sky-900 font-semibold text-xl gap-2 w-full">
        <MailCheck size={48} />
        <span className="bg-lime-50 text-xs px-2 py-1 truncate block max-w-4/5 text-center">
          {email}
        </span>
        <span>Verify your email!</span>
      </div>
      <span className="text-sm text-slate-400 text-center max-w-100">
        Click the account activation link in your email.
      </span>
      <span className="text-sm font-bold text-sky-900">Resend link</span>
    </div>
  );
}
