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
    </Helmet>;
}