import { codeToHtml } from "shiki";
import { PRE_CLASSES } from "./code-block";
import { CODE_THEME_ATTR, CODE_THEMES } from "./code-theme";

export function highlightTsx(code: string): Promise<string> {
  return codeToHtml(code, {
    defaultColor: false,
    lang: "tsx",
    themes: CODE_THEMES,
    transformers: [
      {
        code(node) {
          node.properties["data-line-numbers"] = "";
          node.properties["data-theme"] = CODE_THEME_ATTR;
          node.properties.style = "display:grid";
        },
        pre(node) {
          node.properties.class = PRE_CLASSES;
          node.properties["data-theme"] = CODE_THEME_ATTR;
          node.properties.tabindex = "0";
          node.properties.style = undefined;
        },
      },
    ],
  });
}
