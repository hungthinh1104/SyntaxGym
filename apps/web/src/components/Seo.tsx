import { Helmet } from "react-helmet-async";

type SeoProps = {
  title: string;
  description: string;
  canonicalPath?: string;
  jsonLd?: unknown;
};

// TODO: Replace with real production domain when available
const SITE_URL = "https://syntaxgym.dev";

export function Seo({ title, description, canonicalPath, jsonLd }: SeoProps) {
  const canonicalUrl = canonicalPath ? `${SITE_URL}${canonicalPath}` : undefined;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : null}
    </Helmet>
  );
}
