// Shared shape for every "resource" collection in the app (Laws of UX today,
// more collections later). A ReadingRef is either a bare citation string
// (resolved to a search link at render time, since we can't verify a direct
// URL for every paper/book) or an explicit { label, url } when we do have a
// verified source link.

export type ReadingRef = string | { label: string; url: string };

export type Resource = {
  id: string;
  name: string;
  tagline: string;
  explanation: string;
  origins: string;
  furtherReading: ReadingRef[];
};

export type ResourceCollection = {
  key: string;
  /** All-caps mono label used as a section eyebrow (e.g. "LAWS OF UX"). */
  title: string;
  /** Title-case label used in breadcrumbs and other running text (e.g. "Laws of UX"). */
  breadcrumbLabel: string;
  attribution: string;
  sourceUrl: (item: Resource) => string;
  items: Resource[];
};
