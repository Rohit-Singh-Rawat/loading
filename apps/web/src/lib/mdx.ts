import type { ComponentType } from "react";

export interface MDXModule {
  default: ComponentType;
}

export interface SpinnerMDXModule {
  default: ComponentType<{ slug: string }>;
}
