export function extractCSSVars(css: string) {
  const withoutMedia = css.replace(/@media[^{]*\{[\s\S]*?\}\s*\}/g, "");
  const withoutSupports = withoutMedia.replace(/@supports[^{]*\{[\s\S]*?\}\s*\}/g, "");
  const props = [...withoutSupports.matchAll(/--([\w-]+):([^;}]+)/g)].map(([, name, value]) => ({
    name: `--${name}`,
    value: value.trim(),
  }));
  return props;
}
