// src/shared/lib/theatre/initializeTheatre.ts
import { getProject } from "@theatre/core";
import studio from "@theatre/studio";

export const initializeTheatre = () => {
  if (typeof window !== "undefined") {
    studio.initialize();
  }
  return getProject("Demo Project");
};
