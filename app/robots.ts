import type { MetadataRoute } from 'next';

export const revalidate = false;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: ['/api/', '/llms.txt', '/llms-full.txt', '/llms.mdx/', '/og/'],
    },
  };
}
