import { useCachedState, usePromise } from "@raycast/utils";
import { useEffect } from "react";

import { SupportedVersion } from "../lib/open-props/types";
import { fetchPackageVersion } from "../lib/unpkg";

export function useCachedVersion(majorVersion: SupportedVersion) {
  const [latestVersion, setLatestVersion] = useCachedState("latest-version", "");
  const { data } = usePromise(() => fetchPackageVersion(majorVersion));

  useEffect(() => {
    if (data && data !== latestVersion) {
      setLatestVersion(data);
    }
  }, [data]);

  return latestVersion;
}
