import type { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <div className={`flex flex-col flex-1 pt-(--nav-height) ${className}`}>
      <main className="flex flex-col flex-1">{children}</main>
    </div>
  );
}
