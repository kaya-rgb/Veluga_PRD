export type HistoryEntry = {
  version: string;
  status: 'draft' | 'in_review' | 'confirmed';
  author: { role: string; name: string };
  changes: string;
  figmaUrl: string;
};

export type ScreenSection = {
  id: string;
  title: string;
  iframeUrl?: string;
  description: {
    title: string;
    body: string;
  };
};

export type ScreenSpec = {
  desktop: ScreenSection[];
  mobile: ScreenSection[];
};

const overviewFiles = import.meta.glob('../content/*/overview/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const historyFiles = import.meta.glob('../content/*/history.json', {
  import: 'default',
  eager: true,
}) as Record<string, HistoryEntry[]>;

const screenSpecFiles = import.meta.glob('../content/*/screen-spec.json', {
  import: 'default',
  eager: true,
}) as Record<string, ScreenSpec>;

const keyOf = (productId: string, rest: string) =>
  `../content/${productId}/${rest}`;

export function getOverviewVersions(productId: string): string[] {
  const prefix = `../content/${productId}/overview/`;
  return Object.keys(overviewFiles)
    .filter((k) => k.startsWith(prefix))
    .map((k) => k.replace(prefix, '').replace(/\.md$/, ''))
    .sort();
}

export function getOverviewMarkdown(
  productId: string,
  version: string
): string | undefined {
  return overviewFiles[keyOf(productId, `overview/${version}.md`)];
}

export function getHistory(productId: string): HistoryEntry[] {
  return historyFiles[keyOf(productId, 'history.json')] ?? [];
}

export function getScreenSpec(productId: string): ScreenSpec {
  return (
    screenSpecFiles[keyOf(productId, 'screen-spec.json')] ?? {
      desktop: [],
      mobile: [],
    }
  );
}
