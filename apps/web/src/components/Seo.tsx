import { Helmet } from "react-helmet-async";
import { getSiteUrl } from "../config/site";

type SeoProps = {
  title: string;
  description: string;
  canonicalPath?: string;
  jsonLd?: unknown;
  noindex?: boolean;
};

const SITE_URL = getSiteUrl();

export function Seo({ title, description, canonicalPath, jsonLd, noindex }: SeoProps) {
  const canonicalUrl = canonicalPath ? `${SITE_URL}${canonicalPath}` : undefined;

  return (
    <Helmet>
      {noindex && <meta name="robots" content="noindex, follow" />}
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />

      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : null}
    </Helmet>
  );
}
