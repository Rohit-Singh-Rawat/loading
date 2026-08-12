import pierreDarkVibrant from "@pierre/theme/pierre-dark-vibrant";
import pierreLightVibrant from "@pierre/theme/pierre-light-vibrant";
import { codeToHtml, type ThemeRegistrationAny } from "shiki";
import { PRE_CLASSES } from "./code-block";

/**
 * @pierre/theme declares its themes deeply readonly, which does not match
 * shiki's mutable ThemeRegistrationAny. The objects are the same ones
 * rehype-pretty-code is given in next.config.ts — only the modifiers differ.
 */
const dark = pierreDarkVibrant as unknown as ThemeRegistrationAny;
const light = pierreLightVibrant as unknown as ThemeRegistrationAny;

/**
 * Matches the value rehype-pretty-code writes, which is what the
 * `code[data-theme] span` rule in globals.css selects on.
 */
const THEME_ATTR = "pierre-dark-vibrant pierre-light-vibrant";

/**
 * Highlights a snippet with the same themes the MDX pipeline uses, so code
 * rendered at request time matches code compiled out of a document.
 */
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
        },
      },
    ],
  });
}
