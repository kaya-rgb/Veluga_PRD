export type Product = {
  id: string;
  shortTitle: string;
  title: string;
  description: string;
  updated: string;
};

import metaRag from '../content/rag-chat-builder/meta.json';
import metaSpace from '../content/veluga-space/meta.json';
import metaAgent from '../content/veluga-agent-builder/meta.json';
import metaAnalytics from '../content/veluga-analytics/meta.json';

export const products: Product[] = [
  metaRag,
  metaSpace,
  metaAgent,
  metaAnalytics,
];

export const findProduct = (id: string | undefined): Product | undefined =>
  products.find((p) => p.id === id);
