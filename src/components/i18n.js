import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import Backend from "i18next-xhr-backend"
import LanguageDetector from "i18next-browser-languagedetector"
// not like to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init
import resources from "../locales"
i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "en",
    debug: true,
    ns: ["app"],
    whitelist: ["es", "en"],
    load: "languageOnly",
    defaultNS: "app",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: resources,
    detection: {
      // order and from where user language should be detected
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],

      // keys or params to lookup language from
      lookupQuerystring: "lng",
      lookupCookie: "i18next",
      lookupLocalStorage: "i18nextLng",
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,

      // cache user language on
      caches: ["localStorage", "cookie"],
      excludeCacheFor: ["cimode"], // languages to not persist (cookie, localStorage)

      // optional expire and domain for set cookie
      cookieMinutes: 10,
      cookieDomain: "myDomain",
    },
  })

export default i18n
