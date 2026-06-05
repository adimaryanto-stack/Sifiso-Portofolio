import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
 
// Can be imported from a shared config
const locales = ['en', 'id'];
 
export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  
  console.log("Resolved locale in getRequestConfig:", locale);

  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as any)) {
    console.log("Locale validation failed, calling notFound() for:", locale);
    notFound();
  }
 
  return {
    locale: locale as string,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
