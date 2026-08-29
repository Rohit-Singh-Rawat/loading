import type { MDXProps } from "mdx/types";
import type { ComponentType } from "react";

export interface MDXModule {
  default: ComponentType<MDXProps>;
}
