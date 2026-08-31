import type { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  mainClassName?: string;
  wrapperClassName?: string;
}

export function PageWrapper({
  children,
  wrapperClassName = '',
  mainClassName = '',
}: PageWrapperProps) {
  return (
    <div className={`flex flex-col flex-1 ${wrapperClassName}`}>
      <main className={`flex flex-col flex-1 ${mainClassName}`}>{children}</main>
    </div>
  );
}
