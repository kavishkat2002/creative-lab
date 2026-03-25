import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  schema?: Record<string, any>;
}

export function SEO({
  title = "Creativex Technology | Elite AI & Digital Consultancy",
  description = "Creativex Technology delivers highly innovative and strategic software solutions, custom AI products, and performance-driven technology for ambitious businesses globally.",
  keywords = "AI agency, custom software development, Web3 development, machine learning, mobile app development, digital transformation, Creativex Technology",
  url = "https://creativexlab.online",
  image = "https://creativexlab.online/og-creative-lab.png",
  type = "website",
  schema,
}: SEOProps) {
  const siteName = "Creativex Technology";
  
  // Default Organization Schema
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Creativex Technology",
    "url": "https://creativexlab.online",
    "logo": "https://creativexlab.online/logo-creative-lab.png",
    "description": description,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-555-0199",
      "contactType": "customer service",
      "areaServed": "Worldwide",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://twitter.com/creativextech",
      "https://linkedin.com/company/creativex-technology"
    ],
    "knowsAbout": ["Artificial Intelligence", "Machine Learning", "Custom Software", "Web Development", "Mobile App Development", "Cloud Architecture"]
  };

  const finalSchema = schema || defaultSchema;

  return (
    <Helmet>
      {/* Basic HTML Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL for strict SEO/GEO deduplication */}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Generative Engine Optimization (GEO) JSON-LD Structured Data */}
      {/* LLMs heavily prioritize reading semantic schema objects when scraping */}
      <script type="application/ld+json">
        {JSON.stringify(finalSchema)}
      </script>
    </Helmet>
  );
}
