import { LAWS_COLLECTION } from './uxLaws';
import { HEURISTICS_COLLECTION } from './heuristics';
import { PROCESSES_COLLECTION } from './designProcesses';
import { PRODUCT_COLLECTION } from './productThinking';
import { BIASES_COLLECTION } from './cognitiveBiases';
import { ARTIFACTS_COLLECTION } from './designArtifacts';
import { RESEARCH_COLLECTION } from './researchMethods';
import { Resource, ResourceCollection } from './resources';

// Single registry of every resource collection in the app. Add a new
// collection by building it the same way as lib/heuristics.ts and appending
// it here — the Laws & Principles tab and Home's daily pick both read from
// this list, so nothing else needs to change for a new collection to show up
// in both.
export const ALL_COLLECTIONS: ResourceCollection[] = [
  LAWS_COLLECTION,
  HEURISTICS_COLLECTION,
  PROCESSES_COLLECTION,
  PRODUCT_COLLECTION,
  BIASES_COLLECTION,
  ARTIFACTS_COLLECTION,
  RESEARCH_COLLECTION,
];

const collectionByItem = new Map<Resource, ResourceCollection>();

/** Every resource across every collection, flattened into one pool. */
export const ALL_RESOURCES: Resource[] = ALL_COLLECTIONS.flatMap((collection) => {
  collection.items.forEach((item) => collectionByItem.set(item, collection));
  return collection.items;
});

export function collectionFor(item: Resource): ResourceCollection | undefined {
  return collectionByItem.get(item);
}
