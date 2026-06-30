import type { ComponentType } from "react";

export type NavigationLink = {
  to: string;
  label: string;
  label_dyssi: string;
  component: ComponentType;
};
