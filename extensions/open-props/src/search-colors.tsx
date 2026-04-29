import { Grid } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";

import { ActionPanelCssItem } from "./components/action-panel-css-item";
import { useLatestVersion } from "./hooks/useLatestVersion";
import { fetchVars } from "./lib/open-props";
import { colorConfig } from "./lib/open-props/v1";

export default function Command() {
  const { version, isVersionLoading } = useLatestVersion("1");
  // For now only version 1 is supported, because version 2 is still in beta
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoading, data } = useCachedPromise((_) => fetchVars(colorConfig), [version], {
    execute: !!version,
  });

  return (
    <Grid
      isLoading={isVersionLoading || isLoading}
      searchBarPlaceholder="Search colors by name and shade..."
      columns={7}
    >
      {data &&
        data.map((section) => (
          <Grid.Section key={section.name} title={section.name}>
            {section.vars.map((item) => {
              const shade = item.name.split("-").at(-1);
              return (
                <Grid.Item
                  key={item.name}
                  title={shade ?? item.name}
                  subtitle={item.value}
                  content={{
                    color: {
                      light: item.value,
                      dark: item.value,
                      adjustContrast: false,
                    },
                  }}
                  keywords={[item.name, item.value, section.name, item.value.replace("#", "")]}
                  actions={<ActionPanelCssItem {...item} />}
                />
              );
            })}
          </Grid.Section>
        ))}
    </Grid>
  );
}
