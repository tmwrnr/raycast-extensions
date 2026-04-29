import { ofetch } from "ofetch";
import { SupportedVersion } from "./open-props/types";

export function buildUnpkgUrl(path: string, version: SupportedVersion = "1"): string {
  return `https://unpkg.com/open-props@${version ?? "latest"}/${path}`;
}

export async function fetchPackageVersion(version: SupportedVersion = "1") {
  const result = await ofetch<{ version: string }>(buildUnpkgUrl("?meta", version));
  return result.version;
}

export async function fetchUnpkgFile(path: string, version: SupportedVersion = "1") {
  return await ofetch<string>(buildUnpkgUrl(path, version));
}
