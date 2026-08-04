const BASE_URL = "https://izonetech.in";
const ORG_LOGO = "https://izonetech.in/izone-logo.png";

export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  "name": "iZone Technologies",
  "legalName": "iZone Technologies Private Limited",
  "url": BASE_URL,
  "logo": ORG_LOGO,
  "image": "https://izonetech.in/hero/about-hero.png",
  "description": "iZone Technologies is a website development, software, mobile app, SEO and digital marketing company in Trichy. We create reliable digital solutions for businesses, institutions and growing brands.",
  "email": "info@izonetech.in",
  "telephone": "+91-9940048776",
  "founder": {
    "@type": "Person",
    "name": "B. Kesavan M.E"
  },
  "foundingDate": "2016",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3rd Floor, Aruvi Arcade Complex, 5th Cross Thillainagar, North Extension Road",
    "addressLocality": "Tiruchirappalli",
    "addressRegion": "Tamil Nadu",
    "postalCode": "620018",
    "addressCountry": "IN"
  },
  "sameAs": [
    "https://facebook.com",
    "https://instagram.com",
    "https://linkedin.com"
  ]
});

export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BASE_URL}/#localbusiness`,
  "name": "iZone Technologies",
  "image": ORG_LOGO,
  "url": BASE_URL,
  "telephone": "+91-9940048776",
  "email": "info@izonetech.in",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3rd Floor, Aruvi Arcade Complex, 5th Cross Thillainagar",
    "addressLocality": "Tiruchirappalli",
    "addressRegion": "Tamil Nadu",
    "postalCode": "620018",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 10.8277,
    "longitude": 78.6888
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "10:00",
      "closes": "18:30"
    }
  ]
});

export const getWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  "url": BASE_URL,
  "name": "iZone Technologies",
  "description": "Website development, software, mobile apps, SEO and digital marketing company in Trichy.",
  "publisher": {
    "@id": `${BASE_URL}/#organization`
  }
});

export const getWebPageSchema = ({ name, description, url }) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${url}#webpage`,
  "url": url,
  "name": name,
  "description": description,
  "isPartOf": {
    "@id": `${BASE_URL}/#website`
  }
});

export const getBreadcrumbSchema = (items = []) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`
  }))
});

export const getServiceSchema = ({ name, description, serviceType, url }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": name,
  "serviceType": serviceType || name,
  "description": description,
  "provider": {
    "@id": `${BASE_URL}/#organization`
  },
  "areaServed": {
    "@type": "Country",
    "name": "India"
  },
  "url": url
});

export const getContactPageSchema = ({ url = `${BASE_URL}/contact` }) => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${url}#contactpage`,
  "url": url,
  "name": "Contact iZone Technologies",
  "description": "Get in touch with iZone Technologies for software development, web & mobile app projects, or IT consultations in Trichy.",
  "mainEntity": {
    "@id": `${BASE_URL}/#localbusiness`
  }
});

export const getCourseSchema = (courses = []) => {
  if (!courses.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "IT Training Courses at iZone Technologies",
    "itemListElement": courses.map((course, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Course",
        "name": course.title || course.name,
        "description": course.description || `Comprehensive training program for ${course.title}`,
        "provider": {
          "@type": "Organization",
          "name": "iZone Technologies",
          "sameAs": BASE_URL
        }
      }
    }))
  };
};
