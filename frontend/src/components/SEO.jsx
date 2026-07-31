import { Helmet } from "react-helmet-async";

const BASE_URL = "https://izonetech.in";
const DEFAULT_TITLE = "Izone Technologies | Leading IT & Digital Solutions in Trichy";
const DEFAULT_DESCRIPTION =
  "IZONE Technologies is a top IT company in Trichy offering Web Development, Mobile App Development, Digital Marketing, AI/ML Solutions, Custom Software, and IT Training.";
const DEFAULT_OG_IMAGE = `${BASE_URL}/hero/about-hero.png`;

export default function SEO({
  title,
  description,
  path = "",
  canonicalUrl,
  ogType = "website",
  ogImage,
  keywords,
  noIndex = false,
  schema,
}) {
  const fullTitle = title
    ? `${title} | Izone Technologies`
    : DEFAULT_TITLE;
  const metaDescription = description || DEFAULT_DESCRIPTION;
  const currentUrl = canonicalUrl || (path ? `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}` : BASE_URL);
  const image = ogImage || DEFAULT_OG_IMAGE;

  // Flatten schemas array if passed multiple schemas
  const schemasToRender = Array.isArray(schema) ? schema.filter(Boolean) : schema ? [schema] : [];

  return (
    <Helmet>
      {/* General Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={Array.isArray(keywords) ? keywords.join(", ") : keywords} />}

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Robots Directive */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Izone Technologies" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={image} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      {schemasToRender.map((s, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
