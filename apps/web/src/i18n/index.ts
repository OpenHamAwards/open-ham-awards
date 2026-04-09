import { waitlist as en } from "./en/waitlist";
import { waitlist as es } from "./es/waitlist";
import type { WaitlistStrings } from "./types";

const locales = { en, es } as const;

type Locale = keyof typeof locales;

const defaultLocale: Locale = "en";

export const waitlistI18n: WaitlistStrings = locales[defaultLocale];

export type { WaitlistStrings, Locale };
