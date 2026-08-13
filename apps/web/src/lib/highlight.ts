import pierreDarkVibrant from "@pierre/theme/pierre-dark-vibrant";
import pierreLightVibrant from "@pierre/theme/pierre-light-vibrant";
import { codeToHtml, type ThemeRegistrationAny } from "shiki";
import { PRE_CLASSES } from "./code-block";

const dark = pierreDarkVibrant as unknown as ThemeRegistrationAny;
const light = pierreLightVibrant as unknown as ThemeRegistrationAny;

const THEME_ATTR = "pierre-dark-vibrant pierre-light-vibrant";

export function highlightTsx(code: string): Promise<string> {
  return codeToHtml(code, {
    defaultColor: false,
    lang: "tsx",
    themes: { dark, light },
    transformers: [
      {
        code(node) {
          node.properties["data-line-numbers"] = "";
          node.properties["data-theme"] = THEME_ATTR;
          node.properties.style = "display:grid";
        },
        pre(node) {
          node.properties.class = PRE_CLASSES;
          node.properties["data-theme"] = THEME_ATTR;
          node.properties.tabindex = "0";
          // Shiki declares the theme's --shiki-*-bg here. Custom properties
          // inherit, so globals.css's `code[data-theme] span` rule would paint
          // every token with the theme background. rehype-pretty-code is
          // configured keepBackground: false and emits no style at all; match
          // it. Token spans carry their own colors.
          node.properties.style = undefined;
        },
      },
    ],
  });
}
