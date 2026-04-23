import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PROFILE } from '../constants/data';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  type?: 'website' | 'article' | 'profile';
  image?: string;
}

export default function SEO({ 
  title, 
  description, 
  path = '', 
  type = 'website',
  image = '/og-image.png' // Default OG image if we had one
}: SEOProps) {
  const siteName = "Harsh Singh Developer";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const metaDescription = description || PROFILE.summary;
  
  // Use environment variable for URL if available, otherwise fallback
  const baseUrl = import.meta.env.VITE_APP_URL || "https://harsh-singh-developer.run.app";
  const url = `${baseUrl}${path}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": type === 'profile' ? "ProfilePage" : "WebSite",
    "mainEntity": type === 'profile' ? {
      "@type": "Person",
      "name": PROFILE.name,
      "jobTitle": PROFILE.title,
      "description": PROFILE.summary,
      "url": baseUrl,
      "sameAs": [
        `https://${PROFILE.github}`,
        `https://${PROFILE.linkedin}`
      ],
      "knowsAbout": [
        "Full Stack Development",
        "Artificial Intelligence",
        "Distributed Systems",
        "Cloud Infrastructure",
        "DevOps"
      ]
    } : undefined,
    "name": siteName,
    "url": baseUrl,
    "description": metaDescription
  };

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={`Full Stack Developer, AI Engineer, ${PROFILE.name}, Software Engineer, React Portfolio, Node.js Expert, Distributed Systems`} />
      <meta name="author" content={PROFILE.name} />
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />

      {/* OpenGraph Tags */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@harsh2055" />

      {/* Theme Color */}
      <meta name="theme-color" content="#0B0B0B" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
