import Head from 'next/head';
import React, { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
};

export default function Layout({
  children,
  title = 'My App',
  description = 'Test Next.js app with TypeScript',
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main>{children}</main>
    </>
  );
}
