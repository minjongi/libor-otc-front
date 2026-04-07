import createMiddleware from "next-intl/middleware";

export default createMiddleware({
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
    localePrefix: 'never'
});