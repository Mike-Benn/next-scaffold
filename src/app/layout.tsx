import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: {
    template: '%s | Base App', // %s gets replaced by the page title
    default: 'Base App', // Fallback if a page doesn't define a title
  },
  description: 'Welcome to Base App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
