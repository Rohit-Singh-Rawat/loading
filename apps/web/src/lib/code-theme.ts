import type { ThemeRegistrationAny } from "shiki";
import loadingDark from "./themes/loading-dev-dark-color-theme.json";
import loadingLight from "./themes/loading-dev-light-color-theme.json";

export const CODE_THEMES = {
  dark: loadingDark as ThemeRegistrationAny,
  light: loadingLight as ThemeRegistrationAny,
};
