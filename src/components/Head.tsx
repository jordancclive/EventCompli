import React from 'react';
import { Helmet } from 'react-helmet';
export function Head({
  title
}: {
  title?: string;
}) {
  const pageTitle = title ? `${title} | EventCompli - Powered by CompliBot` : 'EventCompli - Powered by CompliBot';
  return <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content="EventCompli - Automated vendor compliance checking powered by CompliBot. Streamline your event planning with intelligent document verification." />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
      
      {/* Web App Manifest */}
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#f97316" />
      <meta name="msapplication-TileColor" content="#f97316" />
    </Helmet>;
}