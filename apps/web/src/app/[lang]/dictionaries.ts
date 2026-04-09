import "server-only";

import type { LocaleStrings } from "@/i18n/types";
import { locales as supportedLocales, type Locale } from "@/i18n/config";

const dictionaries: Record<Locale, () => Promise<LocaleStrings>> = {
  en: async () => {
    const { waitlist } = await import("@/i18n/en/waitlist");
    const { header } = await import("@/i18n/en/header");
    const { hero } = await import("@/i18n/en/hero");
    const { features } = await import("@/i18n/en/features");
    const { specs } = await import("@/i18n/en/specs");
    const { footer } = await import("@/i18n/en/footer");
    const { spectrum } = await import("@/i18n/en/spectrum");
    return { waitlist, header, hero, features, specs, footer, spectrum };
  },
  es: async () => {
    const { waitlist } = await import("@/i18n/es/waitlist");
    const { header } = await import("@/i18n/es/header");
    const { hero } = await import("@/i18n/es/hero");
    const { features } = await import("@/i18n/es/features");
    const { specs } = await import("@/i18n/es/specs");
    const { footer } = await import("@/i18n/es/footer");
    const { spectrum } = await import("@/i18n/es/spectrum");
    return { waitlist, header, hero, features, specs, footer, spectrum };
  },
};

export { supportedLocales as locales };
export type { Locale };

export const hasLocale = (locale: string): locale is Locale =>
  supportedLocales.includes(locale as Locale);

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]();
