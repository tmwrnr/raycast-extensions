import { Icon, List } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";

import { ActionPanelCssItem } from "./components/action-panel-css-item";
import { useCachedVersion } from "./hooks/useCachedVersion";
import { fetchVars } from "./lib/open-props";
import { config } from "./lib/open-props/v1";

export default function Command() {
  const latestVersion = useCachedVersion("1");
  // For now only version 1 is supported, because version 2 is still in beta
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoading, data } = useCachedPromise((_) => fetchVars(config), [latestVersion], {
    execute: !!latestVersion,
  });

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search CSS variables...">
      {data &&
        data.map((section) => (
          <List.Section key={section.file} title={section.name}>
            {section.vars.map((item) => (
              <List.Item
                key={item.name}
                title={item.name}
                accessories={[
                  {
                    text: item.value,
                  },
                  {
                    ...(section.type === "color" && {
                      icon: {
                        source: Icon.CircleFilled,
                        tintColor: item.value,
                      },
                    }),
                  },
                ]}
                actions={<ActionPanelCssItem {...item} />}
              />
            ))}
          </List.Section>
        ))}
    </List>
  );
}
