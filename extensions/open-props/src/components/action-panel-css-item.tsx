import { Action, ActionPanel, Keyboard } from "@raycast/api";

export function ActionPanelCssItem({ name, value }: { name: string; value: string }) {
  return (
    <ActionPanel>
      <ActionPanel.Section title="Paste">
        <Action.Paste title="Paste Variable" content={name} />
        <Action.Paste title="Paste as Var()" content={`var(${name})`} />
      </ActionPanel.Section>
      <ActionPanel.Section title="Copy">
        <Action.CopyToClipboard title="Copy Variable" content={name} shortcut={Keyboard.Shortcut.Common.CopyName} />
        <Action.CopyToClipboard
          title="Copy as Var()"
          content={`var(${name})`}
          shortcut={Keyboard.Shortcut.Common.Copy}
        />
      </ActionPanel.Section>
      <ActionPanel.Section title="Value">
        <Action.Paste title="Paste Value" content={value} />
        <Action.CopyToClipboard title="Copy Value" content={value} />
      </ActionPanel.Section>
    </ActionPanel>
  );
}
