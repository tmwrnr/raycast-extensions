import { extractCSSVars } from "../css";
import { fetchUnpkgFile } from "../unpkg";
import { VersionConfig } from "./types";

export function fetchVars(config: VersionConfig) {
  return Promise.all(
    config.sections.map(async (section) => ({ ...section, vars: extractCSSVars(await fetchUnpkgFile(section.file)) })),
  );
}
