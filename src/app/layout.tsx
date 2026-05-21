import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BuildBro — AI Full-Stack Code Generator',
  description: 'Describe your app in plain English. Get production-ready full-stack code powered by MiMo V2.5 Pro.',
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'BuildBro — AI Full-Stack Code Generator',
    description: 'Describe your app in plain English. Get production-ready full-stack code powered by MiMo V2.5 Pro.',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BuildBro — AI Full-Stack Code Generator',
    description: 'Describe your app in plain English. Get production-ready full-stack code powered by MiMo V2.5 Pro.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
