import { useEffect } from 'react';
import previewImage from '../assets/logo.png';

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function MetaTags({ 
  title = "Radheycraft",
  description = "Your adorable hosting",
  image = previewImage,
  url = "https://radheycraft.com",
  type = "website"
}: MetaTagsProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: string) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let metaTag = document.querySelector(selector) as HTMLMetaElement;
      
      if (!metaTag) {
        metaTag = document.createElement('meta');
        if (property) {
          metaTag.setAttribute('property', name);
        } else {
          metaTag.setAttribute('name', name);
        }
        document.head.appendChild(metaTag);
      }
      
      metaTag.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', description);

    // Open Graph meta tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'Radheycraft', true);

    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:site', '@radheycraft');
    updateMetaTag('twitter:creator', '@radheycraft');

    // Additional meta tags for better SEO
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('theme-color', '#00BFFF');
    updateMetaTag('msapplication-TileColor', '#0a0a0f');
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
    
    // Additional SEO tags
    updateMetaTag('geo.region', 'IN-MH');
    updateMetaTag('geo.placename', 'Mumbai');
    updateMetaTag('geo.position', '19.0760;72.8777');
    updateMetaTag('ICBM', '19.0760, 72.8777');
    updateMetaTag('language', 'English');
    updateMetaTag('rating', 'General');
    updateMetaTag('revisit-after', '7 days');

    // Add structured data for SEO
    const addStructuredData = () => {
      let scriptTag = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "DishaGB Hosting",
        "alternateName": "DishaGB",
        "url": "https://dishagb.shop",
        "logo": image,
        "description": description,
        "email": "support@dishagb.shop",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Mumbai",
          "addressRegion": "MH",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://discord.gg/dishagb"
        ],
        "serviceType": ["Web Hosting", "Game Server Hosting", "VPS Hosting", "Minecraft Hosting", "Bot Hosting"],
        "priceRange": "₹₹",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "500"
        }
      };
      
      scriptTag.textContent = JSON.stringify(structuredData);
    };

    addStructuredData();

    // Add canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = url;

    // Cleanup function to remove meta tags if component unmounts
    return () => {
      // We typically don't remove meta tags as they should persist
      // but this cleanup function is here for completeness
    };
  }, [title, description, image, url, type]);

  return null; // This component doesn't render anything
}
