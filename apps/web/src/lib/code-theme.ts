import pierreDarkVibrant from "@pierre/theme/pierre-dark-vibrant";
import pierreLightVibrant from "@pierre/theme/pierre-light-vibrant";
import type { ThemeRegistrationAny } from "shiki";

export const CODE_THEMES = {
  dark: pierreDarkVibrant as unknown as ThemeRegistrationAny,
  light: pierreLightVibrant as unknown as ThemeRegistrationAny,
};

export const CODE_THEME_ATTR = `${pierreDarkVibrant.name} ${pierreLightVibrant.name}`;
