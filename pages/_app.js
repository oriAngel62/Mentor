import '../styles/global.css'
import { appWithTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function App({ Component, pageProps }) {
  const router = useRouter();
  
  useEffect(() => {
    // This is to force the locale on initial page load based on the router locale
    // You can modify this behavior based on your requirements
    if (router.locale) {
      document.documentElement.lang = router.locale;
    }
  }, [router.locale]);

  return <Component {...pageProps} />;
}

export default appWithTranslation(App);